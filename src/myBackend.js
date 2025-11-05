import axios from "axios";
import {db} from "./firebaseApp"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import imageCompression from "browser-image-compression";

const apiKey= import.meta.env.VITE_IMGBB_API_KEY
const imgbburl = "https://api.imgbb.com/1/upload?key="+apiKey

const uploadToIMGBB = async(file)=>{
    const myFormData = new FormData()
    myFormData.append("image", file)
    try {
        const response= await axios.post(imgbburl, myFormData)
        const {url, delete_url} = response.data.data

        return{url, delete_url}
    } catch (error) {
        console.log("Képfeltöltési hiba: "+ error);
        
    }
}

export const addRecipe = async(recipe, file)=>{
    try {
        let imgUrl = ""
        let deleteUrl = ""
        //kicsinyítés
        const compressed=await imageCompression(file, {maxWidthOrHeight:800,useWebWorker:true})
        const result = await uploadToIMGBB(compressed)
        if(result){
            imgUrl = result.url
            deleteUrl= result.delete_url
            console.log(result)
        const collectionref = collection(db, "recipes")
        await addDoc(collectionref, {...recipe, imgUrl:imgUrl, deleteUrl:deleteUrl, timestamp:serverTimestamp()})
        }
    } catch (error) {
        console.log("Nem sikerült hozzáadni!" + error)
    }
}