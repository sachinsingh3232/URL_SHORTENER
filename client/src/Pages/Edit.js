import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import './auth.css'

const Edit = () => {
    const state = useLocation().state;
    const [url, setUrl] = useState(state?.redirectURL || "")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.put(`${process.env.REACT_APP_API_URL}/url/handleEdit/${state.shortId}`, {
                url
            }, { headers: { "Content-Type": "application/json" }, withCredentials: true })
            navigate('/')
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className='auth url'>
            <h1>EditURL</h1>
            <form onSubmit={handleSubmit}>
                <input required type='text' placeholder='URL' value={url} onChange={(e) => { setUrl(e.target.value) }} />
                <button type='submit' className='button'>Update</button>
            </form>
        </div>
    )
}

export default Edit