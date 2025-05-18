import React, { useEffect, useState } from 'react'
import './DetailRoom.css'
import { useLocation , Link, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailRoom = () => {

  const location = useLocation();
  const val = location.state.val;
  
  const {room_no} = useParams()
  
  const [room , setRoom] = useState({})

  useEffect(() => {
    const getRoom = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/room/${room_no}`, { params: {val} })
            if (response.data.res === 0) {
                console.log("get Room :", response);
                setRoom(response.data.room);
            }
          } catch (error) {
            alert("Failed to get room")
          }
      }
      getRoom()
    }, []
  );
    return (
      <div className='body-x'>
      <div className='container-list'>
        <h1 className='h1-list'>Create Room</h1>
        <div className='row'>
          <div className='col-50'>
            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Room Number</label>
              </div>  
              <div className='col-75'>
                <dd>{room.room_no}</dd>
              </div> 
            </div>

            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Room Type</label>
              </div>  
              <div className='col-75'>
                <dd>{room.room_type}</dd>
              </div> 
            </div>

            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Description</label>
              </div>  
              <div className='col-75'>
                <dd>{room.description}</dd>
              </div> 
            </div>

            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Max Guest</label>
              </div>  
              <div className='col-75'>
                <dd>{room.max_guest}</dd>
              </div> 
            </div>

            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Bed Type</label>
              </div>  
              <div className='col-75'>
                <dd>{room.bed}</dd>
              </div> 
            </div>

            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Benefits</label>
              </div>  
              <div className='col-75'>
                <dd>{room.health_club ? 'Health Club' : ''}</dd>
                <dd>{room.swimming_pool ? 'Swimming Pool' : ''}</dd>
                <dd>{room.restaurant ? 'Restaurant' : ''}</dd>
                <dd>{room.bar ? 'Bar' : ''}</dd>
                <dd>{room.spa ? 'Spa' : ''}</dd>
              </div>
            </div>

            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Price</label>
              </div>  
              <div className='col-75'>
                <dd>{room.price}</dd>
              </div> 
            </div>

            <div className='row'>
              <div className='col-25'>
                <label className='label-x'>Room Status</label>
              </div>  
              <div className='col-75'>
                <dd>{room.room_status}</dd>
              </div> 
            </div>
          </div>

          <div className='col-50'>
            <img src={`http://localhost:3000/uploads/${room.image}`} />
          </div>
        </div>
        
        <br/>
        <div className='aa'>
          <button className='btn-cancle'><Link to='/rooms' state={{ val }} style={{color:'white'}}>Back</Link></button>
        </div>

      </div>
    </div>
    )
  }

export default DetailRoom