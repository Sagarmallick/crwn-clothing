import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
// import { UserContext } from "../../contexts/user.context";
import "./sign-in-form.styles.jsx";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.component";

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // state update of default form field
  const [formFields, setFormFields] = useState(defaultFormFields);
  // passing defaultFormFields Object to formFields
  const { email, password } = formFields;
  // console.log(formFields);

  // const {setCurrentUser}=useContext(UserContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
     await signInWithGooglePopup();
    // console.log('user',user);
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user);

      resetFormFields();
    } catch (error) {
        switch (error.code){
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                    default:
                        console.log(error);
        }
    }
  };

  // handlerChange target individual input by name and its value
  const handlerChange = (event) => {
    const { name, value } = event.target;
    // update state of formFields by using handlerChange event fuction using name and its value
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>sign in with your email and password</span>
      <form onSubmit={handlerSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handlerChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handlerChange}
          name="password"
          value={password}
        />

        <ButtonsContainer>
          <Button type="submit">sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
