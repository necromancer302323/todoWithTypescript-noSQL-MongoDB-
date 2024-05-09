import axios from "axios"
import { useState } from "react"
export default function Signup(){
    const[usernameInput,setusernameInput]=useState("")
    const[passwordInput,setpasswordInput]=useState("")
    async function Signin(){
        let res =await axios.post("http://localhost:4000/signup",
        //@ts-ignore
        {username:usernameInput,password:passwordInput})
        alert(res.data)
    }
    async function login() {
        let res =await axios.post("http://localhost:4000/login",
            //@ts-ignore
            {username:usernameInput,password:passwordInput}
        )
        localStorage.setItem("token",res.data)
        alert("you have succesfully loged in")
    }
    function handleUsernameInput(input:React.ChangeEvent<HTMLInputElement>){
        setusernameInput(input.target.value)
    }
     function handlePasswordInput(input:React.ChangeEvent<HTMLInputElement>){
        setpasswordInput(input.target.value)
    }
    return <div className="flex justify-center">
        <div className="w-fit border-2 border-black flex flex-col justify-center gap-5 p-4">
            <input placeholder="username" className="bg-slate-300 p-2" onChange={handleUsernameInput}></input>
            <input placeholder="Password" className="bg-slate-300 p-2" onChange={handlePasswordInput}></input>
            <div className="flex gap-5">
                <button onClick={Signin}>signup</button>
                <button onClick={login}>login</button>
            </div>
        </div>
    </div>
}