import imageCompression from "browser-image-compression";

import axios from "axios";

const API_URL="https://recipesbackend67.vercel.app/api/"

const convertToBase64=(file)=>{
    return new Promise((resolve, reject)=>{
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=()=>resolve(reader.result)
        reader.onerror=(error)=>reject(error);//ha sérült a file
    })
}

//feltöltés:
export const uploadImage=async (file)=>{
    try {
        const compressed = await imageCompression(file, {maxSizeMB:1, maxWidthOrHeight: 800, useWebWorker: true })
        const base64=await convertToBase64(compressed)
        console.log(API_URL+"uploadImage");
        const resp=await axios.post(API_URL+"uploadImage", {image:base64})
        return resp.data

    } catch (error) {
        console.log("Upload failed:", error);
        return null;
    }
}
