//  import React, { useState } from 'react';
//  import '../Pages/Register.css';
//  import { Link } from 'react-router-dom';
//  import { toast } from 'react-toastify';
//  import 'react-toastify/dist/ReactToastify.css';
//  import { useNavigate } from 'react-router-dom';

//  function Register() {
//    const [email, setEmail] = useState('');
//    const [name, setName] = useState('');
//    const [password, setPassword] = useState('')
//    const [pass, setPass] = useState(false);
//    const Navigate = useNavigate();

//    const sendOtp = async (e) => {
//        e.preventDefault()
//        if (email === "") {
//            toast.error('Fill the input field')
//        }else if (!email.includes('@') ){
//            toast.error('Enter valid email')
//        }else{
//            toast.success('OTP was sent Successfully')
//            const response = await fetch('http:localhost:5600/user',{
//              method : "POST",
//              headers:{
//                  "Content-Type" : "application/json"
//              },
//              body : JSON.stringify({name,email,password})
//            })
//            const result = await response.json(response);
//            console.log(result);
//            Navigate('/Login')
//        }
//        setName('')
//        setEmail('')
//        setPassword('')
//    }



//    return (
//     <>
//                 <div className='Red-form-con'>
//                  <div className="Register-Form">
//                      <div className='reg-headigns'>
//                          <h1>Sign Up</h1>
//                          <p>Hi, welcome to our web page create a new account to use our services.</p>
//                      </div>
//                      <div className='input-fields'>
//                      <label htmlFor="name"> Name:</label>
//                          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your Name' />
//                          <label htmlFor="email"> Email:</label>
//                          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email address' />
//                          <label htmlFor="password"> Password:</label>
//                          <div className='show-hide-pass'>
//                          <input className='password-input' value={password} onChange={(e) => setPassword(e.target.value)} type={!pass ? "password" : "text"} placeholder='Set your Password' />
//                          <div className='show-pass' onClick={()=>setPass(!pass)}>
//                          {!pass ? "Show" : "Hide"}                          </div>
//                          </div>

//                      </div>
//                      <div className='submit-btn'>
//                          <button type='submit' onClick={sendOtp}>SignUp</button>
//                      </div>
//                      <div className='footer-para'>
//                          <p>already have an Account
//                              <Link to="/">Login</Link>
//                          </p>
//                      </div>
//                  </div>
//              </div>
//     </>
//    )
//  }

//  export default Register




import React, { useState } from 'react';
import '../Pages/Register.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';



function Register() {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pass, setPass] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const sendOtp = async (e) => {
    e.preventDefault();
  
    if (email === '' || name === '' || password === '') {
      toast.error('Fill all the input fields');
      return;
    } else if (!email.includes('@')) {
      toast.error('Enter a valid email');
      return;
    }
  
    // Start the loader
    setLoading(true);
  
    // Function to validate email format
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    try {
      // Check if the email has a valid format
      if (!isValidEmail(email)) {
        setLoading(false); // Stop the loader
        toast.error('Enter a valid email address.');
        return;
      }
  
      // Continue with the rest of the code for local and global checks
      // Check if the email already exists in the local database
      const checkResponse = await fetch(`http://localhost:5600/user/check-email/${email}`);
      const checkResult = await checkResponse.json();
  
      // Introduce a short delay before stopping the loader, regardless of the email's existence
      setTimeout(() => {
        setLoading(false);
      }, 1000);
  
      if (checkResult.exists) {
        // Show error toast for existing email
        toast.error('Email already registered. Please use a different email.');
      } else {
        // If email doesn't exist in the local database, proceed to global email check
        const globalEmailCheckResponse = await fetch(`https://open.kickbox.com/v1/disposable/${email}`);
        const globalEmailCheckResult = await globalEmailCheckResponse.json();
  
        console.log('Global Email Check Result:', globalEmailCheckResult);
  
        if (globalEmailCheckResult.disposable === false) {
          // If the email is not disposable (valid), proceed with registration
          const registrationResponse = await fetch('http://localhost:5600/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
  
          const registrationResult = await registrationResponse.json();
          console.log(registrationResult);
          console.log('User: ', `Name:${name}, Email:${email}, Password:${password}`);
  
          // Show success toast after a brief delay to allow loader to run
          setTimeout(() => {
            toast.success(
              <div className="register-success-toast">
                User (<span id="register">{name}</span>) registered Successfully
              </div>
            );
          }, 500);
  
          // Navigate to the desired page after successful registration
          // Navigate('/');
        } else {
          // If the email is disposable, show error toast
          toast.error('Email ID is invalid. Please use a valid email.');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setLoading(false); // Stop the loader on error
      toast.error('Error during registration. Please try again.');
    }
  
    // Clear form fields after registration attempt
    setName('');
    setEmail('');
    setPassword('');
  };
  

  return (
    <>
      <div className='Red-form-con'>
        <div className="Register-Form">
          <div className='reg-headings'>
            <h1>Sign Up</h1>
            <p>Hi, welcome to our web page create a new account to use our services.</p>
          </div>
          <div className='input-fields'>
            <label htmlFor="name"> Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your Name' />
            <label htmlFor="email"> Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email address' />
            <label htmlFor="password"> Password:</label>
            <div className='show-hide-pass'>
              <input className='password-input' value={password} onChange={(e) => setPassword(e.target.value)} type={!pass ? "password" : "text"} placeholder='Set your Password' />
              <div className='show-pass' onClick={() => setPass(!pass)}>
                {!pass ? "Show" : "Hide"}
              </div>
            </div>
          </div>
          <div className='submit-btn'>
            <button type="submit" onClick={sendOtp} disabled={loading}>
              {loading ? (
                <>
                  <ClipLoader color="#ffffff" loading size={20} />
                  &nbsp; Loading...
                </>
              ) : (
                'SignUp'
              )}
            </button>
          </div>
          <div className='footer-para'>
            <p>already have an Account
              <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;