import React from 'react'
import { FaPersonSwimming } from "react-icons/fa6"
import { IoRestaurant } from "react-icons/io5"
import { FaDumbbell , FaSpa } from "react-icons/fa";
import { MdLocalBar } from "react-icons/md";

const DetailRoom = ({room}) => {

  return (
    
    <div className='container-c'>
        <div className='row'>
            <div className='col-50'>
                <img src={`http://localhost:3000/uploads/${room.image}`} />
            </div>
            <div className='col-50'>
                <h3 className=''>{room.room_type}</h3>
                <dd>Max Sleeps : {room.max_guest} |  {room.bed}</dd>
                <dt>{room.description}</dt>
                <br/>
                <div className='row'>
                    <div className='col-50'>
                        {room.health_club ? <dt><FaDumbbell /> Health Club</dt> : ''}
                        {room.swimming_pool ? <dt><FaPersonSwimming /> Swimming Pool</dt> : ''}
                        {room.restaurant ? <dt><IoRestaurant /> Restaurant</dt> : ''}
                        {room.bar ? <dt><MdLocalBar /> Bar</dt> : ''}
                        {room.spa ? <dt><FaSpa /> Spa</dt> : ''}
                    </div>
                    <div className='col-50' style={{margin:"0"}}>
                        <div className=''>
                            <h3>THB {room.price}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default DetailRoom