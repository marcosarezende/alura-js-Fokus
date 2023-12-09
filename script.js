const html = document.querySelector('html')
const botoesFoco = document.querySelectorAll('button.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const musicaFocoInput = document.querySelector('input#alternar-musica')
const musicaFoco = new Audio('/sons/luna-rise-part-one.mp3')

musicaFoco.loop = true;

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
    if (evento.currentTarget.checked && musicaFoco.paused) {
        musicaFoco.play();
        return
    }
    musicaFoco.pause();
}