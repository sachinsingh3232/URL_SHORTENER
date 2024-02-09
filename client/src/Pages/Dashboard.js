import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Card from '../components/Card'
import './dashboard.css'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Dashboard = () => {
    const [links, setLinks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) navigate('/login');
    }, [navigate])
    useEffect(() => {
        const fun = async () => {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_API_URL}/url/getAllUserURL`,
                    { headers: { "Content-Type": "application/json" }, withCredentials: true }
                )
                // console.log(resp.data.data);
                setLinks(resp?.data?.data);
            } catch (err) {
                console.log(err)
            }
        }
        fun();
    }, [])

    return (
        <div className='Dashboard'>
            <Navbar />
            <div className='cardContainer'>
                {links?.length > 0 && links.map((link) => (
                    <Card key={link.shortId} link={link} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard
