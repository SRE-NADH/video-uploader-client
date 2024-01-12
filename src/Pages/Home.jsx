import React, { useRef, useState } from 'react'
import Header from '../Components/Header/Header';
import { HiArrowDown } from "react-icons/hi2";
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { postRequest,baseUrl } from '../utils/service';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  
   const [loading,setLoading] = useState(false); 

   const navigate = useNavigate();

  const inputRef = useRef();
 
   function triggerInput(){
     inputRef.current.click();
   } 

   async function handleFile(e){
    const file = e.target.files[0];
    setLoading(true);
    const videoRef = ref(storage, `videos/${Date.now()}`);
    await uploadBytes(videoRef,file);
    const videoUrl = await getDownloadURL(videoRef);
   console.log(videoUrl);
   //post data
   let data = await postRequest(`${baseUrl}/video/`,{
    videoUrl:videoUrl,
    subtitle:[]
   },'post');
   localStorage.setItem('videoId',JSON.stringify(data._id));
   localStorage.setItem('videoUrl',JSON.stringify(videoUrl))
   navigate(`/video-edit/${data._id}`);
   setLoading(false);
   }

  return (
    <div>
        <Header/>
        <div className='container' >
        <div className='input-file' >
         <p>Add your Files </p> 
         <input ref={inputRef} type='file' accept='video/*' onChange={handleFile} style={{display:"none"}} />
         <div onClick={triggerInput} ><HiArrowDown/> <p>{loading?"loading.....":"add your video file"}</p></div>
         </div>
        </div>
    </div>
  )
}

export default Home