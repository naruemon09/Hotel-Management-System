import React, { useEffect, useState } from 'react'
import './ListRoom.css'
import { useLocation, useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const ListRoom = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const val = location.state.val;
    const [rooms, setRooms] = useState([]);
    console.log(val)

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/rooms', {params: {val}})
                console.log(response)
                if (response.data.res === 0) {
                    console.log("Rooms data:", response);
                    setRooms(response.data.room);
                }
              } catch (error) {
                alert("Failed to get rooms")
              }
        }
        getRooms()}, []
    );

    const onSubmitDelete = async (room) => {
      try {
        const response = await axios.delete(`http://localhost:3000/room/${room}`, { params: {val}})
        console.log(response)
        if (response.data.res === 0) {
          swal({
            title: "Delete!",
            text: `Delete Employee : ${room} suceess`,
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='body-x'>
    <div className='container-list'>
      <div className='header-list'>
        <h1 className='h1-list'>Rooms</h1>
        {val.position == 'Manager' ? 
          <Link to='/addRoom' state={{ val }} className='btn'>Add Room +</Link> : ''
        }
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Image</th>
            <th>Room Type</th>
            <th>Bed</th>
            <th>Price</th>
            <th>Room Status</th>
            <th>Action</th>
          </tr>
        </thead>

          <tbody>
            {rooms.map((room) => (
                <tr key={room.room_no}>
                <td>{room.room_no}</td>
                <td><img src={`http://localhost:3000/uploads/${room.image}`} style={{width:'80px' , height:'60px'}}/></td>
                <td>{room.room_type}</td>
                <td>{room.bed}</td>
                <td>{room.price}</td>
                <td>{room.room_status}</td>
                <td>
                  <Link to={"/rooms/"+room.room_no} state={{val}} className='btn-icon-view' style={{ marginRight: '5px' }}><FaRegEye size={20}/></Link>
                  {val.position == 'Manager' ?
                    <Link to={"/editRoom/"+room.room_no} state={{val}} className='btn-icon-edit' style={{ marginRight: '5px' }}><CiEdit size={20}/></Link> : ''
                  }
                  <button className='btn-icon-del' onClick={() => onSubmitDelete(room.room_no)}><i><MdDeleteOutline size={20}/></i></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ListRoom