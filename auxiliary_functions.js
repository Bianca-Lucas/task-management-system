// -> Importando 'readFile' & 'writeFile'..
import { readFile, writeFile } from 'fs/promises';
import { type } from 'os';

// -> Importando o 'prompt-sync':
import PromptSync from "prompt-sync";
const prompt = PromptSync()

// -> Variável com o caminho até o arquivo:
const filePath = './jsons/tarefas.json'

// -> Função para Ler o arquivo:
export async function readFileJSON() {
    try {
        const data = await readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.log(`
        
            Erro ao ler o arquivo JSON sugerido:
            -> ${error.name}
            -> ${error.message}
        
            `)
    }

} 

// -> Função para Escrever no arquivo:
export async function writeFileJSON(listaTarefas) {
    try {
        await writeFile(filePath, JSON.stringify(listaTarefas,null,2))
        console.log(`
            ------------------------------
            |     Arquivo atualizado!    |
            ------------------------------
            `)
    } catch (error) {
        console.log(`
        
            Erro ao escrever no arquivo JSON sugerido:
            -> ${error.name}
            -> ${error.message}
        
            `)
    }
}

// -> Função para criar uma nova tarefa:
export async function createTask() {
    const tarefas = await readFileJSON()
    const titulo = prompt('Digite o Título da Tarefa: ')
    const descricao = prompt('Digite a Descrição da Tarefa: ')

    const newTask = {
        id: (tarefas.length + 1),
        titulo: titulo,
        descricao: descricao,
        concluida: false
    }

    tarefas.push(newTask)
    await writeFileJSON(tarefas)
    console.log(`
        ----------------------------------
        |   Tarefa criada com sucesso!   |
        ----------------------------------
    `)
}

// -> Função para visualizar todas as tarefas:
export async function listTasks() {
    const tarefas = await readFileJSON()
    console.log(tarefas)
}

// -> Função para visualizar as tarefas concluídas:
export async function tasksCompleted() {
    const tarefas = await readFileJSON();
    const concluidas = tarefas.filter(tarefa => tarefa.concluida === true);
    console.log(concluidas)

    if (concluidas.length === 0) {
        console.log('Nenhuma tarefa concluída encontrada.');
        return;
    }
}
      
// -> Função para visualizar as tarefas não concluídas:
export async function tasksNoCompleted() {
    const tarefas = await readFileJSON();
    const naoConcluidas = tarefas.filter(tarefa => tarefa.concluida === false);
    console.log(naoConcluidas)
    
    if (naoConcluidas.length === 0) {
        console.log('Nenhuma tarefa não concluída encontrada.');
        return;
    }
}

// -> Função para concluir uma tarefa:
export async function concluirTarefa() {
    const tarefas = await readFileJSON()
    const id = parseInt(prompt('Digite o ID da tarefa que deseja concluir: '))

    const tarefa = tarefas.find (tarefa => tarefa.id === parseInt(id));
    tarefa.concluida = true;
    console.log(`
        ----------------------------------------------------
        |   Tarefa ${tarefa.id} marcada como concluída!    |
        ----------------------------------------------------
    `)
    await writeFileJSON(tarefas)
}