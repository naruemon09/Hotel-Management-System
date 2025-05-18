import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AddPenalty from '../addPenalty/AddPenalty';
import swal from 'sweetalert';

const DetailCheckOut = () => {
    
  const location = useLocation();
  const val = location.state.val;

  const {checkIn_id} = useParams()

  const [checkIn , setCheckIn] = useState({
    damage_fee: null,
    late_checkOut_fee: null,
  })

  const [checkOut_time , setCheckOut_time] = useState(new Date())

  const [popup , setPopup] = useState(false)

  const handleAddPenalty = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const amount = () => {
    const totalPriceBooking = Number(checkIn.damage_fee) + Number(checkIn.late_checkOut_fee)
    const totalPriceWalkIn = Number(checkIn.price) + Number(checkIn.damage_fee) + Number(checkIn.late_checkOut_fee) 

    return checkIn.booking_id === null ? totalPriceWalkIn : totalPriceBooking
  }
    
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


  const onSubmit = async () => {
    try {
      const arg = {
        damage_fee: checkIn.damage_fee,
        late_checkOut_fee: checkIn.late_checkOut_fee,
        checkOut_time: checkOut_time
      };
      console.log('arg',arg)
      
      const response = await axios.post(`http://localhost:3000/checkOut/${checkIn_id}`, arg , { params: {val} })
      console.log(response)
      if (response.data.res === 0) {
        swal({
          title: "CheckOut!",
          text: `Check-out Room Number : ${checkIn.room_no} suceess`,
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
        // alert(`Check-out ID : ${checkIn_id} suceess`)
      }
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='body-x'>
      <div className='container-list'>
      <div className='row'>
          <div className='col-30'>
            <h1 className='h1-list'>Type : {checkIn.booking_id === null ? 'Walk-in' : `Booking ${checkIn.booking_id}` }</h1>
          </div>

          {checkIn.checkOut_time === null ? 
          <div className='aa'>
            <button className='btn-save' onClick={handleAddPenalty}>Add Penalty Amount +</button>
          </div>  : '' 
          }
        </div>

        <h1 className='h1-list' style={{marginBottom:'0'}}>Guest Information</h1>
        
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

        <h1 className='h1-list' style={{marginBottom:'0' , marginTop:'3rem'}}>Room Detail</h1>

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
            <dd>Check-in date</dd>
            <dt>{checkIn.checkIn_time}</dt>
          </div>
          <div className='col-30'>
            <dd>Check-out date</dd>
            <dt>{new Date(checkOut_time).toLocaleString()}</dt>
          </div>
        </div>

        <h1 className='h1-list' style={{marginBottom:'0' , marginTop:'3rem'}}>Payment Information</h1>

        <div className='row'>
          <div className='col-30'>
            <dd>Room Charge</dd>
            <dt>THB {checkIn.room_charge} {checkIn.payment_status}</dt>
          </div>
        </div>

        {(checkIn.damage_fee > 0 || checkIn.late_checkOut_fee > 0) && (
        <div>
            <div style={{marginTop:'1rem'}}>
                <dd>Damage Fee </dd>
                <dt>THB {checkIn.damage_fee}</dt>
            </div>    
            <div style={{marginTop:'1rem'}}>
                <dd>Late CheckOut Fee</dd>
                <dt>THB {checkIn.late_checkOut_fee}</dt>
            </div>
            <div style={{marginTop:'1rem'}}>
                <dd>Amount</dd>
                <dt>THB {amount()} {checkIn.payment_status}</dt>
            </div>
        </div>    
        )}

        {checkIn.checkOut_time === null ?
          <div className='aa'>
            <button className='btn-save' onClick={()=>{onSubmit()}}>Check-out</button>
          </div> : 
          <h2 className='aa' style={{color: 'red'}}>Check-out</h2>
        }

      </div>

      <AddPenalty
        popup={popup} 
        onClose={closePopup}
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        totalPrice={amount()}
      />
      
    </div>
  )
}

export default DetailCheckOut