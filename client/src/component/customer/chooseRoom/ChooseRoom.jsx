import React from 'react'
import './ChooseRoom.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DetailRoom from '../detailRoom/DetailRoom';

const ChooseRoom = ({selectedRooms, setSelectedRooms, date, setDate , rooms , setRooms}) => {

  const location = useLocation();
  const val = location.state.val;

  const today = new Date().toISOString().split('T')[0]

  const checkOutDate =  date.checkIn_date ? 
                        new Date(new Date(date.checkIn_date).setDate(new Date(date.checkIn_date).getDate() + 1)).toISOString().split('T')[0] 
                        : today

  const onSubmit = async () => {
    try {
      if (!date.checkIn_date || !date.checkOut_date) {
        alert("กรุณากรอกวันที่ Check-in และ Check-out ก่อนดำเนินการ");
        return;
      }
      if (new Date(date.checkOut_date) <= new Date(date.checkIn_date)) {
        alert("Check-out Date ต้องเป็นวันหลังจาก Check-in Date อย่างน้อย 1 วัน");
        return;
      }
      
      const response = await axios.post('http://localhost:3000/checkRoom', date ,{ params: {val}})
      console.log(response)
      setRooms(response.data.checkRoom)
    } catch (error) {
      console.log(error)
    }
  }

  const addRoom = (index) => {
    setSelectedRooms([...selectedRooms, index]);
    setRooms(rooms.filter(r => r.room_no !== index.room_no));
  }

  return (
    <div className='body-c'>
      <div className='container-c'>
          <div className='row'>
            <div className='col-30'>
              <label className='label-c'>Check-in Date</label>
              <input className='input-c' name='checkIn-date' type='date' min={today} max={date.checkOut_date} value={date.checkIn_date} onChange={(e) => setDate({...date, checkIn_date:e.target.value})} required/>
            </div>

            <div className='col-30'>
              <label className='label-c'>Check-out Date</label>
              <input className='input-c' name='checkOut-date' type='date' min={checkOutDate} value={date.checkOut_date} onChange={(e) => setDate({...date, checkOut_date:e.target.value})} required/>
            </div>

            <div className='col-30'>
              <button className='btn-c' onClick={() => onSubmit()}>Check Avaliable</button>
            </div>
          </div>
      </div>

      {rooms.map((room , index) => (
        <div key={index}>
          <div style={{position:'absolute' , marginTop:'20rem' , marginLeft:'53rem'}}>
            <button className='btn-save' onClick={() => addRoom(room)}>ADD BOOK</button> 
          </div>
          <DetailRoom
            room={room}
          />
        </div>
      ))}
    </div>
  )
}

export default ChooseRoom