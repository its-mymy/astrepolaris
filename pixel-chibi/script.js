

const botoes = document.querySelectorAll("#opcoes button");

const tituloOpcoes = document.querySelector("#titulo-opcoes");
const descricaoOpcoes = document.querySelector("#descricao-opcoes");

const listaOpcoes = document.createElement("div");
listaOpcoes.id = "lista-opcoes";

document.querySelector("#painel-opcoes").appendChild(listaOpcoes);


const categorias = {
    cabelos: {
        titulo: "Cabelos",
        descricao: "Aqui ficarão as opções de penteados e cores!"
    },
    olhos: {
        titulo: "Olhos",
        descricao: "Aqui ficarão as opções de cores e expressões!"
    },
    roupas: {
        titulo: "Roupas",
        descricao: "Aqui ficarão as peças para montar seu look!"
    },
    acessorios: {
        titulo: "Acessórios",
        descricao: "Aqui ficarão os laços, óculos e outros itens!"
    }
};

// Faz os botões atualizarem o painel de opções

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const categoriaEscolhida = botao.dataset.categoria;
        const categoria = categorias[categoriaEscolhida];

        tituloOpcoes.textContent = categoria.titulo;
        descricaoOpcoes.textContent = categoria.descricao;

        listaOpcoes.replaceChildren();

        if (categoriaEscolhida === "cabelos") {
            mostrarOpcoesCabelo();
        }
        if (categoriaEscolhida === "roupas") {
    mostrarOpcoesRoupas();
}

        if (categoriaEscolhida === "olhos") {
    mostrarOpcoesOlhos();
}
    });
});


// Encontra a área onde o personagem aparecerá
const areaPersonagem = document.querySelector("#personagem");
areaPersonagem.replaceChildren();

// Cria o recipiente de todas as camadas
const recipiente = document.createElement("div");
recipiente.id = "bonequinho-container";
areaPersonagem.appendChild(recipiente);

// Cria uma camada transparente para cada parte
function criarCamada(nome, ordem) {
    const canvas = document.createElement("canvas");

    canvas.width = 80;
    canvas.height = 100;
    canvas.className = "camada";
    canvas.style.zIndex = ordem;

    canvas.id = "camada-" + nome;
    recipiente.appendChild(canvas);

    return canvas.getContext("2d");
}

// Criamos as camadas na ordem em que serão empilhadas

const cabeloFundo = criarCamada("cabelo-fundo", 1);
const base = criarCamada("base", 2);
const roupas = criarCamada("roupas", 3);
const olhos = criarCamada("olhos", 4);
const cabelo = criarCamada("cabelo", 5);
const acessorios = criarCamada("acessorios", 6);



const paletaRoupas = {
    amarelo: {
        nome: "Amarelo",
        grupo: "Exploradores",
        principal: "#f4ca58",
        sombra: "#bd9134",
        detalhe: "#fff0a8"
    },

    azul: {
        nome: "Azul",
        grupo: "Sentinelas",
        principal: "#75b9ef",
        sombra: "#4179b5",
        detalhe: "#d9f0ff"
    },

    roxo: {
        nome: "Roxo",
        grupo: "Analistas",
        principal: "#c5a4ff",
        sombra: "#8564b5",
        detalhe: "#eee0ff"
    },

    verde: {
        nome: "Verde",
        grupo: "Diplomatas",
        principal: "#77d6a1",
        sombra: "#40966a",
        detalhe: "#d5ffe5"
    }
};

let parteSuperiorSelecionada = "camiseta";
let parteInferiorSelecionada = "shorts";
let corRoupaSelecionada = "roxo";


// Desenha um retângulo na camada escolhida
function pixel(contexto, x, y, largura, altura, cor) {
    contexto.fillStyle = cor;
    contexto.fillRect(x, y, largura, altura);
}

// CAMADA 1: corpo, pele e cabelo de trás
function desenharBase() {
    const pele = "#ffd0b5";
    const sombra = "#d99587";
    const cabeloEscuro = "#493653";
    const contorno = "#292033";

  

    // Pernas
    pixel(base, 28, 66, 10, 20, pele);
    pixel(base, 42, 66, 10, 20, pele);

    // Sombras das pernas
    pixel(base, 34, 70, 4, 14, sombra);
    pixel(base, 42, 70, 4, 14, sombra);

    // Sapatos
    pixel(base, 26, 85, 13, 5, contorno);
    pixel(base, 41, 85, 13, 5, contorno);

    // Braços
    pixel(base, 19, 44, 9, 18, pele);
    pixel(base, 52, 44, 9, 18, pele);

    // Sombras dos braços
    pixel(base, 19, 58, 5, 5, sombra);
    pixel(base, 55, 58, 5, 5, sombra);

    // Pescoço
    pixel(base, 34, 38, 12, 8, pele);

    // Cabeça
    pixel(base, 28, 12, 24, 3, pele);
    pixel(base, 24, 15, 32, 5, pele);
    pixel(base, 22, 20, 36, 13, pele);
    pixel(base, 24, 33, 32, 5, pele);
    pixel(base, 28, 38, 24, 3, pele);

    // Orelhas
    pixel(base, 19, 24, 5, 8, pele);
    pixel(base, 56, 24, 5, 8, pele);

    // Sombras discretas do rosto
    pixel(base, 24, 32, 4, 3, sombra);
    pixel(base, 52, 32, 4, 3, sombra);
}


function desenharRoupas() {
    // Apaga a roupa anterior antes de desenhar a nova
    roupas.clearRect(0, 0, 80, 100);

    const paleta = paletaRoupas[corRoupaSelecionada];

    const principal = paleta.principal;
    const sombra = paleta.sombra;
    const detalhe = paleta.detalhe;

    // PARTE DE BAIXO
    // O vestido tem sua própria saia, então não desenhamos
    // shorts, calça ou saia separados quando ele está selecionado.

    if (parteSuperiorSelecionada !== "vestido") {

        // Shorts
        if (parteInferiorSelecionada === "shorts") {
            pixel(roupas, 28, 63, 24, 3, sombra);
            pixel(roupas, 28, 66, 11, 6, principal);
            pixel(roupas, 41, 66, 11, 6, principal);

            pixel(roupas, 30, 67, 6, 2, detalhe);
            pixel(roupas, 43, 67, 6, 2, detalhe);
        }

        // Calça comprida
        if (parteInferiorSelecionada === "calca") {
            pixel(roupas, 28, 62, 11, 23, principal);
            pixel(roupas, 41, 62, 11, 23, principal);

            pixel(roupas, 28, 62, 11, 3, sombra);
            pixel(roupas, 41, 62, 11, 3, sombra);

            pixel(roupas, 35, 70, 3, 12, sombra);
            pixel(roupas, 42, 70, 3, 12, sombra);

            pixel(roupas, 30, 67, 3, 2, detalhe);
            pixel(roupas, 43, 67, 3, 2, detalhe);
        }

        // Saia
        if (parteInferiorSelecionada === "saia") {
            pixel(roupas, 28, 62, 24, 4, sombra);
            pixel(roupas, 29, 66, 22, 4, principal);
            pixel(roupas, 26, 70, 28, 7, principal);
            pixel(roupas, 26, 75, 28, 2, sombra);

            pixel(roupas, 34, 68, 3, 4, detalhe);
        }
    }

    // PARTE DE CIMA

    // Camiseta de manga curta
    if (parteSuperiorSelecionada === "camiseta") {
        // Mangas
        pixel(roupas, 22, 44, 8, 10, principal);
        pixel(roupas, 50, 44, 8, 10, principal);

        // Corpo da camiseta
        pixel(roupas, 29, 43, 22, 3, sombra);
        pixel(roupas, 27, 46, 26, 15, principal);
        pixel(roupas, 29, 61, 22, 3, sombra);

        // Estampa
        pixel(roupas, 38, 49, 4, 4, detalhe);
    }

    // Blusa de manga longa
    if (parteSuperiorSelecionada === "blusa") {
        // Mangas compridas
        pixel(roupas, 21, 44, 9, 17, principal);
        pixel(roupas, 50, 44, 9, 17, principal);

        // Punhos
        pixel(roupas, 21, 59, 9, 3, sombra);
        pixel(roupas, 50, 59, 9, 3, sombra);

        // Corpo da blusa
        pixel(roupas, 29, 43, 22, 3, sombra);
        pixel(roupas, 27, 46, 26, 15, principal);
        pixel(roupas, 29, 61, 22, 3, sombra);

        // Detalhe central
        pixel(roupas, 38, 49, 4, 5, detalhe);
    }

    // Vestido
    if (parteSuperiorSelecionada === "vestido") {
        // Mangas curtas
        pixel(roupas, 22, 44, 8, 9, principal);
        pixel(roupas, 50, 44, 8, 9, principal);

        // Parte superior do vestido
        pixel(roupas, 29, 43, 22, 3, sombra);
        pixel(roupas, 27, 46, 26, 14, principal);

        // Cintura
        pixel(roupas, 28, 59, 24, 3, sombra);
        pixel(roupas, 37, 59, 6, 3, detalhe);

        // Saia do vestido
        pixel(roupas, 30, 62, 20, 4, principal);
        pixel(roupas, 28, 66, 24, 4, principal);
        pixel(roupas, 26, 70, 28, 4, principal);
        pixel(roupas, 24, 74, 32, 5, principal);

        // Barra e detalhes
        pixel(roupas, 24, 77, 32, 2, sombra);
        pixel(roupas, 34, 68, 3, 3, detalhe);
        pixel(roupas, 43, 68, 3, 3, detalhe);
    }
}


// CAMADA 3: olhos e expressão
function desenharOlhos(corIris = "#7651a8") {
    const branco = "#fff4f7";
    const contorno = "#292033";
    const brilho = "#ffffff";

    // Sobrancelhas
    pixel(olhos, 27, 21, 9, 2, "#b87985");
    pixel(olhos, 44, 21, 9, 2, "#b87985");

    // Contorno dos olhos
    pixel(olhos, 26, 24, 11, 9, contorno);
    pixel(olhos, 43, 24, 11, 9, contorno);

    // Parte branca
    pixel(olhos, 28, 25, 8, 7, branco);
    pixel(olhos, 45, 25, 8, 7, branco);

    // Íris
pixel(olhos, 30, 25, 5, 7, corIris);
pixel(olhos, 47, 25, 5, 7, corIris);
    // Pupilas
    pixel(olhos, 32, 26, 3, 5, contorno);
    pixel(olhos, 49, 26, 3, 5, contorno);

    // Brilho dos olhos
    pixel(olhos, 30, 25, 2, 2, brilho);
    pixel(olhos, 47, 25, 2, 2, brilho);

    // Boca
    pixel(olhos, 38, 35, 4, 2, "#b87985");
}


function desenharCabelo(tipo = "curto") {
    // Apaga o penteado anterior
    cabelo.clearRect(0, 0, 80, 100);
    cabeloFundo.clearRect(0, 0, 80, 100);

    const principal = "#493653";
    const luz = "#8d70a4";

    // Parte de trás do cabelo
    if (tipo === "longo") {
        pixel(cabeloFundo, 23, 13, 34, 29, principal);
        pixel(cabeloFundo, 20, 20, 6, 22, principal);
        pixel(cabeloFundo, 54, 20, 6, 22, principal);
        pixel(cabeloFundo, 23, 35, 5, 7, luz);
        pixel(cabeloFundo, 52, 35, 5, 7, luz);
    } else {
        pixel(cabeloFundo, 25, 12, 30, 26, principal);
        pixel(cabeloFundo, 21, 19, 5, 17, principal);
        pixel(cabeloFundo, 54, 19, 5, 17, principal);
    }

    // Parte superior comum
    pixel(cabelo, 25, 10, 30, 5, principal);
    pixel(cabelo, 22, 14, 36, 5, principal);

    // Escolhe a franja de acordo com o penteado
    if (tipo === "curto") {
        pixel(cabelo, 27, 16, 8, 7, principal);
        pixel(cabelo, 35, 17, 8, 5, luz);
        pixel(cabelo, 43, 15, 8, 8, principal);
        pixel(cabelo, 29, 13, 5, 2, luz);
    }

    if (tipo === "longo") {
        pixel(cabelo, 26, 16, 8, 8, principal);
        pixel(cabelo, 34, 16, 10, 5, luz);
        pixel(cabelo, 44, 16, 9, 8, principal);
        pixel(cabelo, 30, 13, 5, 2, luz);
    }

    if (tipo === "franja") {
        pixel(cabelo, 25, 16, 30, 6, principal);
        pixel(cabelo, 27, 21, 8, 4, principal);
        pixel(cabelo, 36, 21, 8, 3, luz);
        pixel(cabelo, 45, 21, 7, 4, principal);
        pixel(cabelo, 30, 13, 5, 2, luz);
    }

    if (tipo === "coque") {
        // Coque no topo da cabeça
        pixel(cabelo, 34, 4, 12, 7, principal);
        pixel(cabelo, 36, 2, 8, 4, principal);
        pixel(cabelo, 36, 5, 4, 2, luz);

        // Franja lateral
        pixel(cabelo, 27, 16, 8, 7, principal);
        pixel(cabelo, 35, 17, 8, 5, luz);
        pixel(cabelo, 43, 15, 8, 8, principal);
    }
}



function mostrarOpcoesCabelo() {
    const estilos = [
        { nome: "Bob curto", tipo: "curto" },
        { nome: "Cabelo longo", tipo: "longo" },
        { nome: "Franja reta", tipo: "franja" },
        { nome: "Coque fofo", tipo: "coque" }
    ];

    estilos.forEach(function(estilo) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = estilo.nome;

        botao.addEventListener("click", function() {
            desenharCabelo(estilo.tipo);
        });

        listaOpcoes.appendChild(botao);
    });
}


function mostrarOpcoesOlhos() {
    const cores = [
        { nome: "Lilás", cor: "#7651a8" },
        { nome: "Azul", cor: "#4598d4" },
        { nome: "Verde", cor: "#55a66f" },
        { nome: "Rosa", cor: "#e77eb5" },
        { nome: "Mel", cor: "#c88a36" }
    ];

    cores.forEach(function(opcao) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = opcao.nome;

        botao.addEventListener("click", function() {
            desenharOlhos(opcao.cor);
        });

        listaOpcoes.appendChild(botao);
    });
}



// CAMADA 5: acessório de demonstração
function desenharAcessorios() {
    const rosa = "#f3a6d6";
    const rosaEscuro = "#c65c9b";
    const brilho = "#fff0fa";

    // Pequeno laço no cabelo
    pixel(acessorios, 49, 13, 5, 4, rosa);
    pixel(acessorios, 55, 13, 5, 4, rosa);
    pixel(acessorios, 53, 14, 3, 3, rosaEscuro);
    pixel(acessorios, 51, 13, 2, 2, brilho);
}

// Desenha cada camada separadamente
desenharBase();
desenharRoupas();
desenharOlhos();
desenharCabelo("curto");
desenharAcessorios();



function mostrarOpcoesRoupas() {
    listaOpcoes.replaceChildren();

    // Cria os títulos das seções do menu
    function adicionarTitulo(texto) {
        const titulo = document.createElement("h4");

        titulo.textContent = texto;
        titulo.className = "subtitulo-opcoes";

        listaOpcoes.appendChild(titulo);
    }

    // Cria um botão de opção
    function adicionarBotao(texto, selecionado, acao, corFundo) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = texto;

        if (selecionado) {
            botao.classList.add("opcao-selecionada");
        }

        if (corFundo) {
            botao.classList.add("botao-cor");
            botao.style.backgroundColor = corFundo;
            botao.style.color = "#20192a";
        }

        botao.addEventListener("click", function() {
            acao();
            desenharRoupas();
            mostrarOpcoesRoupas();
        });

        listaOpcoes.appendChild(botao);
    }

    // Escolha da parte de cima
    adicionarTitulo("Parte de cima");

    adicionarBotao(
        "Camiseta",
        parteSuperiorSelecionada === "camiseta",
        function() {
            parteSuperiorSelecionada = "camiseta";
        }
    );

    adicionarBotao(
        "Blusa",
        parteSuperiorSelecionada === "blusa",
        function() {
            parteSuperiorSelecionada = "blusa";
        }
    );

    adicionarBotao(
        "Vestido",
        parteSuperiorSelecionada === "vestido",
        function() {
            parteSuperiorSelecionada = "vestido";
        }
    );

    // Escolha da parte de baixo
    adicionarTitulo("Parte de baixo");

    adicionarBotao(
        "Shorts",
        parteInferiorSelecionada === "shorts",
        function() {
            parteInferiorSelecionada = "shorts";

            if (parteSuperiorSelecionada === "vestido") {
                parteSuperiorSelecionada = "camiseta";
            }
        }
    );

    adicionarBotao(
        "Calça",
        parteInferiorSelecionada === "calca",
        function() {
            parteInferiorSelecionada = "calca";

            if (parteSuperiorSelecionada === "vestido") {
                parteSuperiorSelecionada = "camiseta";
            }
        }
    );

    adicionarBotao(
        "Saia",
        parteInferiorSelecionada === "saia",
        function() {
            parteInferiorSelecionada = "saia";

            if (parteSuperiorSelecionada === "vestido") {
                parteSuperiorSelecionada = "camiseta";
            }
        }
    );

    // Paleta de cores inspirada nos grupos MBTI
    adicionarTitulo("Cores dos grupos MBTI");

    Object.keys(paletaRoupas).forEach(function(chave) {
        const opcao = paletaRoupas[chave];

        adicionarBotao(
            opcao.nome + " · " + opcao.grupo,
            corRoupaSelecionada === chave,
            function() {
                corRoupaSelecionada = chave;
            },
            opcao.principal
        );
    });
}
