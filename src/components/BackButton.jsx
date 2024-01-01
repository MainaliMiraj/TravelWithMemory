
import {  useNavigate } from 'react-router-dom'


function BackButton() {
    const navigate=useNavigate();
  return (
   <button type='back' onClick={(e)=>{
    e.preventDefault();
    navigate(-1)
   }} style={{padding:'10px', background:'darkgray', color:'white', borderRadius:'10%', cursor:'pointer'}}>
    &larr; Back

   </button>
  )
}

export default BackButton

