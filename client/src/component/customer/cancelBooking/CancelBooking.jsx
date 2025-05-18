import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DetailBookings from '../detailBooking/DetailBookings';

const CancelBooking = () => {

  const location = useLocation();
  const val = location.state.val;
  const user = location.state.user;
  const navigate = useNavigate()

  const {booking_id} = useParams()

  const [refund , setRefund] = useState({
    bank_name: "",
    account_name: "",
    account_no: ""
  })

  console.log(refund)

  const [popup , setPopup] = useState(false)

  const handleCancel = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/booking/${booking_id}`, refund ,{ params: {val}})
        console.log(response)
        if (response.data.res === 0) {
          swal({
            title: "Cancel!",
            text: `Cancel Booking : ${booking_id} suceess`,
            icon: "success",
          });
          navigate('/allBooking', {state:{ val: response.data.val , user:user}})
          closePopup();
        }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <div className='aa' >
        <button style={{position:'absolute' , marginTop:'6rem' , marginRight:'2rem'}} className='btn-cancle' onClick={()=>{handleCancel()}}>Cancel</button>
      </div>
      

      <DetailBookings/>
        
      {popup === true && (
        <div className='body-x'>
          <div className="popup">
            <div className="popup-content">
              <h1 className='h1-list'>Bank Account Information for Refund</h1>
              <div className='row'>
                <div className='col-50'>
                  <label className='label-x'>Bank Name</label>
                </div>  
                <div className='col-30'>
                <input className='input-c' name='bank_name' type='text' value={refund.bank_name} onChange={(e) => setRefund({...refund, bank_name:e.target.value})}/>
                </div> 
              </div>
              <div className='row'>
                <div className='col-50'>
                  <label className='label-x'>Account Holder's Name</label>
                </div>  
                <div className='col-30'>
                <input className='input-c' name='account_name' type='text' value={refund.account_name} onChange={(e) => setRefund({...refund, account_name:e.target.value})}/>
                </div> 
              </div>
              <div className='row'>
                <div className='col-50'>
                  <label className='label-x'>Bank Account Number</label>
                </div>  
                <div className='col-30'>
                <input className='input-c' name='account_no' type='text' value={refund.account_no} onChange={(e) => setRefund({...refund, account_no:e.target.value})}/>
                </div> 
              </div>
            <div className="popup-actions">
              <button onClick={() => onSubmit()}>Save</button>
              <button onClick={() => closePopup()}>Cancel</button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CancelBooking