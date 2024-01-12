import React, { useEffect, useState } from 'react';
import { MdVideoLibrary } from "react-icons/md";
import VideoThumbnail from 'react-video-thumbnail';
import "./style.css"

const VideoCard = ({videoUrl}) => {
 const [thumbnail,setThumbnail] = useState(null);
 useEffect(()=>{
      
 },[]);


  return (
    <div className='video-card'>
       <video src={videoUrl} />
       <MdVideoLibrary/>
    </div>
  )
}

export default VideoCard;