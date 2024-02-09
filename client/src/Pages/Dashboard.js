import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import './dashboard.css'
import Navbar from '../components/Navbar'
import axios from 'axios'

const Dashboard = () => {
    const [links, setLinks] = useState([]);
    // useEffect(() => {
    //     const fun = async () => {
    //         try {
    //             const resp = await axios.get(`${process.env.REACT_APP_API_URL}/url/getAllUserURL`,
    //                 { headers: { "Content-Type": "application/json" }, withCredentials: true }
    //             )
    //             // console.log(resp.data.data);
    //             setLinks(resp?.data?.data);
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     fun();
    // }, [])

    return (
        <div className='Dashboard'>
            <Navbar />
            <div className='cardContainer'>
                {links.length > 0 && links.map((link, i) => (
                    <Card key={i} link={link} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard
