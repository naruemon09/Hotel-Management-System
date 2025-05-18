import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Sidebar/>
        <main>
          <Outlet/>
        </main>
      </div> 
    </div>
  )
}

export default Layout