import { createContext } from "react";
import { useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.component";
export const UserContext = createContext({
currentUser:null,
setCurrentUser:()=>null,
})
export const UserProvider=({children})=>{
const [currentUser, setCurrentUser]=useState(null);
const value={currentUser,setCurrentUser};

useEffect(()=>{
   const unsubscribe= onAuthStateChangedListener((user)=>{
    if(user){
     createUserDocumentFromAuth(user);
    }
    // console.log(user);
    setCurrentUser(user);
   })
   return unsubscribe
},[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}