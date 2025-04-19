// Importando as funções...
import { createTask, listTasks, tasksCompleted, tasksNoCompleted, concluirTarefa } from './auxiliary_functions.js'

// -> Importando o prompt-sync...
import PromptSync from 'prompt-sync';
const prompt = PromptSync()

// -> Função para mostrar Menu para o Usuário:
async function MenuForUser() {
    let opcao = '';
    console.log(`
        ----------------------------------------------------------
        |                    Menu Interativo                     |             
        | -> Digite o número de acordo com a opção que deseja:   |
        | 1. Criar uma nova tarefa:                              |
        | 2. Visualizar todas as tarefas:                        |
        | 3. Visualizar apenas tarefas concluídas:               |
        | 4. Visualizar apenas tarefas não concluídas:           |
        | 5. Concluir uma tarefa:                                |
        | 6. Sair:                                               |
        ----------------------------------------------------------        
        `)
        
    // -> Váriavel que irá receber a opção que o usuário deseja...
    opcao = prompt('Digite a opção que deseja: ')
        switch(opcao){
            case '1': 
                await createTask();
                break;
            case '2': 
                await listTasks();
                break;
            case '3':
                await tasksCompleted();
                break;
            case '4':
                await tasksNoCompleted();
                break;
            case '5': 
                await concluirTarefa();
                break;
            case '6':
                console.log(`
                ---------------------------------------
                |         Saindo do sistema!          |
                ---------------------------------------
                `)
                break;
            default:
                console.log(`
                ---------------------------------------
                |          Opção inválida!            |
                ---------------------------------------
                `)
                }
    }

MenuForUser()