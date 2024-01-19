
import React, { useState } from 'react';
import '../Pages/Login.css';
import { Link,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscoProgressBar from '../components/DiscoProgressBar';
import Wheelspinner from '../components/Wheelspinner';
import ClipLoader from 'react-spinners/ClipLoader';


function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    if (email === '') {
      toast.error('Fill the input field');
    } else if (!email.includes('@')) {
      toast.error('Enter a valid email');
    } else {
      try {
        const isEmailExist = await checkIfEmailExists(email);
        setLoading(true);
        if (isEmailExist) {
          const generatedOtp = await generateOtp();
          await sendOtpToEmail(email, generatedOtp); // Simulate sending OTP to email
          toast.success('OTP was sent Successfully');
          setShowOtpInput(true);
          setGeneratedOtp(generatedOtp);
        } else {
          toast.error('Email is invalid');

        } setLoading(false);
      } catch (error) {
        console.error('Error sending OTP:', error);
        toast.error('Error sending OTP');
        setLoading(false);
      }
    }
  };

  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      const isOtpValid = await verifyOtp(otp, generatedOtp);

      if (isOtpValid) {
        // Perform login logic here
        toast.success('Login Successful');
        //Navigate to you page 
        Navigate('./Blog')
      } else {
        toast.error('Invalid OTP');
      } setLoading(false);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Error verifying OTP');
      setLoading(false);
    }
  };
  const checkIfEmailExists = async (email) => {
    // Replace this with your server logic to check if the email exists
    // For now, always return true to simulate email existence
    return true;
  };

  // ...


  const serverUrl = 'http://localhost:5600';

  const generateOtp = async () => {
    try {
      const response = await fetch(`${serverUrl}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', response);
        throw new Error(data.error || 'Error sending OTP');
      }

      if (!data.generatedOtp) {
        console.error('No OTP generated in response:', data);
        throw new Error('No OTP generated');
      }

      return data.generatedOtp;
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      throw new Error('Error sending OTP');
    }
  };




  const verifyOtp = async (userEnteredOtp, generatedOtp) => {
    try {
      const response = await fetch(`${serverUrl}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ generatedOtp, userEnteredOtp }),
      });
  
      if (response.ok) {
        const result = await response.json();
        return result.success; // Assuming the server sends a JSON with a 'success' property
      } else {
        const errorResponse = await response.json();
        console.error('Error verifying OTP:', errorResponse.error);
        throw new Error('Error verifying OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      throw new Error('Error verifying OTP');
    }
  };
  

  // Simulate sending OTP to email (replace this with your actual logic)
  const sendOtpToEmail = async (email, generatedOtp) => {
    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, generatedOtp }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', response);
        throw new Error(data.error || 'Error sending OTP');
      }

      console.log('OTP sent successfully:', data);
      setLoading(false);
    } catch (error) {
      console.error('Error sending OTP to email:', error.message);
      throw new Error('Error sending OTP to email');
    }
  };

  // ...









  return (
    <>
      <DiscoProgressBar />
      <div className='form-container'>
        <div className="login-Form">
          <div className='Headings'>
            <h1>Welcome Back, Log IN </h1>
            <p>Hi, Login with your Account</p>
          </div>
          <div className='input-fields'>
            <label htmlFor="email"> Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your email address' />
          </div>
          {showOtpInput ? (
            <div className='input-fields'>
              <label htmlFor="otp"> OTP:</label>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter OTP' />
            </div>
          ) : null}
          <div className='submit-btn'>
            {showOtpInput ? (
              <>
                <button type='submit' onClick={handleOtpVerification}>
                  {loading ? (
                    <>
                      <ClipLoader size={20} color="#fff" />
                      &nbsp; Loading...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>
                <button type='button' onClick={() => setShowOtpInput(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button type='submit' onClick={sendOtp}>
                {loading ? (
                  <>
                    <ClipLoader size={20} color="#fff" />
                    &nbsp; Loading...
                  </>
                ) : (
                  'Log IN'
                )}
              </button>
            )}
          </div>

          <div className='footer-para'>
            <p>Don't have an Account
              <Link to="/Register">Register</Link>
            </p>
          </div>
        </div>
        <Wheelspinner />
      </div>
    </>
  );
}

export default Login;
