import React, { useEffect, useState } from 'react'
import './ListEmployee.css'
import { useLocation , Link} from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ListEmployee = () => {

  const location = useLocation();
    const val = location.state.val;
    const [employee, setEmployee] = useState([]);
    console.log(val)

    useEffect(() => {
        const getEmployee = async () => {
            try {
                const response = await axios.get('http://localhost:3000/employee', {params: {val}})
                console.log(response)
                if (response.data.res === 0) {
                    console.log("Employee data:", response);
                    setEmployee(response.data.user);
                }
              } catch (error) {
                alert("Failed to get employee")
              }
        }
        getEmployee()}, []
    );

    const onSubmitDelete = async (id_card) => {
      try {
        const response = await axios.delete(`http://localhost:3000/employee/${id_card}`, { params: {val}})
        console.log(response)
        if (response.data.res === 0) {
          swal({
            title: "Delete!",
            text: `Delete Employee : ${id_card} suceess`,
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='body-x'>
    <div className='container-list'>
      <div className='header-list'>
        <h1 className='h1-list'>Employees</h1>
        <Link to='/signUpAdmin' state={{ val }} className='btn'>Add Employee +</Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID Card</th>
            <th>EmployeeID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>

          <tbody>
            {employee.map((user) => (
              <tr key={user.id_card}>
                <td>{user.id_card}</td>
                <td>{user.employee_id}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.position}</td>
                <td>
                  {/* <Link to={"/employees/"+user.id_card} state={{val}} className='btn-icon-view' style={{ marginRight: '5px' }}><FaRegEye size={20}/></Link> */}
                  
                  <Link to={"/employees/"+user.id_card} state={{val , id_card:user.id_card}} className='btn-icon-view' style={{ marginRight: '5px' }}><FaRegEye size={20}/></Link>
                  <button className='btn-icon-del' onClick={() => onSubmitDelete(user.id_card)}><i><MdDeleteOutline size={20}/></i></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ListEmployee