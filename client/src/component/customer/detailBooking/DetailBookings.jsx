import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams , Link} from 'react-router-dom';
import DetailRoom from '../detailRoom/DetailRoom';

const DetailBookings = () => {

  const location = useLocation();
  const val = location.state.val;

  const {booking_id} = useParams()

  const [booking , setBooking] = useState([])

  const [rooms , setRooms] = useState([])

  console.log(booking , rooms )

  useEffect(() => {
    const getBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/booking/${booking_id}`, { params: {val} })
        if (response.data.res === 0) {
            console.log("get Booking :", response);
            setBooking(response.data.book);
            setRooms(response.data.room)     
        }
      } catch (error) {
        alert("Failed to get booking")
      }
    }
    getBooking()
    }, []
  );
  
  return (
    <div className='body-c'>
      <div className='container-l'>
        <h1 className='h1-list'>Booking Information</h1>
        <div className='row'>
          <div className='col-30'>
            <dd>Booking no.</dd>
            <dt>{booking.booking_id}</dt>
          </div>
          <div className='col-30'>
            <dd>Booking date</dd>
            <dt>{booking.book_time}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Name</dd>
            <dt>{booking.firstname} {booking.lastname}</dt>
          </div>
          <div className='col-30'>
            <dd>ID Card</dd>
            <dt>{booking.id_card}</dt>
          </div>
          <div className='col-30'>
            <dd>Phone</dd>
            <dt>{booking.phone}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Email</dd>
            <dt>{booking.email}</dt>
          </div>
          <div className='col-30'>
            <dd>Address</dd>
            <dt>{booking.address}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Check-in date</dd>
            <dt>{booking.checkIn_date}</dt>
          </div>
          <div className='col-30'>
            <dd>Check-out date</dd>
            <dt>{booking.checkOut_date}</dt>
          </div>
        </div>
        <div className='row'>
          <div className='col-30'>
            <dd>Total Rooms Booked</dd>
            <dt>{booking.total_room}</dt>
          </div>
          
          <div className='col-30'>
            <dd>Total Price</dd>
            <dt>THB {booking.total_price} {booking.booking_status}</dt>
          </div>
        </div>

        {rooms.map((room, index) => (
          <div key={index}>
            <DetailRoom
              room={room}
            />
          </div>
        ))}

        <div className='aa'>
          <Link to={"/allBooking"} state={{ val }} className='btn-cancle'>Back</Link>
        </div>
      </div>
    </div>
  )
}

export default DetailBookings