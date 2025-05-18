import React, { useEffect, useState } from 'react'
import './EditRoom.css'
import { useLocation, useNavigate , Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EditRoom = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const val = location.state.val;
  
  const {room_no} = useParams()
  
  const [room , setRoom] = useState({
      room_type: "", 
      description: "", 
      max_guest: "", 
      bed: "", 
      image: "",
      price: "", 
      room_status: "", 
      health_club: "", 
      swimming_pool: "", 
      restaurant: "", 
      bar: "", 
      spa: "", 
  })

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

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("room_no", room.room_no);
      formData.append("room_type", room.room_type);
      formData.append("description", room.description);
      formData.append("max_guest", room.max_guest);
      formData.append("bed", room.bed);
      formData.append("image", room.image);
      formData.append("price", room.price);
      formData.append("room_status", room.room_status);
      formData.append("health_club", room.health_club ? 1 : 0);
      formData.append("swimming_pool", room.swimming_pool ? 1 : 0);
      formData.append("restaurant", room.restaurant ? 1 : 0);
      formData.append("bar", room.bar ? 1 : 0);
      formData.append("spa", room.spa ? 1 : 0);
      
      const response = await axios.post(`http://localhost:3000/room/${room_no}`, formData, { params: {val}});
      console.log('update room :',response)
      alert(response.data.text.msg)
      if (response.data.res === 0) {
          navigate("/rooms" , {state:{ val }})
      } 

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='body-x'>
      <div className='container-list'>
        <h1 className='h1-list'>Create Room</h1>
        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Room Number</label>
          </div>  
          <div className='col-25'>
            <dd>{room.room_no}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Room Type</label>
          </div>  
          <div className='col-30'>
            <select className='input-x' name='room_type' type='text' value={room.room_type} onChange={(e) => setRoom({...room, room_type:e.target.value})}>
              <option>--Select--</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Executive">Executive</option>
              <option value="Honeymoon Suite">Honeymoon Suite</option>
              <option value="Family">Family</option>
            </select>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Description</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='description' type='text' value={room.description} onChange={(e) => setRoom({...room, description:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Max Guest</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='max_guest' type='text' value={room.max_guest} onChange={(e) => setRoom({...room, max_guest:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Bed Type</label>
          </div>  
          <div className='col-30'>
            <select className='input-x' name='bed' type='text' value={room.bed} onChange={(e) => setRoom({...room, bed:e.target.value})}>
              <option>--Select--</option>
              <option value="Twin bed">Twin bed</option>
              <option value="King size bed">King size bed</option>
            </select>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Image Room</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='image' type='file' onChange={(e) => setRoom({...room, image:e.target.files[0]})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Benefits</label>
          </div>  
          <div className='col-30'>
            <div className='row-check'>
                <input className='input-check' name='health_club' type='checkbox' checked={room.health_club} onChange={(e) => setRoom({...room, health_club:e.target.checked})}/>
                <label className='label-check'>Health Club</label>
            </div>
            <div className='row-check'>
                <input className='input-check' name='swimming_pool' type='checkbox' checked={room.swimming_pool} onChange={(e) => setRoom({...room, swimming_pool:e.target.checked})}/>
                <label className='label-check'>Swimming Pool</label>
            </div>
            <div className='row-check'>
                <input className='input-check' name='restaurant' type='checkbox' checked={room.restaurant} onChange={(e) => setRoom({...room, restaurant:e.target.checked})}/>
                <label className='label-check'>Restaurant</label>
            </div>
            <div className='row-check'>
                <input className='input-check' name='bar' type='checkbox' checked={room.bar} onChange={(e) => setRoom({...room, bar:e.target.checked})}/>
                <label className='label-check'>Bar</label>
            </div>
            <div className='row-check'>
                <input className='input-check' name='spa' type='checkbox' checked={room.spa} onChange={(e) => setRoom({...room, spa:e.target.checked})}/>
                <label className='label-check'>Spa</label>
            </div>
            </div>
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Price</label>
          </div>  
          <div className='col-30'>
            <input className='input-x' name='price' type='number' value={room.price} onChange={(e) => setRoom({...room, price:e.target.value})}/>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Room Status</label>
          </div>  
          <div className='col-30'>
            <select className='input-x' name='room_status' value={room.room_status} onChange={(e) => setRoom({...room, room_status:e.target.value})}>
              <option>--Select--</option>
              <option value="Avaliable">Avaliable</option>
              <option value="Check-in">Check-in</option>
            </select>
          </div> 
        </div>

        <br/>
        <div className='aa'>
          <button className='btn-cancle'><Link to='/rooms' state={{ val }} style={{color:'white'}}>Cancle</Link></button>
          <button className='btn-save' onClick={()=>{onSubmit()}}>Save</button>
        </div>

      </div>
    </div>
  )
}

export default EditRoom