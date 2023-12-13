const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const btnCancelarForm = document.querySelector('.app__form-footer__button--cancel')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
const paragrafoDescricaotarefa = document.querySelector('.app__section-active-task-description')

let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefasLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    botao.addEventListener('click', () => {
        editarTarefa(paragrafo, tarefa)
    })

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imagemBotao)
    li.append(svg, paragrafo, botao)

    li.addEventListener('click', () => {
        desselecionarTarefas()
        selecionarTarefa(li, tarefa);
    })

    ulTarefas.append(li)
}

function selecionarTarefa(li, tarefa) {
    paragrafoDescricaotarefa.textContent = tarefa.descricao
    li.classList.add('app__section-task-list-item-active')
    tarefaSelecionada = tarefa;
    liTarefaSelecionada = li;
}

function desselecionarTarefas() {
    document.querySelectorAll('.app__section-task-list-item-active').forEach(paragrafo => {
        paragrafo.classList.remove('app__section-task-list-item-active')
    })
}

function editarTarefa(paragrafo, tarefa) {
    const novaDescricaoTarefa = prompt("Qual é a nova descrição da tarefa!")
    if (novaDescricaoTarefa) {
        paragrafo.textContent = novaDescricaoTarefa
        tarefa.descricao = novaDescricaoTarefa
        atualizarTarefasLocalStorage()
    }
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

btnCancelarForm.addEventListener('click', () => {
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})


formAdicionarTarefa.onsubmit = (evento) => {
    evento.preventDefault()
    const tarefa = {
        descricao: textarea.value
    }

    tarefas.push(tarefa)
    criarElementoTarefa(tarefa)
    atualizarTarefasLocalStorage()
    textarea.value = ''
    formAdicionarTarefa.classList.remove('hidden')
}

document.addEventListener('FocoFinalizado', () => {
    desselecionarTarefas()
    liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
    liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
})

tarefas.forEach(tarefa => {
    criarElementoTarefa(tarefa)
})

