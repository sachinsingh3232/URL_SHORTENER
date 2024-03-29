import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './auth.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`,
                {
                    email, password
                },
                { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", }, withCredentials: true }
            )
            setError(false)
            localStorage.setItem("userInfo", JSON.stringify(resp?.data?.other?._doc?._id));
            navigate('/')
        } catch (e) {
            setError(true)
            console.log(e)
        }

    }
    return (
        <div className='auth'>
            <h1>Login</h1>
            {error && <span style={{ color: "red", fontWeight: "600" }}>Wrong Credentials !</span>}
            <form onSubmit={handleSubmit} >
                <input type='email' placeholder='Email' value={email} onChange={(e) => (setEmail(e.target.value))} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => (setPassword(e.target.value))} />
                <button type='submit' className='button'>Login</button>
                <span>Don't have account? <Link to='/signUp'>SignUp</Link></span>
            </form>
        </div>
    )
}

export default Login
