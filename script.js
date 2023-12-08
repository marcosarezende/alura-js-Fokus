const html = document.querySelector('html')
const botoesFoco = document.querySelectorAll('button[data-contexto]')
const banner = document.querySelector('.app__image')

botoesFoco.forEach((botao) => {
    botao.onclick = (evento) => {
        alterarContexto(evento.target.getAttribute('data-contexto-id'))
    }
})

function alterarContexto(contexto) {
    console.log(contexto)
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
}