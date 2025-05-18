import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import { useNavigate , Link } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate()
    const [ form , setForm ] = useState({
        id_card: "",
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        address: ""
    })

    const onSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:3000/signUp', form)
          console.log(response)
          alert(response.data.val.msg)
          if (response.data.res === 0) {
            navigate("/")
          }
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div className='singup-body'>
      <div className='container'>
        <Link to='/level'>Level User</Link>
        <h1>Sign Up</h1>
        <form>
          <label>ID Card</label>
          <input name='id_card' type='text' value={form.id_card} onChange={(e) => setForm({...form, id_card:e.target.value})} required/>
          
          <label>Firstname</label>
          <input name='firstname' type='text' value={form.firstname} onChange={(e) => setForm({...form, firstname:e.target.value})} required/>

          <label>Lastname</label>
          <input name='lastname' type='text' value={form.lastname} onChange={(e) => setForm({...form, lastname:e.target.value})} required/>

          <label>Phone</label>
          <input name='phone' type='tel' value={form.phone} onChange={(e) => setForm({...form, phone:e.target.value})} required/>

          <label>Email</label>
          <input name='email' type='text' value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} required/>

          <label>Address</label>
          <input name='address' type='text' value={form.address} onChange={(e) => setForm({...form, address:e.target.value})} required/>

          <label>Password</label>
          <input name='password' type='text' value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} required/>
          
          <br/>
          <button type="button" onClick={onSubmit}>Register</button>
        </form>
      </div> 
    </div>
        
  )
}

export default SignUp