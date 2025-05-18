import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useLocation , Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {

  const location = useLocation();
  const val = location.state.val;

  const id_card = val.id_card.split('').reverse().join('');

  const [customer , setCustomer] = useState([])

  useEffect(() => {
    const getCustomer = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/customer/${id_card}`, { params: {val} })
            if (response.data.res === 0) {
                console.log("get Customer :", response);
                setCustomer(response.data.user);
            }
          } catch (error) {
            alert("Failed to get customer")
          }
      }
      getCustomer()
    }, []
  );

  return (
    <div className='body-c'>
        <div className='container-l'>
        <h1 className='h1-list'>Profile</h1>
        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>ID Card</label>
          </div>  
          <div className='col-25'>
            <dd>{customer.id_card}</dd>
          </div> 
        </div>

        <div className='row'>
          <div className='col-25'>
            <label className='label-x'>Name</label>
          </div>  
          <div className='col-25'>
            <dd>{customer.firstname} {customer.lastname}</dd> 
          </div> 
        </div>

        <div className='row'>
            <div className='col-25'>
            <label className='label-x'>Phone</label>
            </div>  
            <div className='col-25'>
            <dd>{customer.phone}</dd>
            </div> 
        </div>

        <div className='row'>
            <div className='col-25'>
            <label className='label-x'>Email</label>
            </div>  
            <div className='col-25'>
            <dd>{customer.email}</dd>
            </div> 
        </div>

        <div className='row'>
            <div className='col-25'>
            <label className='label-x'>Password</label>
            </div>  
            <div className='col-25'>
            <dd>{customer.password}</dd>
            </div> 
        </div>

        <div className='row'>
            <div className='col-25'>
            <label className='label-x'>Address</label>
            </div>  
            <div className='col-25'>
            <dd>{customer.address}</dd>
            </div> 
        </div>

        <br/>
        <div className='aa'>
            <button className='btn-cancle'><Link to='/bookroom' state={{ val }} style={{color:'white'}}>Back</Link></button>
        </div>
        </div>
    </div>
  )
}

export default Profile