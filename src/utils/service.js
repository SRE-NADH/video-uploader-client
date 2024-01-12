export const baseUrl = "https://video-uploader-server.vercel.app";

export const postRequest = async(url,body,type)=>{
    const response = await fetch(url,{
        method:type,
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(body)
    })
    const data = await response.json();
   
    if(!response.ok){
        let message;
        if(data?.message){
            message = data.message;
        }
        else{
            message=data;
        }
        return {error:true,message}
    }

  return data;
}

export const getRequest = async(url)=>{
    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok){
        let message="an error occured";
        if(data?.message){
            message = data.message;
        }
       
        return {error:true,message}
    }
    return data;
}
