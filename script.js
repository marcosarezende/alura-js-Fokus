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
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSEgundos = 1500
let identificadorContagem = null;

focoAudio.loop = true;

mostarTempo()

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
    interromperContador()
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            tempoDecorridoEmSEgundos = 1500
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada,<br>
            <strong class="app__title-strong">faça uma pausa curta.</strong>`
            tempoDecorridoEmSEgundos = 300
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície,<br>
            <strong class="app__title-strong">faça uma pausa longa.</strong>`
            tempoDecorridoEmSEgundos = 900
            break;
        default:
            break;
    }
    mostarTempo();
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
    fazerContagem()
}

function fazerContagem() {
    palyAudio.play()
    imagemBt.src = '/imagens/pause.png'
    iniciarOuPausarBt.textContent = 'Pausar'
    identificadorContagem = setInterval(contagemRegressiva, 1000)
}

function contagemRegressiva() {
    if (tempoDecorridoEmSEgundos == 0) {
        //beepAudio.play()
        interromperContador()
        tempoDecorridoEmSEgundos = 1500
        mostarTempo();
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const fimFocoEvento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(fimFocoEvento);
        }
        return
    }
    tempoDecorridoEmSEgundos -= 1
    mostarTempo();
}

function interromperContador() {
    imagemBt.src = '/imagens/play_arrow.png'
    iniciarOuPausarBt.textContent = 'Começar'
    clearInterval(identificadorContagem)
    identificadorContagem = null
}

function mostarTempo() {
    const tempo = new Date(tempoDecorridoEmSEgundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}