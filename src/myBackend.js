import axios from "axios";
import { db } from "./firebaseApp"
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import imageCompression from "browser-image-compression";

const apiKey = import.meta.env.VITE_IMGBB_API_KEY
const imgbburl = "https://api.imgbb.com/1/upload?key=" + apiKey

const uploadToIMGBB = async (file) => {
    const myFormData = new FormData()
    myFormData.append("image", file)
    try {
        const response = await axios.post(imgbburl, myFormData)
        const { url, delete_url } = response.data.data

        return { url, delete_url }
    } catch (error) {
        console.log("Képfeltöltési hiba: " + error);

    }
}
//új recept feltöltése: addDoc()
export const addRecipe = async (recipe, file) => {
    try {
        let imgUrl = ""
        let deleteUrl = ""
        //kicsinyítés
        const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })
        const result = await uploadToIMGBB(compressed)
        if (result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
            console.log(result)
            const collectionref = collection(db, "recipes")
            await addDoc(collectionref, { ...recipe, imgUrl: imgUrl, deleteUrl: deleteUrl, timestamp: serverTimestamp() })
        }
    } catch (error) {
        console.log("Nem sikerült hozzáadni!" + error)
    }
}

//receptek realtime olvasása: onSnapshot()
export const readRecipes = async (setRecipes, setLoading) => {
    const collectionref = collection(db, "recipes")
    const q = query(collectionref, orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
        setRecipes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        setLoading(false)
    })
    return unsubscribe
}

//recept törlése id alapján:
export const deleteRecipe = async (id, deleteUrl) => {
    //await axios.get(deleteUrl)
    const docRef = doc(db, "recipes", id)
    await deleteDoc(docRef)
}

//egyetlen recept olvasása:
export const readRecipe = async (id, setRecipe) => {
    const docRef = doc(db, "recipes", id)
    const docData = await getDoc(docRef)
    setRecipe(docData.data())
}

//update
export const updateRecipe = async (id, updatedData, file) => {
    let imgUrl = updatedData.imgUrl || ''
    let deleteUrl = updatedData.deleteUrl || ''

    try {
        if (file) {
            const compressed = await imageCompression(file, { maxWidthOrHeight: 800, useWebWorker: true })
            const result = await uploadToIMGBB(compressed)
            if (result) {
                imgUrl = result.url
                deleteUrl = result.delete_url
            }

        }
        const docRef = doc(db, 'recipes', id)
        await updateDoc(docRef, { ...updatedData, imgUrl, deleteUrl, updateAt: serverTimestamp()})

    } catch (error) {
        console.log("nem sikerült a módosítás: " + error)
    }
}