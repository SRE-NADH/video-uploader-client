import React, { useContext } from 'react';
import { useState,useRef,useEffect } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/service';
import { useNavigate, useParams } from 'react-router-dom';


const VideoEditPage = () => {

  const [video,setVideo] = useState(null);
  const [cues,setCues] = useState([]);
  const [text,setText] = useState('');

  let trackRef = useRef();
  const videoRef = useRef();
  const {id} = useParams();
  
  const navigate = useNavigate();
  
 // get video data in initial rendering
  useEffect(()=>{
    if(!id) return;
     getData();
  },[id])

  // get video from server
  async function getData(){
    let response = await getRequest(`${baseUrl}/video/get/${id}`)
    setVideo(response);
    // console.log(response);
    let subtitle = response.subtitle;
    setCues(subtitle);
  
    // if video already have subtitle then render again
    // make it run only one time when refreshing
    if(subtitle.length>0 && trackRef.current.track.cues.length==0){
       subtitle.forEach((item)=>{
        
        const cue = new VTTCue(item.Time, item.Time+1, item.text);
        trackRef.current.track.addCue(cue);
       })
    }
  }


 // handle text for track
 function handleTrackText(e){
   setText(e.target.value);
 }

 // create new cue and add text
 function saveToTrack(){ 
  if(text.length==0) return ;
  let currentTime = videoRef.current.currentTime;
  const cue = new VTTCue(currentTime, currentTime+1, text);

  // check if there is any  subtitle in the same time span
  const tmp = cues.find((item)=>{
     return Math.trunc(item.Time)<=Math.trunc(currentTime) && Math.trunc(item.Time+1)>=Math.trunc(currentTime)
   });

   if(tmp){
    let trackCues = trackRef.current.track.cues;
    for(let i=0;i<trackCues.length;i++){
      let item = trackCues[i];
      if(Math.trunc(item.startTime)===Math.trunc(tmp.Time)){
        trackRef.current.track.removeCue(item);
        trackRef.current.track.addCue(cue);
      }
    }
    tmp.text =text;
   }
   else{
    trackRef.current.track.addCue(cue);
    let obj ={
      Time:currentTime,
      text:text
  }
  // save all the cueus
  setCues([...cues,obj]);
   }

  setText("")
 }

 // update video data
 async function updateVideoData(){
  let data = await postRequest(`${baseUrl}/video/update`,{
    _id:video._id,
    subtitle:cues
  },'put');
  navigate('/videos');
 }

  return (
    <div className='video-edit'>
       <h1>Edit subtitle</h1>
         <video ref={videoRef}  controls >
           {video && <source src={video.videoUrl} />} 
             <track  ref={trackRef} 
              label="English"
              kind="subtitles"
              srcLang="en"
              default />
          </video> 
          <div className='subtitle-edit'>
             <textarea placeholder='text' value={text} onChange={handleTrackText} />
             <button onClick={saveToTrack} >save</button>
          </div>
          <div onClick={updateVideoData} className='submit'>save your video</div>
    </div>
  )
}

export default VideoEditPage;