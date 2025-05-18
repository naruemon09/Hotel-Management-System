import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SelectRoom from '../selectRoom/SelectRoom';
import swal from 'sweetalert';

const WalkIn = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const val = location.state.val;

  // const [checkIn_date, setCheckIn_date] = useState(new Date())
  const [checkIn_date, setCheckIn_date] = useState(new Date())
  const [checkOut_date, setCheckOut_date] = useState('')

  const [checkIn , setCheckIn] = useState({
    id_card:"",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: ""
  })
  
  const [rooms , setRooms] = useState(null)

  const [selectedRooms, setSelectedRooms] = useState(null);

  const night = Math.ceil((new Date(checkOut_date) - new Date(checkIn_date)) / (1000 * 60 * 60 * 24))
  console.log(night)

  const onSubmitCheckIn = async () => {
    try {
      if (!checkIn.id_card || !checkIn.firstname || !checkIn.lastname || !checkIn.phone || !checkIn.email || !checkIn.address) {
        alert("Please fill in all required fields.");
        return;
      }
      const phonePattern = /[0-9]{10}/
      if (phonePattern.test(checkIn.phone))  {
        const arg = {
          id_card: checkIn.id_card,
          firstname: checkIn.firstname,
          lastname: checkIn.lastname,
          phone: checkIn.phone,
          email: checkIn.email,
          address: checkIn.address,
          checkIn_time: checkIn_date,
          end_date: new Date(checkOut_date),
          room_charge: (selectedRooms.price)*night,
          room_no: selectedRooms.room_no,
        }
        const response = await axios.post('http://localhost:3000/checkInWalkIn', arg ,{ params: {val}})
        console.log(response)
        if (response.data.res === 0) {
          swal({
            title: "CheckIn!",
            text: `Check-in Room Number : ${selectedRooms.room_no} suceess`,
            icon: "success",
          });
          navigate(`/detailWalkIn/${response.data.checkIn.checkIn_id}`, {state:{ val: response.data.val}})
        }
      } else {
        alert('Please enter a correct phone number (10 digits)')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='body-x'>
      <form>
      <div className='container-list'>
        <h1 className='h1-list'>Check-in</h1>
        
        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>ID Card</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='id_card' type='text' value={checkIn.id_card} onChange={(e) => setCheckIn({...checkIn, id_card:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Firstname</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='firstname' type='text' value={checkIn.firstname} onChange={(e) => setCheckIn({...checkIn, firstname:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Lastname</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='lastname' type='text' value={checkIn.lastname} onChange={(e) => setCheckIn({...checkIn, lastname:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Phone</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='phone' type='tel' value={checkIn.phone} onChange={(e) => setCheckIn({...checkIn, phone:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Email</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='email' value={checkIn.email} onChange={(e) => setCheckIn({...checkIn, email:e.target.value})} required/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Address</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='address' type='text' value={checkIn.address} onChange={(e) => setCheckIn({...checkIn, address:e.target.value})} required/>
          </div> 
        </div>

        <SelectRoom
          checkIn_date={checkIn_date}
          checkOut_date={checkOut_date}
          setCheckOut_date={setCheckOut_date}
          rooms={rooms}
          setRooms={setRooms}
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
          night={night}
        />

        <br/>
        <div className='aa'>
          <button className='btn-save' style={{backgroundColor: 'green'}} type="button" onClick={onSubmitCheckIn}>Check-in</button>
        </div>
      
      </div>
      </form>
    </div>
  )
}

export default WalkIn




// const date = new Date();
// const year = date.getFullYear();
// const month = String(date.getMonth() + 1).padStart(2, '0');
// const day = String(date.getDate()).padStart(2, '0');
// const formattedDate = `${year}-${month}-${day}`;
// console.log(formattedDate); // Example output: 2025-03-12