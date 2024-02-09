import React from 'react'
import './navbar.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`,{},
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
      )
      navigate('/login')
    } catch (e) {
      alert("Please Login!")
      navigate('/login')
      console.log(e)
    }

  }
  return (
    <div className='navbar'>
      <span className='span' onClick={()=>navigate("/shorturl")}>ShortURL</span>
      <span className='span' onClick={handleLogout}>Logout</span>
    </div>
  )
}

export default Navbar