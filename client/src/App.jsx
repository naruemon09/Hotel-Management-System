import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './component/customer/signIn/SignIn'
import SignUp from './component/customer/signUp/signUp'
import Rooms from './component/customer/rooms/Rooms'
import Layout from './component/employee/Layout'
import SignUpAdmin from './component/employee/signUp/SignUpAdmin'
import SignInAdmin from './component/employee/signIn/SignInAdmin'
import ListBooking from './component/employee/booking/listBooking/ListBooking'
import ListEmployee from './component/employee/userEmployee/listEmployee/ListEmployee'
import ListCustomer from './component/employee/userCustomer/listCustomer/ListCustomer'
import EditEmployee from './component/employee/userEmployee/editEmployee/EditEmployee'
import LayoutUser from './component/customer/Layout'
import ListRoom from './component/employee/room/listRoom/ListRoom'
import AddRoom from './component/employee/room/addRoom/AddRoom'
import EditRoom from './component/employee/room/editRoom/EditRoom'
import DetailRoom from './component/employee/room/detailRoom/DetailRoom'
import DetailEmployee from './component/employee/userEmployee/detailEmployee/DetailEmployee'
import DetailCustomer from './component/employee/userCustomer/detailCustomer/DetailCustomer'
import ListCheckOut from './component/employee/checkOut/listCheckOut/ListCheckOut'
import Profile from './component/customer/profile/Profile'
import AllBooking from './component/customer/allBooking/AllBooking'
import DetailBooking from './component/employee/booking/detailBooking/DetailBooking'
import DetailCheckOut from './component/employee/checkOut/detailCheckOut/DetailCheckOut'
import WalkIn from './component/employee/checkIn/walkIn/WalkIn'
import DetailWalkIn from './component/employee/checkIn/detailWalkIn/DetailWalkIn'
import DetailBookings from './component/customer/detailBooking/DetailBookings'
import CancelBooking from './component/customer/cancelBooking/CancelBooking'
import Level from './component/customer/level/level'

function App() {

  return (
    <>
      <Router>
        <Routes>

          {/* Employee */}
          <Route path="/admin" element={<SignInAdmin/>} />
          <Route element={<Layout/>}>
            <Route path="/signUpAdmin" element={<SignUpAdmin/>} />
            <Route path="/employees" element={<ListEmployee/>} />
            <Route path="/employees/:id_card" element={<DetailEmployee/>} />
            <Route path="/editEmployee" element={<EditEmployee/>} />
            <Route path="/customers" element={<ListCustomer/>} />
            <Route path="/customers/:id_card" element={<DetailCustomer/>} />
            <Route path="/bookings" element={<ListBooking/>} />
            <Route path="/bookings/:booking_id" element={<DetailBooking/>} />
            <Route path="/walkIn" element={<WalkIn/>} />
            <Route path="/detailWalkIn/:checkIn_id" element={<DetailWalkIn/>} />
            <Route path="/checkOut" element={<ListCheckOut/>} />
            <Route path="/checkOut/:checkIn_id" element={<DetailCheckOut/>} />
            <Route path="/rooms" element={<ListRoom/>} />
            <Route path="/addRoom" element={<AddRoom/>} />
            <Route path="/rooms/:room_no" element={<DetailRoom/>} />
            <Route path="/editRoom/:room_no" element={<EditRoom/>} />
          </Route>
       

          {/* Customer */}
          <Route path="/" element={<SignIn/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/level" element={<Level/>} />
          <Route element={<LayoutUser/>}>
            <Route path="/bookroom" element={<Rooms/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/allBooking" element={<AllBooking/>} />
            <Route path="/detail/:booking_id" element={<DetailBookings/>} />
            <Route path="/cancel/:booking_id" element={<CancelBooking/>} />
          </Route>
          
        
        </Routes>
      </Router>
    </>
  )
}

export default App 
