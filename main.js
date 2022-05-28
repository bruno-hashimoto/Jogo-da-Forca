window.onload = function () {

}

let pontos = 0;
let erros = 0;
let dataCorrect = 0;

let letras = [
    'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
];

let palavras = [
    'AVIAO', 'BANANA', 'CACHORRO', 'DINAMITE', 'ELEFANTE'
]

function gerarPalavra() {
    let palavra = palavras[Math.floor(Math.random() * palavras.length)];
    return palavra;
}

function gerarBlocos(palavra) {

    limparBlocos()

    for (let i = 0; i < palavra.length; i++) {
        let div = document.createElement('div');
        div.classList.add('area-letter');
        div.classList.add('default-color');
        div.setAttribute('id', 'letra-' + i)
        document.querySelector('.palavra').append(div);
    }
}

function limparBlocos() {
    document.querySelector('.palavra').innerHTML = '';
}


function comparaLetraPalavra(letra, palavra) {
    if (palavra.includes(letra)) {
        document.getElementById(letra).classList.remove('default-color');
        document.getElementById(letra).classList.add('correct-color');

        const posicoes = posicaoLetra(letra, palavra);


        for (const posicao of posicoes) {
            document.getElementById('letra-' + posicao).classList.remove('default-color');
            document.getElementById('letra-' + posicao).classList.add('correct-color');
            document.getElementById('letra-' + posicao).innerHTML = letra;
            dataCorrect += 1;
        }

        adicionarPonto();

        setTimeout(function () {
            if (dataCorrect == palavra.length) {
                proximoNivel();
            }
        }, 10);

    } else {
        document.getElementById(letra).classList.remove('default-color');
        document.getElementById(letra).classList.add('error-color');
        adicionarErros();
    }
}

function posicaoLetra(letra, palavra) {
    const posicoesLetras = [];

    const grupoLetras = palavra.split('');

    for (const letraIndex in grupoLetras) {

        if (grupoLetras[letraIndex] === letra) {
            posicoesLetras.push(letraIndex);
        }
    }

    return posicoesLetras;
}

function start() {

    document.getElementById('player').style.display = 'block';
    document.getElementById('start').style.display = 'none';

    const palavra = gerarPalavra();

    gerarBlocos(palavra);
    score();

    for (let i = 0; i < letras.length; i++) {
        let letra = letras[i];
        let div = document.createElement('div');
        div.classList.add('area-letter');
        div.classList.add('default-color');
        div.setAttribute('id', letra);
        div.innerHTML = letra;
        div.addEventListener('click', function () {
            comparaLetraPalavra(letra, palavra);
        });
        document.querySelector('.keyboard').append(div);
    }
}

function score() {
    let totalPontos = pontos++;
    document.getElementById('pontos').innerHTML = totalPontos;
}

function adicionarPonto() {
    pontos + 1;
    score();
}

function restart() {
    window.location.reload();
}

function gameOver() {
    if (erros == 10) {
        document.getElementById('erros').innerHTML = pontos;
        document.getElementById('placar').style.display = 'none';
        document.getElementById('gameover').style.display = 'block';
    }
}

function adicionarErros() {
    erros++;
    gameOver();
}

function proximoNivel() {
    document.getElementById('finish').style.display = 'block';
}

function novaPalavra() {
    limparPalavra();
    limparKeyboard();
    document.getElementById('finish').style.display = 'none';
}

function limparKeyboard() {
    document.querySelector('.keyboard').innerHTML = '';
    document.querySelector('.keyboard').innerHTML = `<a class="area-letter-custom option-1-color" onclick="restart()">Recomeçar</a>`;
    start();
}

function limparPalavra() {
    dataCorrect = 0;
}
