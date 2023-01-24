const listaDeTarefas = () => {
    const inputTarefa = document.querySelector('.inputTarefa');
    const addTarefa = document.querySelector('.addTarefa');
    const tarefas = document.querySelector('.tarefas');
    const criarLi = () => {
        const li = document.createElement('li');
        li.setAttribute('class', 'text-white my-3 fs-4');
        return li;
    };
    inputTarefa.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 && inputTarefa.value) {
            criarTarefa(inputTarefa.value);
        };
    });
    const limparInput = () => {
        inputTarefa.value = '';
        inputTarefa.focus();
    };
    const criarBotaoApagar = (li) => {
        li.innerText += '';
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = 'Apagar';
        botaoApagar.setAttribute('class', 'apagar ms-3 btn btn-outline-light rounded-3 border-3');
        botaoApagar.setAttribute('style', 'height:45px;');
        botaoApagar.setAttribute('title', 'Apagar está tarefa');
        li.appendChild(botaoApagar);
    };
    const criarTarefa = (textoInput) => {
        const li = criarLi();
        li.innerHTML = textoInput;
        tarefas.appendChild(li);
        limparInput();
        criarBotaoApagar(li);
        salvarTarefa();
    };
    addTarefa.addEventListener('click', () => {
        if (inputTarefa.value) {
            criarTarefa(inputTarefa.value);
        };
    });
    document.addEventListener('click', (event) => {
        const elemento = event.target;
        if (elemento.classList.contains('apagar')) {
            elemento.parentElement.remove();
            salvarTarefa();
        };
    });
    const salvarTarefa = () => {
        const liTarefas = tarefas.querySelectorAll('li');
        const listaDeTarefas = [];
        for (let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', ' ').trim();
            listaDeTarefas.push(tarefaTexto);
        };
        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON);
    };
    const adicionarTarefas = () => {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);
        for (let tarefa of listaDeTarefas) {
            criarTarefa(tarefa);
        };
    };
    adicionarTarefas();
};
listaDeTarefas();