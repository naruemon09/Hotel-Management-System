import React, { useEffect, useState } from 'react'
import { useLocation , Link, useParams } from 'react-router-dom';
import './DetailEmployee.css'
import axios from 'axios';

const DetailEmployee = () => {

  const location = useLocation();
  const val = location.state.val;
  const id_card = location.state.id_card;
  console.log('val detailEmp' , val)

  // const {id_card} = useParams()

  const [employee , setEmployee] = useState([])

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
          <div className='col-25'>
            <dd>{employee.phone}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Email</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.email}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Password</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.password}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Address</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.address}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Position</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.position}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Create Date</label>
          </div>  
          <div className='col-25'>
            <dd>{employee.create_date}</dd>
          </div> 
        </div>

        <br/>
        <div className='aa'>
          <button className='btn-cancle'><Link to='/employees' state={{ val }} style={{color:'white'}}>Back</Link></button>
        </div>
      </div>
    </div>
  )
}

export default DetailEmployee