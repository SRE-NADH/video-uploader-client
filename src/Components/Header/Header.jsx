import React from 'react';
import "./style.css"
import { Link } from 'react-router-dom';
import { IoVideocamSharp } from "react-icons/io5";
import { MdOutlineVideoLibrary } from "react-icons/md";

const Header = () => {
  return (
    <div className='header'>
    <div className='logo'><MdOutlineVideoLibrary/></div>
    <div className='header-right'>
      <Link to={"/"} >Home</Link>
      <Link to={'/videos'}>Videos</Link>
    </div>
   </div>
  )
}

export default Header