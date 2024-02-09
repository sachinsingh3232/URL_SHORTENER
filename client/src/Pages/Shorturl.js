import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './auth.css'

const Shorturl = () => {
    const [url, setUrl] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) navigate('/login');
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_API_URL}/url/`, {
                url
            }, { headers: { "Content-Type": "application/json" }, withCredentials: true })
            navigate('/')
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className='auth url'>
            <h1>ShortURL</h1>
            <form onSubmit={handleSubmit}>
                <input required type='text' placeholder='URL' value={url} onChange={(e) => { setUrl(e.target.value) }} />
                <button type='submit' className='button'>Submit</button>
            </form>
        </div>
    )
}

export default Shorturl
