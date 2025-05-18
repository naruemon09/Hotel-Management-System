import React, { useState } from 'react'
import './AddPenalty.css'

const AddPenalty = ({popup , onClose , checkIn , setCheckIn , totalPrice}) => {

    const handleSave = () => {
        onClose();
      };

  return (
    
    popup && (
    <div className='body-x'>
        <div className="popup">
          <div className="popup-content">
            <h2>Add Penalty Amount</h2>

            <div className='row'>
                <div className='col-50' style={{justifyItems:'start'}}>
                    <label className='label-x' >Room Charge</label>
                </div>
                <div className='col-25'>
                <dd>{checkIn.room_charge}</dd>
                </div>
            </div>
            <div className='row'>
                <div className='col-50' style={{justifyItems:'start'}}>
                    <label className='label-x'>Damage Fee</label>
                </div>
                <div className='col-30' >
                    <input className='input-c' name='damage_fee' type="number" value={checkIn.damage_fee} onChange={(e) => setCheckIn({...checkIn, damage_fee:e.target.value})}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-50' style={{justifyItems:'start'}}>
                    <label className='label-x'>Late CheckOut Fee</label>
                </div>
                <div className='col-30'>
                    <input className='input-c' name='late_checkOut_fee' type="number" value={checkIn.late_checkOut_fee} onChange={(e) => setCheckIn({...checkIn, late_checkOut_fee:e.target.value})}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-50' style={{justifyItems:'start'}}>
                    <label className='label-x'>Amount</label>
                </div>
                <div className='col-25'>
                    <dd>THB {totalPrice}</dd>
                </div>
            </div>
            
            <div className="popup-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
        </div>
      )
    
  )
}

export default AddPenalty