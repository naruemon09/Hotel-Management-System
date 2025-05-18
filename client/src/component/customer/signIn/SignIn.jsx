import React, { useState } from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {

  const navigate = useNavigate()
  const [id_card , setIdCard] = useState("")
  const [password , setPassword] = useState("")

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signIn', {id_card, password})
      console.log(response)
      alert(response.data.text.msg)
      if (response.data.res === 0) {
        navigate("/bookroom", {state:{ val: response.data.val , user:response.data.user}})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='signin-body'>
      <div className='container'>
        <h1>Sign in</h1>
        <label>ID Card</label>
        <input name='id_card' type='text' value={id_card} onChange={(e) => setIdCard(e.target.value)}/>
        
        <label>Password</label>
        <input name='password' type='text' value={password} onChange={(e) => setPassword(e.target.value)}/>
        
        <br/>
        <button onClick={()=>{onSubmit()}}>Login</button>
        <br/>
        <a href="/signUp">Don't have an account? Register</a>
      </div>
    </div>
    
  )
}

export default SignIn





