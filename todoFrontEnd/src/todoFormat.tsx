import { useState } from "react";
import { useRecoilState } from "recoil";
import todoState from "./store/todoAtom";

export default function TodoFormat(props:any){

    const [todos, settodos] = useRecoilState(todoState)
    const[_inputBoxDisable,setInputBoxDisable]=useState(true)
    return <div key={Math.random()} className='flex gap-2 '>
<div>{Object.keys(todos[todos.findIndex((e)=>{return e==props.todo})]).map((a) => {

                return <div key={Math.random()} className='flex gap-2 bg-red'>
                  <div>{a}:</div>
                  
                  <input    //@ts-ignore 
                  defaultValue={todos[todos.findIndex((e)=>{return e==props.todo})][a]} className='bg-slate-200 rounded-xl p-1' disabled={false} onChange={
                    (e)=>{
                      settodos((prev:any)=>{  prev[todos.findIndex((e)=>{return e==props.todo})][a]=e.target.value;console.log(e.target.value);return prev })
                      console.log(todos)
                      }}></input>
                </div>
              })}</div>
               <button onClick={() => { setInputBoxDisable((prev:any)=>{return !prev})}}>update todo</button>
              </div>
}