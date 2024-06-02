import {  useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import todoState from "./store/todoAtom";
import axios from "axios";

export default function TodoFormat(props:any){

    const [todos, settodos] = useRecoilState(todoState)
    const[inputBoxDisable,setInputBoxDisable]=useState(true)
    const nameInput=useRef( todos[props.index].name)
    const descriptionInput=useRef(todos[props.index].description)

    useEffect(()=>{
      if(nameInput.current!==todos[props.index].name){
        nameInput.current=todos[props.index].name
        console.log(nameInput.current)
      }
      if(descriptionInput.current!==todos[props.index].description){
        descriptionInput.current=todos[props.index].description
        console.log(descriptionInput.current)
      }
    })


    function handleNameInput(input:any){
      nameInput.current=input.target.value
    }
    function handledescriptionInput(input:any){
      descriptionInput.current=input.target.value
    }
    
    async function updateTodos() {
      let res = await axios.post("http://localhost:4000/updateTodo", {
        newTodo: todos
      }, { headers: { authorization: localStorage.getItem('token') } })
      settodos(res.data)
      alert("succesfully updated the todos")
    }
    
    return <div key={Math.random()} className='flex gap-2 '>
<div className="flex flex-col">
  <div>name:</div>
  <input defaultValue={todos[props.index].name} className='bg-slate-200 rounded-xl p-1' disabled={inputBoxDisable} 
  onChange={handleNameInput}
  ></input>
  <div>description:</div>
  <input defaultValue={todos[props.index].description} className='bg-slate-200 rounded-xl p-1' disabled={inputBoxDisable}
  onChange={handledescriptionInput}
  ></input>
   
</div>
               <button onClick={() => {setInputBoxDisable(false);
               settodos((prev:any)=>{let x=[...prev];x[props.index]={name:nameInput.current,description:descriptionInput.current,_id:prev[todos.findIndex((e)=>{return e==props.todo})]._id};return x});}}
               >update todo</button>
               <button onClick={updateTodos}>confirm</button>
              </div>
}