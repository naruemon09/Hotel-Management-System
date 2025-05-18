import React from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import DetailRoom from '../../../customer/detailRoom/DetailRoom';

const SelectRoom = ({checkIn_date , checkOut_date , setCheckOut_date , rooms , setRooms , selectedRooms , setSelectedRooms , night}) => {

    const location = useLocation();
    const val = location.state.val;

    const onSubmit = async () => {
        try {
            if (!checkOut_date) {
                alert("กรุณากรอกวันที่ Check-out ก่อนดำเนินการ");
                return;
            }
          const response = await axios.post('http://localhost:3000/checkRoom', {checkIn_date,checkOut_date} ,{ params: {val}})
          console.log(response)
          setRooms(response.data.checkRoom)
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div>
        <h1 className='h1-list' style={{marginTop:'3rem'}}>Selete Room</h1>
        <form>
            <div className='row'>
                <div className='col-30'>
                    <dd>Check-in Date</dd>
                    <dt>{new Date(checkIn_date).toLocaleString()}</dt>
                </div>

                <div className='col-30'>
                    <dd>Check-out Date</dd>
                    <input className='input-c' name='checkOut-date' type='date' value={checkOut_date} min={new Date(new Date(checkIn_date).setDate(new Date(checkIn_date).getDate() + 1)).toISOString().split('T')[0]} onChange={(e) => setCheckOut_date(e.target.value)}/>
                </div>

                <div className='col-30'>
                    <button className='btn-c' type='button' onClick={onSubmit}>Check Avaliable</button>
                </div>
            </div>
        </form>

            {rooms === null ? '' :
                (<div className='row'>
                    <div className='col-30'>
                        <dd>Select a Room</dd>
                        <select className='input-x' onChange={(e) => {
                            const selectedRoomNo = Number(e.target.value)
                            const room = rooms.find(r => r.room_no === selectedRoomNo);
                            console.log("Selected Room No:", selectedRoomNo);
                            console.log("Room:", room);
                            setSelectedRooms(room);
                            }}>
                            <option>---Select---</option>   
                            {rooms.map((room) => (
                                <option key={room.room_no} value={room.room_no} style={{color:'black'}}>
                                    {room.room_no} | {room.room_type} | {room.bed}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>)  
            }
            
            {selectedRooms === null ? '' : (
                <div>
                    <DetailRoom room={selectedRooms} /> 

                    <h1 className='h1-list' style={{marginTop:'3rem'}}>Total Price : THB {(selectedRooms.price)*night}</h1>
                </div>
            )}
        
    </div>
  )
}

export default SelectRoom