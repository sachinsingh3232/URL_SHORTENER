import './card.css'
import { InfoIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { Link } from "react-router-dom";
function Card({ link }) {
  const l = `${process.env.REACT_APP_API_URL}/url/go/${link.shortId}`;
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.delete(`${process.env.REACT_APP_API_URL}/url/deleteURL/${link.shortId}`, { headers: { "Content-Type": "application/json" }, withCredentials: true })
      // navigate('/')
      window.location.reload();
    } catch (e) {
      console.log(e)
    }

  }
  return (
    <div className="Card">
      <a className="link" href={l} target="_blank" onClick={() => window.location.reload()}>
        {l.length > 35
          ? l.substring(0, 35) + "..."
          : l}
      </a>
      <hr style={{ color: "gray", width: "100%" }} />
      <div className="actions">
        <span className='info'>
          <InfoIcon w={30} h={30} cursor={'pointer'} className='icon' />
          <span className='visit'>{link.visitHistory.length}</span>
        </span>
        <button style={{ backgroundColor: "blue" }}><Link style={{
          textDecoration: "none", color: "white"
        }} to="/edit" state={link}>Edit</Link></button>
        <button style={{ backgroundColor: "red" }
        } onClick={handleDelete}>Delete</button>
      </div>
    </div >
  );
}

export default Card;