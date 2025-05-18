import React, { useEffect, useState } from 'react'
import { useLocation , Link} from 'react-router-dom';
import axios from 'axios';
import DetailRoom from '../detailRoom/DetailRoom';

const Confirmation = ({bookingID}) => {

  const location = useLocation();
  const val = location.state.val;
  const user = location.state.user;
  console.log('confirm : ',user)

  const [booking , setBooking] = useState({})
  const [room , setRoom] = useState([])
  console.log("booking :", booking);
  console.log("room :", room);

  useEffect(() => {
    const getBooking = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/booking/${bookingID}`, { params: {val} })
            if (response.data.res === 0) {
                console.log("get Booking :", response);
                setBooking(response.data.book);
                setRoom(response.data.room);
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
      <div className='col-100'>

        <div className='container-l' style={{marginTop: "1rem"}}>
          <h3>Completed Booking No. {booking.booking_id}</h3>
          <div className='jus'>
          <dd>Name : {booking.firstname} {booking.lastname}</dd>
          <br/> 
          <dd>CheckIn-date : {booking.checkIn_date}</dd>
          <dd>CheckOut-date : {booking.checkOut_date}</dd>
          <dd>Room : {booking.total_room}</dd>
          <br/> 
          <dd>Total Amount : THB {booking.total_price}</dd>
            
          {room.map((rooms, index) => (
            <div key={index} >
              <DetailRoom
                room={rooms}
              />
            </div>
          ))}
            
          </div>

          <div className='aa'>
            <Link to={"/allBooking"} state={{ val:val , user:user }} className='btn-save'>CONTINUE</Link>
          </div>

        </div>
      </div>

    </div>


  )
}

export default Confirmation