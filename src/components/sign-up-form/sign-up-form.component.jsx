import { useState} from "react"
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-up-form.styles.scss'
// import { UserContext } from "../../contexts/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.component";
const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm =()=>{
    // state update of default form field 
    const [formFields, setFormFields]=useState(defaultFormFields);
    // passing defaultFormFields Object to formFields
    const{  displayName, email, password, confirmPassword}=formFields;
    // console.log(formFields);

    // const {setCurrentUser}=useContext(UserContext)



    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }

    const handlerSubmit= async(event)=>{
        event.preventDefault();

      if(password !== confirmPassword)  {
        alert('password do not match');
        return;
      }

      try{
        const {user}= await createAuthUserWithEmailAndPassword(email, password);
      

        await createUserDocumentFromAuth(user,{displayName});
        resetFormFields();
        // setCurrentUser(user);
      }catch(error){
        if(error.code === 'auth/email-already-in-use'){
            alert('cannot create email already in use')
        }
        console.log(error);

      }

    }

    // handlerChange target individual input by name and its value 
    const handlerChange=(event)=>{
        const {name,value}=event.target;
        // update state of formFields by using handlerChange event fuction using name and its value 
        setFormFields({...formFields,[name]:value});

    };
    return(
        <div className="sign-up-container">
        <h2>Don't have an account?</h2>
            <span>sign up with your email and password</span>
            <form onSubmit={handlerSubmit}>
    
            <FormInput label="Display name" type='text' required onChange={handlerChange} name='displayName'value={displayName}/>

          
            <FormInput label="Email" type='email' required onChange={handlerChange} name='email' value={email}/>

           
            <FormInput label="Password" type='password' required onChange={handlerChange} name='password' value={password}/>

          
            <FormInput label="Confirm Password" type='password' required onChange={handlerChange} name='confirmPassword' value={confirmPassword}/>

            <Button type="submit">sign up</Button>
            </form>
        </div>
    )
}
export default SignUpForm