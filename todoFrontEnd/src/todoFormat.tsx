import { useState } from "react";
import { useRecoilState } from "recoil";
import todoState from "./store/todoAtom";

export default function TodoFormat(props:any){
    const [_todos, settodos] = useRecoilState<any>(todoState)
    const[inputBoxDisable,setInputBoxDisable]=useState(true)
    return <div key={Math.random()} className='flex gap-2 '>
<div>{Object.keys(props.todo).map((a) => {
                return <div key={Math.random()} className='flex gap-2 bg-red'>
                  <div>{a}:</div>
                  <input defaultValue={props.todo[a]}  className='bg-slate-200 rounded-xl p-1' disabled={inputBoxDisable} onChange={(e)=>{settodos((prev:any)=>{prev[props.index][a]=e.target.value;return prev})}}></input>
                </div>
              })}</div>
               <button onClick={() => { setInputBoxDisable((prev:any)=>{return !prev}) }}>update todo</button>
              </div>
}