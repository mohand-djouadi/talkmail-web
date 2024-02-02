import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import main from '../assets/ab.png';
import Logo from '../assets/Dark.png';
import '../styles/signin.css';
import ForgotPassword from '../components/forgotPassword';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import FormOTP from '../components/FormOTP';

function Signin({ handleLogin }) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [currentOtp, setCurrentOtp] = useState(0);
  const [openReset, setOpenReset] = useState(false);

  const handleOpenReset = () => {
    setOpenReset(true);
  };

  const handleCloseReset = () => {
    setOpenReset(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenOtp = () => {
    setOpenOtp(true);
  };

  const handleCloseOtp = () => {
    setOpenOtp(false);
  };

  const profilePictureUrl =
    localStorage.getItem('profilePicture') || 'default-url';

  const Notify = (message, callback) => {
    toast.success(message, {
      onClose: callback,
    });
  };

  async function LoadUser() {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await axios.post(
        'https://talkmail-server.onrender.com/api/user/signin',
        {
          email,
          password,
        },
        config,
      );
      return response.data;
    } catch (e) {
      // console.log(e);
      setError(true);
      setemail('');
      setpassword('');
      throw e; // Re-throw the error for the calling function (submit) to catch
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError(false);

    try {
      const userData = await LoadUser();

      if (!userData.twoFA) {
        sessionStorage.setItem('user', JSON.stringify(userData));

        setIsSubmitted(true);
        Notify('Connexion réussie !', () => {
          handleLogin();
          navigate('/mails/inbox');
        });
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));

        setIsSubmitted(true);
        setCurrentOtp(userData.generatedOTP);
        handleOpenOtp();
      }
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error('Adresse ou Mot de passe incorrect.');
    }
  }

  useEffect(() => {
    if (isSubmitted) {
      setemail('');
      setpassword('');
    }
  }, [isSubmitted]);

  return (
    <div className="signin-container">
      <div className="left-section-signin">
        <div className="logo-signup">
          <Link to="/index.html">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="img-signin">
          <img src={main} alt="signin-img"></img>
        </div>
      </div>
      <div className="right-section-signin">
        <h1 className="sign-title-signin"> Connexion</h1>
        <br></br>
        <p className="sign-description-signin"> Bienvenue à TalkMail !</p>
        <form onSubmit={(e) => submit(e)}>
          <div className="auth-form-signin">
            <br></br>
            <input
              className="input-style"
              type="text"
              placeholder="Saisissez votre adresse TalkMail"
              onChange={(e) => setemail(e.target.value)}
              required
            ></input>
            <br></br>
            <br></br>
            <div className="password-input-container">
              <div
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="eye-icon-inner"
                />
              </div>
              <input
                className="input-style"
                type={showPassword ? 'text' : 'password'}
                placeholder="Saisissez votre mot de passe"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password-link">
              <span
                className="forgot-password"
                style={{
                  color: 'spacegrey',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
                onClick={handleClickOpen}
              >
                Forgot Password?
              </span>
            </div>
            <br></br>
            <br></br>
            <Button
              btnText="Se connecter"
              onClick={submit}
              CustomClass="signin-btn"
            />
          </div>
        </form>
        <ToastContainer />
      </div>

      {openOtp && (
        <div>
          <FormOTP
            handleCloseOtp={handleCloseOtp}
            currentOtp={currentOtp}
            handleLogin={handleLogin}
            Notify={Notify}
          />
        </div>
      )}

      {open && (
        <div>
          <ForgotPassword
            handleClose={handleClose}
            handleOpenReset={handleOpenReset}
            Notify={Notify}
          />
        </div>
      )}
    </div>
  );
}

export default Signin;
