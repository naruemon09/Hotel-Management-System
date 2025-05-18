import React from 'react'
import './Navbar.css'
import { useLocation , Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const val = location.state.val;
  console.log('Navbar : ',val)

  if (location.pathname === "/") return null;

  const onSubmit = async () => {
    try {
      const response = await axios.get('http://localhost:3000/signOutAdmin', {params: {val}})
      console.log('logout : ',response)
      if (response.data.res === 0) {
        navigate("/admin")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='nav-body'>
      <nav className="navbar" tabIndex="0">
        <div className="navbar-left">
          <span>Libra Hotel</span>
        </div>
        
        <div className="navbar-right">
          <div className="dropdown">
            <a className="dropbtn"><FaUserCircle size={30}/></a>
            <div className="dropdown-content">

            <Link to={"/editEmployee" } state={{val}}><FaUserEdit size={21}/> Your Profile</Link>
              
              <a className='btn-l' onClick={()=>{onSubmit()}}><MdLogout size={21}/> Logout</a>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar


{/* 
การส่งข้อมูลจากเส้นทางหนึ่งไปยังอีกเส้นทางหนึ่ง ในการทําเช่นนี้ด้วย React Router 
เราสามารถส่งข้อมูลจากคอมโพเนนต์ผ่านไปยังคอมโพเนนต์ใหม่ที่กําลังแสดงผล LinkRoute 

<Link to="/onboarding/profile" state={{ from: "occupation" }}>
  Next Step
</Link>

ในการทําเช่นนี้ (และส่งต่อข้อมูลอื่น ๆ ด้วย) สิ่งที่คุณต้องทําคือรวม state prop 
กับข้อมูลที่คุณต้องการส่งต่อ – ในกรณีของเรา ผู้ใช้จะมาที่ไหน from.

เราจะเข้าถึงข้อมูลได้อย่างไรเพื่อให้เราสามารถอัปเดต UI ตามข้อมูลนั้นได้ 
เราจําเป็นต้องดูที่ส่วนประกอบที่กําลังแสดงผลที่เส้นทาง 
สําหรับตัวอย่างของเราขอเรียกมันว่า .state/onboarding/profileProfile

import { useLocation } from 'react-router-dom'

function Profile () {
  const location = useLocation()
  const { from } = location.state

  return (
    ...
  )
}

เมื่อใดก็ตามที่คุณส่งข้อมูลผ่านที่พัก ข้อมูลนั้นจะปรากฏใน statelocation ของ state 
ซึ่งคุณสามารถเข้าถึงได้โดยใช้ Custom useLocation Hook ที่มาพร้อมกับ React Router
*/}