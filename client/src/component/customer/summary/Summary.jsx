import React, { useState } from 'react'
import { useLocation , Link} from 'react-router-dom';

const Summary = ({date , selectedRooms , setSelectedRooms , currentStep , night , totalPrice , rooms , setRooms}) => {

  const location = useLocation();
  const val = location.state.val;

  console.log('be room',rooms)
  console.log('be selectedRooms',selectedRooms)

  const removeRoom = (index) => {

    setRooms([...rooms, index]);
    setSelectedRooms(selectedRooms.filter(r => r.room_no !== index.room_no));
  
  };


  return (
    <div >
      <div className='container-b'>
        <h1 className='h1-list' style={{textAlign:"center"}}>Booking Summary</h1>
        <hr/>

        <dd style={{margin:"0"}}>CheckIn Date :  {date.checkIn_date}</dd> 
        <dd style={{margin:"0"}}>CheckOut Date : {date.checkOut_date}</dd>
        <dd style={{margin:"0"}}>Night : {night}</dd>
        
        {selectedRooms.map((room, index) => (
          <div key={index}>
              <div className='header-r'>
                <h2>{room.room_type}</h2>
                <dd>THB {(room.price)}</dd>
            </div> 
            {currentStep !== 1 && (
              <a style={{color:'red', fontSize:'16px'}} onClick={() => removeRoom(room)}>remove</a>
            )}
          </div>
        ))}  
          
        <hr/>
        <div className='header-r'>
          <h1 className='h1-list'>Total</h1>
          <h1 className='h1-list'>THB {totalPrice}</h1>
        </div>
      </div>
        
    </div>
  )
}

export default Summary