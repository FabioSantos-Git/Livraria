
export class livro {
    constructor(livro) {
            this.id = livro[0],
            this.nome = livro[1],
            this.autor = livro[2],
            this.preco = livro[3],
            this.data_inicio = livro[4],
            this.data_fim = livro[5],
            this.desconto = livro[6];
            this.img = livro[7];
            this.promocao = livro[9];
    }
};
