import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { useState } from 'react'

export const UserProfile = () => {
    const { user, avatarUpdate } = useContext(MyUserContext)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        setFile(selected)
        if (selected) {
            setPreview(URL.createObjectURL(selected))
        }
    }

    const handleSubmit=async(event)=>{
        event.preventDefault()
        console.log("Loading igaz jasuasuoidasoudauoi")
        setLoading(true)
        if(!file) return
        try {
            await avatarUpdate(file)
        } catch (error) {
            console.log(error);
            
        } finally{
            console.log("False a loading ahahahahahahaha")
            setLoading(false)
        }
    }
    return (
        <div>
            <h2>Profil módosítása</h2>

            <div>
                <h4>Felhasználónév:{user?.displayName}</h4>
                <p>Email cím:{user?.email}</p>
                {user?.photoUrl && (
                    <img style={{width:"50px", height:"50px", borderRadius:"50%", objectFit:"cover"}} src={user?.photoURL} alt="profilkép" />
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className='custom-file-upload'>Új profilkép:</label>
                <input id="file-upload" type="file" accept='image/*' onChange={handleFileChange} />
                <p></p>
                <label>Oldal frissítése:</label>
                <button type='submit' disabled={loading}>{loading? "...Mentés":"Profil frissítése"}</button>
            </form>
                {preview && <img src={preview} alt='előnézet' style={{width:"50px", height:"50px", borderRadius:"50%", objectFit:"cover"}} />}
            

        </div>
    )
}