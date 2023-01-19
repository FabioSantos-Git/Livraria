import { livro } from "./modulos/livro.mjs";

let LIVROS = [];
let DESCRICAO = [];

const LINK_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbx8q1Aagw3-seB0DS43K_dvxBTtt2GqBsMblimjOQMjmNj5c2ZY2XcRB5-1SIka06zUpw/exec"
let livros_Cadastrados = 0
/**
 * Função que retorna todos os dados da planilha, que estão inseridas na coluna e nas células.
 */
function puxarProdutosPlanilha() {
    let link =
        "https://docs.google.com/spreadsheets/d/11EvDv9zX-NVURlY_dce2V1iWro81LHLQnl9DWbWAr7w/edit";
    let pagina = "Livraria";
    let celulas = "A2:J";
    let linkCompleto = `${LINK_APPS_SCRIPT}?link=${link}&pagina=${pagina}&celulas=${celulas}`;

    fetch(linkCompleto, {
        method: "get",
    })
        .then((dados) => dados.json())
        .then((dados) => finalizar(dados))

}

/**
 * Verifica na planilha se o status dos livros estão ativos.
 * @param {String} dados Recebe os dados da planilha.
 */
function finalizar(dados) {

    for (let i = 0; i < dados.length; i++) {
        const adicionar = dados[i];

        if (adicionar[8] == "POSSUI") {
            DESCRICAO.push(adicionar)
        }
    }

    criarArrayLivros()
}

/**
 * Cria um array com os parametros do objeto Livro.
 */
function criarArrayLivros() {

    for (let i = 0; i < DESCRICAO.length; i++) {
        const adicionar = DESCRICAO[i];
        LIVROS.push(new livro(adicionar));
    };

    inserirLivros()
}


/**
 * Faz o calculo do valor e desconto para saber qual será o desconto do produto.
 * @param {Number} valor Preço original do produto.
 * @param {Number} desconto Desconto que será aplicado.
 * @returns retorna o valor do desconto.
 */
function calculo(valor, desconto) {
    return (valor * desconto) / 100;
}

/**
 * Insere os parametros do objeto Livro no HTML, e faz a subtração do valor original com o desconto da promoção.
 */
function inserirLivros() {

    let livraria = document.querySelector(".livraria");

    for (let i = 0; i < LIVROS.length; i++) {
        const soma = calculo(LIVROS[i].desconto, LIVROS[i].preco);
        const resultado = LIVROS[i].preco - soma.toFixed(2);
        

        if (LIVROS[i].promocao == "DESATIVADA") {


            livraria.innerHTML +=

            `<div class="card"><br>

            <div id="desconto"><p class="p">&nbsp;</p></div> 
            <div class="img"><img src="${LIVROS[i].img}" alt="foto"></div>
            <div class="nome"><p><strong>Nome:</strong> ${LIVROS[i].nome}</p></div> 
            <div class="autor"><p><strong>Autor:</strong> ${LIVROS[i].autor}</p></div> 
            <div class="data_inicio"><p>&nbsp;</p></div> 
            <div class="data_fim"><p>&nbsp;</p></div> 
            <div class="preco"><p class="de">&nbsp;</p></div>
            <div class="valor"><p class="por"><strong>R$ ${LIVROS[i].preco.replace(".",",")}</strong></p></div>
</div>`

        } else if (LIVROS[i].promocao == "ATIVADA") {

            livraria.innerHTML +=

                `<div class="card"><br>

   <div class="desconto" id="desconto"><p class="p">${LIVROS[i].desconto}% de Desconto</p></div> 
   <div class="img"><img src="${LIVROS[i].img}" alt="foto"></div>
   <div class="nome"><p><strong>Nome:</strong> ${LIVROS[i].nome}</p></div> 
   <div class="autor"><p><strong>Autor:</strong> ${LIVROS[i].autor}</p></div> 
   <div class="data_inicio"><p><strong>Inicio da Promoção:</strong> ${formatarData(LIVROS[i].data_inicio)}</p></div> 
   <div class="data_fim"><p><strong>Fim da Promoção:</strong> ${formatarData(LIVROS[i].data_fim)}</p></div> 
   <div class="preco"><p class="de"><s>DE: R$ ${LIVROS[i].preco}</s></p></div>
   <div class="valor"><p class="por"><strong>POR: R$ ${resultado.toFixed(2)}</strong></p></div>
   
   </div>`

        }
    }
}


/**
 * função que recebe uma data e retorna no formato PT-BR.
 * @param {String} data data ser formatada. 
 * @returns retorna a data formatada.
 */
function formatarData(data) {
    const date = new Date(data);
    const formattedDate = date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return formattedDate
}


document.addEventListener('DOMContentLoaded', puxarProdutosPlanilha());