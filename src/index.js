 //import{saludar} from"./js/componentes.js"//como importar
import './style.css'
//import { Todo } from './classes/todo.class'
//import { TodoList } from './classes/todo-list.class';
import { Todo,TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
export const todoList=new TodoList();

todoList.todos.forEach(todo =>crearTodoHtml(todo));

console.log(todoList.todos)