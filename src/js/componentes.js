import { Todo } from "../classes";
import { todoList } from "..";

const divTodoList=document.querySelector('.todo-list')
const txtInput=document.querySelector('.new-todo')
const btnBorrar=document.querySelector('.clear-completed')
const ulFilter=document.querySelector(".filters")
const anchorFiltros=document.querySelectorAll(".filtro")
const cant=document.querySelector("strong")

export const crearTodoHtml=(todo)=>{
    const htmlTodo=` 
    <li class="${(todo.completado)?"completed":""}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)?"checked":""}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div=document.createElement("div");
    div.innerHTML=htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}


//events
//agregar una tarea
txtInput.addEventListener('keyup',(event)=>{
    if(event.keyCode===13 && txtInput.value.length>0){
        console.log(txtInput.value);
        const nuevoTodo=new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value="";
    }
    let count=0;
    for(let i=0;i<divTodoList.children.length;i++){
        if(!divTodoList.children[i].classList.contains("completed")){
            count++;
        }
    }
    cant.innerText=count;
})
//agreagar el completado y eliminacion
divTodoList.addEventListener('click',(event)=>{
    

    const nombreElemento=event.target.localName;
    const todoElemento=event.target.parentElement.parentElement;
    const todoId=todoElemento.getAttribute('data-id')

    if(nombreElemento.includes("input")){//click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } 
    else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    let count=0;
    for(let i=0;i<divTodoList.children.length;i++){
        if(!divTodoList.children[i].classList.contains("completed")){
            count++;
        }
    }
    cant.innerText=count;
   
    
   
   
})
//borrar los completados
btnBorrar.addEventListener("click",()=>{
    todoList.eliminarCompletados();
    for(let i=divTodoList.children.length-1;i>=0;i--){
     const element=divTodoList.children[i];
     if(element.classList.contains('completed')){
        divTodoList.removeChild(element);
     }
    }
})
//filtros
ulFilter.addEventListener('click',(event)=>{
    const filtro=event.target.text;
    if(!filtro) return;

    anchorFiltros.forEach(element=>element.classList.remove('selected'));
    event.target.classList.add("selected")

    for(const element of divTodoList.children){
       element.classList.remove("hidden");
       const completado=element.classList.contains("completed");



       switch(filtro){
        case"Pendientes":
            if(completado){
                element.classList.add("hidden");
            }
            break;
        case"Completados":
            if(!completado){
                element.classList.add("hidden");
            }
        break;


       }
       

    }
})
