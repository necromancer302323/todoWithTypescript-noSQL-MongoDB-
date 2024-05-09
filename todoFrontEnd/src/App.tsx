import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Signup from './signup'
import { useRecoilState } from 'recoil'
import todoState from './store/todoAtom'
import TodoFormat from './todoFormat'
//hello world
//updating in git
function App() {
  const [_count, _setCount] = useState(0)
  const [todos, settodos] = useRecoilState<any>(todoState)
  const [signUpPageVisiblity, setsignUpPageVisiblity] = useState(false)
  const [homepageVisiblity, sethomepageVisiblity] = useState(true)
  async function AllTodos() {
    let res = await axios.get("http://localhost:4000/allTodos", { headers: { authorization: localStorage.getItem('token') } })
    settodos(res.data)
  }

  async function addTodos() {
    let res = await axios.post("http://localhost:4000/addTodos", {
      newTodo: todos
    }, { headers: { authorization: localStorage.getItem('token') } })
    console.log(res.data)
    settodos(res.data)
  }

  async function deleteTodo(newTodos:any) {
    let res = await axios.post("http://localhost:4000/deleteTodo", {
      newTodo: newTodos
    }, { headers: { authorization: localStorage.getItem('token') } })
    console.log(res.data)
    settodos(res.data)
  }
  async function updateTodos() {
    let res = await axios.post("http://localhost:4000/updateTodo", {
      newTodo: todos
    }, { headers: { authorization: localStorage.getItem('token') } })
    settodos(res.data)
    alert("succesfully updated the todos")
  }
  const pagesVisblity = () => {
    sethomepageVisiblity((prev) => { return !prev });
    setsignUpPageVisiblity((prev) => { return !prev })
  }



  useEffect(() => {
    AllTodos()
  }, [])

  return (
    <div>
      <div className='w-32 h-10 border-2 border-black text-center cursor-pointer' onClick={pagesVisblity}>signup</div>
      {homepageVisiblity && <div className='flex   justify-center '>
          <div>
          <div>
          </div>

        </div>
        <div className='flex  flex-col gap-10'>
          {todos.map((t: any, index: number) => {
            return <div key={index} >
              <TodoFormat todo={t} index={index}></TodoFormat>
              <div className='flex gap-10'>
                <button onClick={()=>{
                  settodos((prev:any)=>{
                    const x=[...prev];
                    x.splice(index,1);
                    deleteTodo(x)
                    return x})}}>delete todo</button>
               
              </div>
            </div>
          })}
          <button onClick={()=>{settodos((prev:any)=>{const x=[...prev];x.push({name:"",description:""});return x})}}>+</button>
          <button onClick={addTodos}>confirm</button>
          <button onClick={() => { console.log(todos); updateTodos() }}>submit</button>
        </div>
        <div className='flex gap-2 flex-col'>
        </div>
      </div>}
      {signUpPageVisiblity && <Signup></Signup>}
    </div>
  )
}

export default App
