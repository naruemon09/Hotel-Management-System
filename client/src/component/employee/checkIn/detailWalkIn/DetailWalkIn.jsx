import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const DetailWalkIn = () => {

  const location = useLocation();
  const val = location.state.val;

  const {checkIn_id} = useParams()

  const [checkIn , setCheckIn] = useState([])

  useEffect(() => {
    const getCheckIn = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/checkIn/${checkIn_id}`, { params: {val} })
        if (response.data.res === 0) {
            console.log("get CheckIn :", response);
            setCheckIn(response.data.checkIn);
        }
      } catch (error) {
        alert("Failed to get CheckIn")
      }
    }
    getCheckIn()
    }, []
  );

  return (
    <div className='body-x'>
      <div className='container-list'>
        <h1 className='h1-list'>Check-in Information</h1>

        <div className='row'>
          <div className='col-30'>
            <dd>Name</dd>
            <dt>{checkIn.firstname} {checkIn.lastname}</dt>
          </div>
          <div className='col-30'>
            <dd>ID Card</dd>
            <dt>{checkIn.id_card}</dt>
          </div>
          <div className='col-30'>
            <dd>Phone</dd>
            <dt>{checkIn.phone}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Email</dd>
            <dt>{checkIn.email}</dt>
          </div>
          <div className='col-30'>
            <dd>Address</dd>
            <dt>{checkIn.address}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Check-in date</dd>
            <dt>{checkIn.checkIn_time}</dt>
          </div>
          <div className='col-30'>
            <dd>Check-out date (end date)</dd>
            <dt>{checkIn.end_date}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Room Number</dd>
            <dt>{checkIn.room_no}</dt>
          </div>
          <div className='col-30'>
            <dd>Room Type</dd>
            <dt>{checkIn.room_type}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Total Price</dd>
            <dt>THB {checkIn.room_charge} {checkIn.payment_status}</dt>
          </div>
        </div>
      </div>


    </div>
  )
}

export default DetailWalkIn