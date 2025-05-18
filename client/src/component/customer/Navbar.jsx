import React from 'react'
import './Navbar.css'
import { useLocation , Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const val = location.state?.val;
  const user = location.state.user;
  console.log('Navbar : ',user)

  if (location.pathname === "/") return null;

  const onSubmit = async () => {
    try {
      const response = await axios.get('http://localhost:3000/signOut', {params: {val}})
      console.log('logout : ',response)
      if (response.data.res === 0) {
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='nav-body'>
      <nav className="navbar" tabIndex="0">
        <div className="navbar-left">
        <Link to={"/bookroom"} state={{ val:val , user:user }}><span>Libra Hotel</span></Link>
          
        </div>
        
        <div className="navbar-right">
          <div className="dropdown">
            <a className="dropbtn"><FaUserCircle size={30}/></a>
            <div className="dropdown-content">
              <Link to={"/profile"} state={{ val }}><FaUserEdit size={21}/> Your Profile</Link>
              <Link to={"/allBooking"} state={{ val }}><TbBrandBooking size={21}/> History Booking</Link>
              <a className='btn-l' onClick={()=>{onSubmit()}}><MdLogout size={21}/>Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar