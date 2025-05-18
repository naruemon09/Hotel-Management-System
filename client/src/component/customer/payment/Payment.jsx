import React, { useState } from 'react'
import './Payment.css'
import { useLocation , Link } from 'react-router-dom';

const Payment = ({payment , setPayment}) => {

  const location = useLocation();
  const val = location.state.val;

  return (
    <div className='body-c'>
      <div className='row'>
        <div className='col-70'>

          <div className='container-c'>
            <h3>Payment Information</h3>
            <form>
              <div className='jus'>
                <label>Bank card no.</label>
                <input name='card_no' type='text' value={payment.card_no} onChange={(e) => setPayment({...payment, card_no:e.target.value})} required/>
                <label>Cardholder name</label>
                <input name='name' type='text' value={payment.name} onChange={(e) => setPayment({...payment, name:e.target.value})}/>
                <label>MM/YY</label>
                <input name='mm/yy' type='text' value={payment.mm_yy} onChange={(e) => setPayment({...payment, mm_yy:e.target.value})}/>
                <label className=''>CVV/CVC</label>
                <input name='cvv' type='text' value={payment.cvv} onChange={(e) => setPayment({...payment, cvv:e.target.value})}/>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Payment