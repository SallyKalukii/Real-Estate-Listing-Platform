import {React} from 'react';


function GoogleLoginButton(){
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    }

    return(
        <button onClick = {handleGoogleLogin} style = {{backgroundColor: 'rgb(7, 78, 165)', color: 'white'}}> Sign in with Google  </button>
    );
}

export default GoogleLoginButton;