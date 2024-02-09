import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './auth.css'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
                email, password
            })
            setError(false)
            navigate('/login')
        } catch (e) {
            setError(true)
            console.log(e)
        }

    }
    return (
        <div className='auth'>
            <h1>Register</h1>
            {error && <span style={{ color: "red", fontWeight: "600" }}>User Already Exist!</span>}
            <form onSubmit={handleSubmit} >
                <input type='email' placeholder='Email' value={email} onChange={(e) => (setEmail(e.target.value))} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => (setPassword(e.target.value))} />
                <button type='submit' className='button'>SignUp</button>
                <span>Already have an account? <Link to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default SignUp