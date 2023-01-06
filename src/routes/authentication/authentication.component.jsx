// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'
import { 
    // auth,
    // signInWithGooglePopup,
    // createUserDocumentFromAuth,
    // signInWithGoogleRedirect
} from "../../utils/firebase/firebase.component"
const Authentication=()=>{
    // useEffect(async()=>{
    //    const response= await getRedirectResult(auth);
    //    console.log(response);
    //    if(response){
    //     const userDocRef = await createUserDocumentFromAuth(response.user);
    //    }
    // },[])

    return(
        <div className="authentication-container">
        <SignInForm/>
        {/* <button type="button" onClick={logGoogleUser}>Sign in with Google Popup</button> */}
        {/* <button type="button" onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        <SignUpForm/>
      </div>
    )
}
export default Authentication