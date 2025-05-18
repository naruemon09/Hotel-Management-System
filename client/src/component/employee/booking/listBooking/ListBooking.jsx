import React, { useEffect, useState } from 'react'
import './ListBooking.css'
import { useLocation , Link } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { LuMapPinCheckInside } from "react-icons/lu";


const ListBooking = () => {

    const location = useLocation();
    const val = location.state?.val;
    const [booking, setBooking] = useState([]);
    console.log(val)

    useEffect(() => {
        const getBooking = async () => {
            try {
                const response = await axios.get('http://localhost:3000/bookings', {params: {val}})
                console.log(response)
                if (response.data.res === 0) {
                    console.log("Booking data:", response);
                    setBooking(response.data.booking);
                }
              } catch (error) {
                alert("Failed to get booking")
              }
        }
        getBooking()}, []
    );

  return (
    <div className='body-x'>
    <div className='container-list'>
      <h1 className='h1-list'>Bookings</h1>

      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Book time</th>
            <th>Name</th>
            <th>Check-in date</th>
            <th>Check-out date</th>
            <th>Total Room</th>
            <th>Total Price</th>
            <th>Booking Status</th>
            <th>Action</th>
          </tr>
        </thead>

          <tbody>
            {booking.map((bookings) => (
              <tr key={bookings.booking_id}>
                <td>{bookings.booking_id}</td>
                <td>{bookings.book_time}</td>
                <td>{bookings.firstname} {bookings.lastname}</td>
                <td>{bookings.checkIn_date}</td>
                <td>{bookings.checkOut_date}</td>
                <td>{bookings.checked_in_rooms} / {bookings.total_room}</td>
                <td>{bookings.total_price}</td>
                <td>{bookings.booking_status}</td>
                <td>
                  {bookings.booking_status === 'Cancle' ? '' :
                    <Link to={"/bookings/"+bookings.booking_id} state={{val}} className='btn-icon-edit' style={{ marginRight: '5px' }}><LuMapPinCheckInside size={20}/></Link>
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ListBooking




// useEffect คือ 
// https://medium.com/lotuss-it/%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%9A-usestate-%E0%B9%81%E0%B8%A5%E0%B8%B0-useeffect-%E0%B9%83%E0%B8%99-react-js-%E0%B8%81%E0%B8%B1%E0%B8%99-478d7ef37818