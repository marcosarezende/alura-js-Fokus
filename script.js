const html = document.querySelector('html')
const botoesFoco = document.querySelectorAll('button.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const musicaFocoInput = document.querySelector('input#alternar-musica')
const focoAudio = new Audio('/sons/luna-rise-part-one.mp3')
const palyAudio = new Audio('/sons/play.wav')
const pauseAudio = new Audio('/sons/pause.mp3')
const startPauseBt = document.querySelector('#start-pause')
const beepAudio = new Audio('/sons/beep.mp3');
const imagemBt = document.querySelector('.app__card-primary-butto-icon')

let tempoDecorridoEmSEgundos = 5
let identificadorContagem = null;

focoAudio.loop = true;

botoesFoco.forEach((botao) => {
    botao.onclick = (evento) => {
        trocarBotaoAtivo(botao)
        alterarContexto(evento.target.getAttribute('data-contexto-id'))

    }
})

function trocarBotaoAtivo(botao) {
    document.querySelector('button.active').classList.remove('active')
    botao.classList.add('active')
}

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada,<br>
            <strong class="app__title-strong">faça uma pausa curta.</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície,<br>
            <strong class="app__title-strong">faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

musicaFocoInput.onchange = (evento) => {
    evento.currentTarget.checked
    if (evento.currentTarget.checked && focoAudio.paused) {
        focoAudio.play();
        return
    }
    focoAudio.pause();
}

startPauseBt.onclick = () => {
    if (identificadorContagem) {
        pauseAudio.play()
        interromperContador()
        return
    }
    iniciarContagem()
}

function iniciarContagem() {
    palyAudio.play()
    imagemBt.src = '/imagens/pause.png'
    identificadorContagem = setInterval(contagemRegressiva, 1000)
}

function contagemRegressiva() {
    if (tempoDecorridoEmSEgundos == 0) {
        beepAudio.play()
        interromperContador()
        tempoDecorridoEmSEgundos = 5
        return
    }
    tempoDecorridoEmSEgundos -= 1
    console.log(tempoDecorridoEmSEgundos)
}

function interromperContador() {
    imagemBt.src = '/imagens/play_arrow.png'
    clearInterval(identificadorContagem)
    identificadorContagem = null
}