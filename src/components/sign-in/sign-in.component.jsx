import React, {useState} from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import {signInWithGoogle, auth} from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

const SignIn = () =>{
    const [userCredentials, setCredentials] = useState({email: '', password: ''});   
    

    const handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = userCredentials;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            setCredentials({email:'', password: ''});
        }catch(error){
            console.log(error);
        }

        setCredentials({email: '', password: ''});
    }

    const handleChange = event => {
        const {value, name} = event.target;

        setCredentials({[name]: value});
    }

    const {email, password} = userCredentials;
        return(
            <div className = "sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
            
                <form onSubmit = {handleSubmit}>
                    <FormInput 
                        name = "email" 
                        value = {email} 
                        required
                        handleChange={handleChange}
                        type = "email"
                        label = "Email"
                    />
                    <FormInput 
                        name = "password" 
                        type = "password"  
                        value = {password} 
                        required 
                        handleChange={handleChange}   
                        label = "Password" 
                    />

                    <div className = "buttons">
                        <CustomButton type = "submit" >Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>

            </div>

        )

}

export default SignIn;