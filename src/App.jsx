import { Route, Router, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import VideoEditPage from "./Pages/VideoEditPage"
import Videos from "./Pages/Videos"



function App() {

  return (
    <>
      {/* <VideoEditPage/> */}
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route path="/video-edit/:id" element={<VideoEditPage/>}/>
        <Route path="/videos" element ={<Videos/>} />
      </Routes>
     
    </>
  )
}

export default App
