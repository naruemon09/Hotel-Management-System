import React, { useEffect, useState } from 'react'
import './ListCustomer.css'
import { useLocation , Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ListCustomer = () => {

    const location = useLocation();
    const val = location.state.val;
    const [customer, setCustomer] = useState([]);
    console.log('customer : ',val)

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await axios.get('http://localhost:3000/customer', {params: {val}})
                console.log(response)
                if (response.data.res === 0) {
                    console.log("Customer data:", response);
                    setCustomer(response.data.user);
                }
              } catch (error) {
                alert("Failed to get customer")
              }
        }
        getCustomer()}, []
    );

    const onSubmitDelete = async (id_card) => {
      try {
        const response = await axios.delete(`http://localhost:3000/customer/${id_card}`, { params: {val}})
        console.log(response)
        if (response.data.res === 0) {
          swal({
            title: "Delete!",
            text: `Delete Customer : ${id_card} suceess`,
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
      <h1 className='h1-list'>Customers</h1>

      <table>
        <thead>
          <tr>
            <th>ID Card</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

          <tbody>
            {customer.map((user) => (
              <tr key={user.id_card}>
                <td>{user.id_card}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <Link to={"/customers/"+user.id_card} state={{val}} className='btn-icon-view' style={{ marginRight: '5px' }}><FaRegEye size={20}/></Link>
                  <button onClick={() => onSubmitDelete(user.id_card)} className='btn-icon-del'><i><MdDeleteOutline size={20}/></i></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ListCustomer