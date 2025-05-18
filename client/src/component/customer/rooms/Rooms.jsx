import React, { useEffect, useState } from 'react'
import './Rooms.css'
import { useLocation } from 'react-router-dom';
import ChooseRoom from '../chooseRoom/ChooseRoom';
import Payment from '../payment/Payment';
import Confirmation from '../confirmation/Confirmation';
import Summary from '../summary/Summary';
import axios from 'axios';

const Rooms = () => {

    const location = useLocation();
    const val = location.state.val;
    const user = location.state.user;
    console.log('room : ',user)

    const steps = [
      { index: 1 , name: 'Choose a room'},
      { index: 2 , name: 'Payment'},
      { index: 3 , name: 'Confirmation'}
    ];   

    const [date, setDate] = useState({ 
      checkIn_date: "", 
      checkOut_date: "" 
    });

    const [rooms , setRooms] = useState([])

    const [selectedRooms, setSelectedRooms] = useState([]);

    const [currentStep, setCurrentStep] = useState(0);

    const night = (new Date(date.checkOut_date) - new Date(date.checkIn_date)) / (1000 * 60 * 60 * 24) || ''
    console.log(night)
    const totalPrice = (selectedRooms.reduce((sum, r) => sum + Number(r.price), 0))*night
    
    const [payment , setPayment] = useState({
      card_no: "",
      name: "",
      mm_yy: "",
      cvv: ""
    })

    const [bankNo , setBankNo] = useState([])

    useEffect(() => {
      const getBankNo = async () => {
          try {
              const response = await axios.get('http://localhost:3000/payment', { params: {val} })
              if (response.data.res === 0) {
                  console.log("get Bank :", response);
                  setBankNo(response.data.payment);
              }
            } catch (error) {
              alert("Failed to get bank")
            }
        }
        getBankNo()
      }, []
    );

    const [bookingID , setBookingID] = useState({})
    console.log(bookingID)

    const onSubmit = async () => {
      try {
        const arg = {
          checkIn_date: date.checkIn_date,
          checkOut_date: date.checkOut_date,
          total_room: selectedRooms.length,
          total_price: totalPrice,
          id_card: user.id_card,
          room_no: selectedRooms.map(room => room.room_no),
          payment 
        };
        console.log('arg',arg)
        
        if (bankNo[0].bank_cardNo === payment.card_no) {
          const response = await axios.post('http://localhost:3000/booking', arg , { params: {val} })
          console.log(response)
          setBookingID(response.data.book.booking.booking_id)
          if (response.data.res === 0) {
            nextStep()
          }
        } else {
          alert('Bank card no. not found')
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    const nextStep = () => setCurrentStep((prev) => prev + 1)
    const backStep = () => setCurrentStep((prev) => prev - 1)
    
  return (
    <div className='body-c'>
      <div className='row'>
        <div className='col-100'> 

          <div className='container-l'>
            <div className="stepper-wrapper">
            {steps.map((step, index) => (
              <div key={index} className={index <= currentStep ? "stepper-item completed" : "stepper-item active"}>
                <div className="step-counter">{index + 1}</div>
                <div className="step-name">{step.name}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
          
          <div className='row'>
            <div className='col-70'>
              {currentStep === 0 && <ChooseRoom  
                date={date}
                setDate={setDate}
                selectedRooms={selectedRooms}
                setSelectedRooms={setSelectedRooms} 
                rooms={rooms}
                setRooms={setRooms}
              />}

              {currentStep === 1 && <Payment 
                payment={payment}
                setPayment={setPayment}
              />}

            </div>
            <div className='col-30-'>
              {currentStep === 0 && <Summary  
                date={date}
                selectedRooms={selectedRooms}
                setSelectedRooms={setSelectedRooms}
                night={night}
                totalPrice={totalPrice}
                currentStep={currentStep}
                rooms={rooms}
                setRooms={setRooms}
              />}

              {currentStep === 1 && <Summary 
                date={date}
                selectedRooms={selectedRooms}
                setSelectedRooms={setSelectedRooms}
                night={night}
                totalPrice={totalPrice}
                currentStep={currentStep}
                rooms={rooms}
                setRooms={setRooms}
              />}
              {currentStep === 1 && <button type='button' onClick={onSubmit}>CONTINUE</button>}
              {currentStep === 1 && <button style={{marginTop:'10px'}} onClick={backStep}>BACK</button>}
              {currentStep === 0 && <button type='button' onClick={nextStep}>CONTINUE</button>}
            </div>
          </div>

            {currentStep === 2 && <Confirmation 
              bookingID={bookingID}
            />}
    
        
      
    </div>
  )
}

export default Rooms