import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Level = () => {

    const [level , setLevel] = useState("")

    const [user , setUser] = useState([])

    useEffect(() => {
        const getLevel = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/level`, { params: {level} })
                if (response.data.res === 0) {
                    console.log("get Level :", response);
                    setUser(response.data.level);
                }
            } catch (error) {
                alert("Failed to get level")
            }
        }
        getLevel()
        }, [level]
    );

  return (
    <div className='container-l' style={{marginTop:'1rem'}}>
        <select className='input-x' name='level' value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">--Select--</option>
            <option value="Normal">Normal</option>
            <option value="Gold">Gold</option>
            <option value="Premium">Premium</option>
        </select>

        <table>
        <thead>
          <tr>
            <th>ID Card</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Level</th>
            <th>Amount</th>
          </tr>
        </thead>

          <tbody>
            {user.map((users) => (
              <tr key={users.id_card}>
                <td>{users.id_card}</td>
                <td>{users.firstname} {user.lastname}</td>
                <td>{users.phone}</td>
                <td>{users.email}</td>
                <td>{users.address}</td>
                <td>{users.level}</td>
                <td>{users.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
        
    </div>
  )
}

export default Level