const express = require('express');
const session = require('express-session');

const fs = require('fs');
const cheerio = require('cheerio');

//rotas 
const rotasLogin = require('./RotaLogin.js');
const verificarAutenticacao = require('./autenticacao.js');

//configuracao do multer
const multer  = require('multer');
const { storage } = require ('./multer.js');

const app = express();
const path = require('path');

//bancos de dados
const Produto = require('./produto.js');
const Usuario = require('./usuarios.js');

app.use(session({
    secret: 'qwbfuiasbf7w8r23bfjsabpofsfaw',
    resave: false,
    saveUninitialized: true
}));

// Definindo a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));
// Definindo o mecanismo de visualização como EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Use as rotas de login
app.use(rotasLogin);

// Use o middleware de verificação de autenticação
app.use(verificarAutenticacao);


// Função para gerar o catálogo
async function gerarCatalogo(req, res) {
    try {
         // Consulta todos os produtos no banco de dados
         const produtos = await Produto.findAll();

         // Carrega o conteúdo do arquivo HTML
         const html = fs.readFileSync('views/Pagecatalogo.ejs', 'utf-8');
 
         // Carrega o conteúdo HTML para o Cheerio
         const $ = cheerio.load(html);
 
         // Acessa a tag "produtos" para inserir os produtos dinamicamente
         const produtosTag = $('produtos');
 
         // Limpa o conteúdo da tag produtos
         produtosTag.empty();
 
         // Para cada produto, adiciona um elemento HTML representando o produto
         produtos.forEach(produto => {
             // Cria um novo elemento HTML para representar o produto
             const produtoHTML = `
                 <div class="produto">
                     <img src="${produto.img}" alt="${produto.nome}">
                     <h3>${produto.nome}</h3>
                     <p>Valor: ${produto.valor}</p>
                 </div>
             `;
             // Adiciona o elemento HTML do produto à tag produtos
             produtosTag.append(produtoHTML);
         });
 
         // Envia o HTML atualizado para o cliente
         res.send($.html());
     }catch (error) {
        // Em caso de erro, lidar com ele adequadamente
        console.error('Erro ao gerar o catálogo:', error);
        res.status(500).send('Erro ao gerar o catálogo. Por favor, tente novamente mais tarde.');
    }
}


// Função para gerar o catálogo
async function gerarEstoque(req, res) {
    try {
         // Consulta todos os produtos no banco de dados
         const produtos = await Produto.findAll();

         // Carrega o conteúdo do arquivo HTML
         const html = fs.readFileSync('views/PageEstoque.ejs', 'utf-8');
 
         // Carrega o conteúdo HTML para o Cheerio
         const $ = cheerio.load(html);
 
         // Acessa a tag "produtos" para inserir os produtos dinamicamente
         const produtosTag = $('tbody');
 
         // Limpa o conteúdo da tag produtos
         produtosTag.empty();
 
         // Para cada produto, adiciona um elemento HTML representando o produto
         produtos.forEach(produto => {
             // Cria um novo elemento HTML para representar o produto
             const produtoHTML = `
                 <tr>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.valor}</td>
                </tr>
             `;
             // Adiciona o elemento HTML do produto à tag produtos
             produtosTag.append(produtoHTML);
         });
 
         // Envia o HTML atualizado para o cliente
         res.send($.html());
     }catch (error) {
        // Em caso de erro, lidar com ele adequadamente
        console.error('Erro ao gerar o catálogo:', error);
        res.status(500).send('Erro ao gerar o catálogo. Por favor, tente novamente mais tarde.');
    }
}




// Rota para renderizar o catálogo
app.get('/catalogo', verificarAutenticacao, (req, res) => {
    gerarCatalogo(req, res); // Chamada da função para gerar o catálogo
});

app.get('/estoque', verificarAutenticacao, (req, res) => {
    gerarEstoque(req,res)
});


app.get('/produto', verificarAutenticacao, (req, res) => {
    res.render('PageCadsProdu');
});

  
  const upload = multer({ storage: storage });
  
  app.post('/produto', upload.single('file'), (req, res) => {
    const { nome, valor,qnt } = req.body;
    const nomeDoArquivo = req.file.filename;
    
    Produto.create({
        nome:nome,
        img:nomeDoArquivo,
        quantidade:qnt,
        valor:valor

    });

    res.redirect('/catalogo');
  });
  
  app.use(express.static('uploads')); // Para servir os arquivos na pasta 'uploads'
  

// Iniciando o servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
