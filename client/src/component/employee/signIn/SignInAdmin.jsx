import React, { useState } from 'react'
import './SignInAdmin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignInAdmin = () => {

  const navigate = useNavigate()
  const [id_card , setIdCard] = useState("")
  const [password , setPassword] = useState("")

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signInAdmin', {id_card, password})
      console.log(response)
      alert(response.data.text.msg)
      if (response.data.res === 0) {
        navigate("/bookings", {state:{ val: response.data.val}})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='signin-body'>
      <div className='container'>
        <h1>Sign in Admin</h1>
        <label>ID Card</label>
        <input name='id_card' type='text' value={id_card} onChange={(e) => setIdCard(e.target.value)}/>
        
        <label>Password</label>
        <input name='password' type='text' value={password} onChange={(e) => setPassword(e.target.value)}/>
        
        <br/>
        <button onClick={()=>{onSubmit()}}>Login</button>
      </div>
    </div>
    
  )
}

export default SignInAdmin