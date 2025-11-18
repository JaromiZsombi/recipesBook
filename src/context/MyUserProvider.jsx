import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebaseApp'
import { disableNetwork } from 'firebase/firestore'
import { useNavigate } from 'react-router'

export const MyUserContext = createContext() //tartály az adatoknak
export const MyUserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe() //leiratkozunk a ki-, bejelentkezés figyeléséről
    }, [])

    const signUpUser = async (email, password, displayName) => {
        console.log(email, password, displayName)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, { displayName })
            await sendEmailVerification(auth.currentUser)

            console.log("Aktiválja az e-mail címét!")
            console.log("Sikeres regisztráció!")
            setMsg(prev => ({ ...prev }, { signUp: "Kattints az email címedre küldött aktiváló linkre!", info: "Kattints az email címedre küldött aktiváló linkre!" }))

            logoutUser()
        } catch (error) {
            console.log(error)
            setMsg({ err: error.message })
        }
    }

    const logoutUser = async () => {
        await signOut(auth)
    }

    const signInUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Sikeres bejelentkezés!")
            const currentUser = auth.currentUser
            if (!currentUser.emailVerified) {
                setMsg({ err: "Kérlek kattints az aktiváló linkre" })

                logoutUser()
                return
            }
            setMsg({ signIn: true })
        } catch (error) {
            console.log(error)
            setMsg({ err: error.message })
        }
    }
    const resetPassword = async (email) => {
        let success = false
        try {
            await sendPasswordResetEmail(auth, email)
            setMsg({ resetPw: "A jelszó visszaállítási email elküldve!" })
            success = true
        } catch (error) {
            setMsg({ err: error })
        } finally {
            if (success) navigate("/signin")
        }
    }

    return (
        <div>
            <MyUserContext.Provider value={{ user, signUpUser, logoutUser, signInUser, msg, setMsg, resetPassword }}>
                {children}
            </MyUserContext.Provider>
        </div>
    )
}