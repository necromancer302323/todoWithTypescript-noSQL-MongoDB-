import {   useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import todoState from "./store/todoAtom";
import axios from "axios";

export default function TodoFormat(props:any){
 
    const [todos, settodos] = useRecoilState(todoState)
    const[inputBoxDisable,setInputBoxDisable]=useState(true)
    const nameInput=useRef( todos[props.index].title)
    const descriptionInput=useRef(todos[props.index].description)

 
    useEffect(()=>{
      if(nameInput.current!=todos[props.index].title){
        nameInput.current=todos[props.index].title
      }
      if(descriptionInput.current!=todos[props.index].description){
        descriptionInput.current=todos[props.index].description
      }
    })
    async function addTodos() {
      let res = await axios.post("http://localhost:4000/addTodos", {
        title:nameInput.current,
        description:descriptionInput.current
      }, { headers: { authorization: localStorage.getItem('token') } })
      console.log(res.data)
      settodos(res.data)
    }

    async function deleteTodo() {
      let res =await axios.post("http://localhost:4000/deleteTodo",{
        title:nameInput.current
      },{ headers: { authorization: localStorage.getItem('token') } })
      console.log(res.data)
      settodos(res.data)
    }

    async function updateTodos() {
      let res = await axios.post("http://localhost:4000/updateTodo", {
       title:nameInput.current,
       description:descriptionInput.current,
       id:todos[props.index].id
      }, { headers: { authorization: localStorage.getItem('token') } })
      settodos(res.data)
      alert("succesfully updated the todos")
    }

    function handleNameInput(input:any){
      nameInput.current=input.target.value
    }
    function handledescriptionInput(input:any){
      if(input.target.value==null){
        descriptionInput.current=todos[props.index].description
      }else{
      descriptionInput.current=input.target.value
    }
    }
    
  
    
    return <div key={Math.random()} className='flex gap-2 '>
<div className="flex flex-col">
  <div>name:</div>
  <input defaultValue={todos[props.index].title} className='bg-slate-200 rounded-xl p-1' disabled={inputBoxDisable} 
  onChange={handleNameInput}
  ></input>
  <div>description:</div>
  <input defaultValue={todos[props.index].description} className='bg-slate-200 rounded-xl p-1' disabled={inputBoxDisable}
  onChange={handledescriptionInput}
  ></input>
   <button onClick={()=>{
                if(todos[props.index].id==null){
                  addTodos()
               }else{
                updateTodos()
                }
        }}>confirm</button>
        <button onClick={deleteTodo}>delete todo</button>
</div>
               <button onClick={() => {setInputBoxDisable((prev:boolean)=>{prev=!prev;return prev});
               }
              }>update todo</button>
               
              </div>
}