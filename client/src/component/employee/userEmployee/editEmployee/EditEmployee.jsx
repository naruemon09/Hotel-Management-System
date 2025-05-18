import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation , Link, useNavigate } from 'react-router-dom';
import './EditEmployee.css'

const EditEmployee = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const val = location.state.val;
  
  const id_card = val.id_card.split('').reverse().join('');
  

  const [employee, setEmployee] = useState({
    id_card: "",
    employee_id: "",
    firstname: "",
    lastname: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    position: "",
  })

  useEffect(() => {
    const getEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/employee/${id_card}`, { params: {val} })
            if (response.data.res === 0) {
                console.log("get Employees :", response);
                setEmployee(response.data.user);
            }
          } catch (error) {
            alert("Failed to get employee")
          }
    }
    getEmployee()
  }, []
);

  const onSubmit = async () => {
    try {
      if(employee.password === employee.confirmPassword) {
        const response = await axios.post(`http://localhost:3000/employee/${id_card}`, employee ,{ params: {val} });
        console.log('update employee :',response)
        alert(response.data.text.msg)
        if (response.data.res === 0) {
          const updatedVal = response.data.val
          navigate("/employees" , {state:{ val:updatedVal }})
        }
      } else {
        alert("Confirm password does not match!")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='body-x'>
      <div className='container-list'>
        <h1 className='h1-list'>Profile</h1>
        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>ID Card</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.id_card}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Employee ID</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.employee_id}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Name</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.firstname} {employee.lastname}</dd> 
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Gender</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.gender}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Phone</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='phone' type='tel' value={employee.phone} onChange={(e) => setEmployee({...employee, phone:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Email</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='email' type='text' value={employee.email} onChange={(e) => setEmployee({...employee, email:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Password</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='password' type='text' value={employee.password} onChange={(e) => setEmployee({...employee, password:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Confirm Password</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='confirmPassword' type='text' value={employee.confirmPassword} onChange={(e) => setEmployee({...employee, confirmPassword:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Address</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='address' type='text' value={employee.address} onChange={(e) => setEmployee({...employee, address:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Position</label>
          </div>  
          <div className='col-30'>
            <select className='input-x' name='position' value={employee.position} onChange={(e) => setEmployee({...employee, position:e.target.value})}>
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
          <button className='btn-save' onClick={()=>{onSubmit()}}>Save</button>
        </div>

      </div>
    </div>
  )
}

export default EditEmployee