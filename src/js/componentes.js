import "../css/componentes.css"
//import webpacklogo from '../assets/img/webpackimg.png'

export const saludar=(nombre)=>{
    console.log("creando etiketa")
    const h1=document.createElement("h1")
    h1.innerText=`hola ${nombre}`
    document.body.append(h1)
    //poniendo imagen
   // console.log(webpacklogo)
    //const img=document.createElement('img')
    //img.src=webpacklogo
    //document.body.append(img)        

}