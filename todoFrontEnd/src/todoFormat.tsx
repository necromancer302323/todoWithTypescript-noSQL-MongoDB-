import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import todoState from "./store/todoAtom";
import axios from "axios";

export default function TodoFormat(props:any){

    const [todos, settodos] = useRecoilState(todoState)
    const[_inputBoxDisable,setInputBoxDisable]=useState(true)
    const nameInput=useRef("")
    const descriptionInput=useRef("")
    

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
  <input defaultValue={todos[todos.findIndex((e)=>{return e==props.todo})].name} className='bg-slate-200 rounded-xl p-1' disabled={false} 
  onChange={handleNameInput}
  ></input>
  <div>description:</div>
  <input defaultValue={todos[todos.findIndex((e)=>{return e==props.todo})].description} className='bg-slate-200 rounded-xl p-1' disabled={false}
  onChange={handledescriptionInput}
  ></input>
   
</div>
               <button onClick={() => { setInputBoxDisable((prev:any)=>{return !prev});
               settodos((prev:any)=>{let x=[...prev];x[todos.findIndex((e)=>
                {return e==props.todo})]={name:nameInput.current,description:descriptionInput.current,_id:prev[todos.findIndex((e)=>{return e==props.todo})]._id};console.log(x);return x});}}
               >update todo</button>
               <button onClick={updateTodos}>confirm</button>
              </div>
}