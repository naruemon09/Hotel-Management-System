import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './CheckInBooking.css'
import axios from 'axios';
import swal from 'sweetalert';

const CheckInBooking = ({booking , room, setRooms}) => {
  
  const location = useLocation();
  const val = location.state.val;

  const [checkIn, setCheckIn] = useState([]);

  const [status , setStatus] = useState(false)

  console.log(status)

  useEffect(() => {
      const getCheckIn = async () => {
          try {
              const response = await axios.get('http://localhost:3000/checkOut', {params: {val}})
              console.log(response)
              if (response.data.res === 0) {
                console.log("CheckIn data:", response);
                setCheckIn(response.data.checkIn);
              }
            } catch (error) {
              alert("Failed to get CheckIn")
            }
      }
      getCheckIn()}, []
  );

  useEffect(() => {
    setStatus(checkIn.find(b => b.booking_id === booking.booking_id && b.room_no === room.room_no)) ? true : false
  }, [checkIn]);

  const onSubmit = async () => {
    try {
      if (!room.id_card || !room.firstname || !room.lastname || !room.phone || !room.email || !room.address) {
        alert("Please fill in all required fields.");
        return;
      }
      const arg = {
        booking_id: booking.booking_id,
        id_card: room.id_card,
        firstname: room.firstname,
        lastname: room.lastname,
        phone: room.phone,
        email: room.email,
        address: room.address,
        checkIn_time: new Date(),
        end_date: new Date(booking.checkOut_date),
        room_charge: booking.total_price,
        room_no: room.room_no,
      };
      console.log('arg',arg)
      
      const response = await axios.post('http://localhost:3000/checkIn', arg , { params: {val} })
      console.log(response)
      if (response.data.res === 0) {
        swal({
          title: "CheckIn!",
          text: `Check-in Room Number : ${room.room_no} suceess`,
          icon: "success",
        }).then(() => {
          setStatus(true); 
        });      
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setRooms(prevRooms => prevRooms.map(r => 
      r.room_no === room.room_no ? { ...r, [name]: value } : r
    ));
    console.log(room)
  } 

  return (
      <div className='container-list' style={{marginTop:'1rem'}}>
        <h1 className='h1-list'>Guest Information</h1>
        <div className='row'>
          <div className='col-30'>
            <dd>Room Number</dd>
            <dt>{room.room_no}</dt>
          </div>
          <div className='col-30'>
            <dd>Room Type</dd>
            <dt>{room.room_type}</dt>
          </div>
          <div className='col-30'>
            <dd>Check-in Time</dd>
            <dt>{new Date().toLocaleString()}</dt>
          </div>
        </div>
        <form>
        <div className='row'>
          <div className='col-30'>
            <dd>ID Card</dd>
            <input className='input-y' name='id_card' type='text' value={room.id_card}  onChange={handleOnchange} disabled={status} required/>
          </div>
          <div className='col-30'>
            <dd>Firstname</dd>
            <input className='input-y' name='firstname' type='text' value={room.firstname} onChange={handleOnchange} disabled={status} required/>
          </div>
          <div className='col-30'>
            <dd>Lastname</dd>
            <input className='input-y' name='lastname' type='text' value={room.lastname} onChange={handleOnchange} disabled={status} required/>
          </div>
        </div>
        <div className='row'>
          <div className='col-30-c'>
            <dd>Phone</dd>
            <input className='input-y' name='phone' type='text' value={room.phone} onChange={handleOnchange} disabled={status} required/>
          </div>
          <div className='col-30-c'>
            <dd>Email</dd>
            <input className='input-y' name='email' type='text' value={room.email} onChange={handleOnchange} disabled={status} required/>
          </div>
        </div>
        <div className='row'>
          <div className='col-30-c'>
            <dd>Address</dd>
            <input className='input-y' style={{width:'705px'}} name='address' type='text' value={room.address} onChange={handleOnchange} disabled={status} required/>
          </div>
        </div>

        <h2 style={{textAlign:'start'}}>Room Charge</h2>
        <dd>Price</dd>
        <dt>THB {room.price} {booking.booking_status}</dt>

        {
          status ?
            <h2 className='aa' style={{color: 'green'}}>Check-in</h2>
           : 
            <div className='aa'>
              <button className='btn-checkin' type='button' onClick={onSubmit}>Check-in</button>
            </div>
        }
        </form>
      </div>
    
  )
}

export default CheckInBooking