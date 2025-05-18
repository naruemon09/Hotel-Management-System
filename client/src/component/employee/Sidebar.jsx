import React from 'react'
import './Sidebar.css'
import { useLocation , Link } from 'react-router-dom';

const Sidebar = () => {

  const location = useLocation();
  const val = location.state?.val;
  console.log('Sidebar : ',val)

  return (
    <div className='body-x'>
      <nav className="menu" tabIndex="0">
        <header className="section">
          <h2>Authentication</h2>
        </header>
        <ul>
          <li><Link to="/employees" state={{ val }}>Employee</Link></li>
          <li><Link to="/customers" state={{ val }}>Customers</Link></li>
        </ul>
        <header className="section">
          <h2>Manage Room</h2>
        </header>
        <ul>
          <li><Link to="/bookings" state={{ val }}>Check-in (Booking)</Link></li>
          <li><Link to="/walkIn" state={{ val }}>Check-in (Walk-in)</Link></li>
          <li><Link to="/checkOut" state={{ val }}>Check-out</Link></li>
          <li><Link to="/rooms" state={{ val }}>Room</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar