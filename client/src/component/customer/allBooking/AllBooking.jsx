import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { FaHotel } from "react-icons/fa6";
import axios from 'axios';

const AllBooking = () => {

    const location = useLocation();
    const val = location.state?.val;
    const id_card = val.id_card.toString().split('').reverse().join('');
    const user = location.state.user;
    console.log(id_card);

    const [booking , setBooking] = useState([])

    useEffect(() => {
        const getBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/bookings/${id_card}`, { params: {val} })
                if (response.data.res === 0) {
                    console.log("get Booking1 :", response);
                    setBooking(response.data.book);
                }
            } catch (error) {
                alert("Failed to get booking")
            }
        }
        getBooking()
        }, []
    );
    
    const cancelDate = (checkIn_date) => {
        const cancel = new Date(checkIn_date);
        cancel.setDate(cancel.getDate() - 1);
        return cancel;
    }

    console.log(cancelDate)

    const today = new Date();

  return (
    <div className='body-c'>
        <h3 style={{marginTop:'7rem'}}>All Booking</h3>

        {booking.map((book,index) => (
            <div key={index} style={{marginTop:'1rem'}} className='container-l'>
                <div className='header-r'>
                    <h2 style={{textAlign:'left'}}><FaHotel /> Completed Booking No. {book.booking_id}</h2>
                    <h2>THB {book.total_price}</h2>
                </div>
                <dd>Booking Date : {book.book_time}</dd>
                <dd>Check-in Date : {book.checkIn_date}</dd>
                <dd>Check-out Date : {book.checkOut_date}</dd>
                <dd>Room : {book.total_room}</dd>
                {book.booking_status === 'Cancle' ? 
                    <h2 className='aa' style={{color: 'red'}}>Cancel</h2>
                :
                    <div className='aa'>
                        <Link to={"/detail/"+book.booking_id} state={{ val }} className='btn-save'>Detail</Link>
                        {today <= cancelDate(book.checkIn_date) && (
                            <Link to={"/cancel/"+book.booking_id} state={{ val:val , user:user }} className='btn-cancle' style={{marginLeft:'10px'}}>Cancel</Link>
                        )}
                    </div>
                }
            </div>
        ))}
        
    </div>
  )
}

export default AllBooking