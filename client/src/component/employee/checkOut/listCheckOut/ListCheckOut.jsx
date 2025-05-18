import React, { useEffect, useState } from 'react'
import './ListCheckOut.css'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { LuMapPinCheckInside } from "react-icons/lu";

const ListCheckOut = () => {

    const location = useLocation();
    const val = location.state.val;
    const [checkOut, setCheckOut] = useState([]);
    console.log(val)

    useEffect(() => {
        const getCheckOut = async () => {
            try {
                const response = await axios.get('http://localhost:3000/checkOut', {params: {val}})
                console.log(response)
                if (response.data.res === 0) {
                    console.log("CheckOut data:", response);
                    setCheckOut(response.data.checkIn);
                }
              } catch (error) {
                alert("Failed to get checkOut")
              }
        }
        getCheckOut()}, []
    );

  return (
    <div className='body-x'>
        <div className='container-list'>
          <div className='header-list'>
            <h1 className='h1-list'>Check-out</h1>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Booking ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Room Number</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Action</th>
              </tr>
            </thead>
    
              <tbody>
                {checkOut.map((checkOut , index) => (
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{checkOut.booking_id}</td>
                    <td>{checkOut.firstname} {checkOut.lastname}</td>
                    <td>{checkOut.phone}</td>
                    <td>{checkOut.room_no}</td>
                    <td>{checkOut.checkIn_time}</td>
                    <td>{checkOut.checkOut_time}</td>
                    <td>
                      <Link to={"/checkOut/"+checkOut.checkIn_id} state={{val}} className='btn-icon-del' style={{ marginRight: '5px' }}><LuMapPinCheckInside size={20}/></Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        </div>
  )
}

export default ListCheckOut




// https://sweetalert2.github.io/#examples