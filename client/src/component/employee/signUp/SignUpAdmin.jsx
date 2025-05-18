import React, { useState } from 'react'
import axios from 'axios'
import { useLocation , Link, useNavigate} from 'react-router-dom';
import './SignUpAdmin.css'

const SignUpAdmin = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const val = location.state?.val;

  const[employee, setEmployee] = useState({
    id_card: "",
    employee_id: "",
    firstname: "",
    lastname: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    position: ""
  })

  const onSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signUpAdmin', employee)
      console.log(response)
      alert(response.data.val.msg)
      if (response.data.res === 0) {
        navigate("/employees" , {state:{ val }})
      }
    } catch (error) {
      console.log(error)
    }
}

  return (
    <div className='body-x'>
      <div className='container-list'>
        <h1 className='h1-list'>SignUp Admin</h1>
        <form onSubmit={onSubmit}>
        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>ID Card</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='id_card' type='text' value={employee.id_card} onChange={(e) => setEmployee({...employee, id_card:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Employee ID</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='employee_id' type='text' value={employee.employee_id} onChange={(e) => setEmployee({...employee, employee_id:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Firstname</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='firstname' type='text' value={employee.firstname} onChange={(e) => setEmployee({...employee, firstname:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Lastname</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='lastname' type='text' value={employee.lastname} onChange={(e) => setEmployee({...employee, lastname:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Gender</label>
          </div>  
          <div className='col-30'>
            <select className='input-x' name='gender' type='text' value={employee.gender} onChange={(e) => setEmployee({...employee, gender:e.target.value})} required>
              <option>--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Phone</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='phone' type='tel' value={employee.phone} onChange={(e) => setEmployee({...employee, phone:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Email</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='email' type='text' value={employee.email} onChange={(e) => setEmployee({...employee, email:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Password</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='password' type='text' value={employee.password} onChange={(e) => setEmployee({...employee, password:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Address</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='address' type='text' value={employee.address} onChange={(e) => setEmployee({...employee, address:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Position</label>
          </div>  
          <div className='col-30'>
            <select className='input-x' name='position' value={employee.position} onChange={(e) => setEmployee({...employee, position:e.target.value})} required>
              <option>--Select--</option>
              <option value="Manager">Manager</option>
              <option value="Officer">Officer</option>
              <option value="Cleaning staff">Cleaning staff</option>
            </select>
          </div> 
        </div>

        <br/>
        <div className='aa'>
          <button className='btn-cancle'><Link to='/employees' state={{ val }} style={{color:'white'}}>Cancle</Link></button>
          <button className='btn-save' type="submit">Register</button>
        </div>
        </form>

      </div>
    </div>
  )
}

export default SignUpAdmin








      {/* // onChange={
          //   (e) => {
          //     //console.log(e.target.value)
          //     setIdCard(e.target.value)
          //   }
          //   } */} 
        
        
        {/* <input name='id_card' type='text' value={id_card} onChange={(e) => setIdCard(e.target.value)}/> */}
        
        {/* <label>Age</label>
        <input name='age' type='text' value={age} onChange={(e) => setAge(e.target.value)}/> 

        <label>Age</label>
         <input className='input-x' name='age' type='text' value={age} onChange={
            (e) => {
              setAge(e.target.value)
              if(e.target.value > 60) {
                alert(e.target.value)
              }
            }
          }/> */}