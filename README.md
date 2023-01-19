#Projeto Livraria do Futuro.

Este projeto é uma livraria online, onde os livros são puxados de uma planilha do Google Sheets através da API do Google App Script.
 A função "puxarProdutosPlanilha" é responsável por pegar os dados da planilha e usar esses dados para criar um objeto "livro" com as informações
de cada livro. Esses objetos são então adicionados a um array "LIVROS". A função "finalizar" verifica se os livros estão ativos na planilha e adiciona 
somente os livros ativos ao array "DESCRICAO". A função "criarArrayLivros" usa esses dados da array "DESCRICAO" para criar objetos "livro" e adicioná-los ao array "LIVROS".
 A função "inserirLivros" é responsável por inserir esses objetos "livro" no HTML da página, calculando o valor do desconto, caso haja alguma promoção ativa. Também é possível verificar
o status da promoção do livro, se estiver desativada, não será mostrado o desconto na página.

Instação:

 Os arquivos podem ser abertos em qualquer editor de textos.
 
 Link da planilha: https://docs.google.com/spreadsheets/d/11EvDv9zX-NVURlY_dce2V1iWro81LHLQnl9DWbWAr7w/edit#gid=0

Sobre:

 A planilha simula um banco de dados, onde pode se fazer qualquer procedimento "CRUD", também pode-se ativar as promoções
ou inserir mais livros para o site. 
 Cada edição na planilha deverá atualizar a pagina para que seja carregados os dados.
 O site tem um tempo curto de carregamento, isso acontece porque os dados são sendo retornados da planilha e inseridos no HMTL
da pagina. 
