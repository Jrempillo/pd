import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { isLogin, hasErrorUser, loginUser, setErrorLogin } from '../../../reduxModules/user';
import RouterUrls from '../../../constants/routeUrls';
import app, { auth } from '../../../utils/firebase';

import './login.scss';
import logo from '../../../assets/logo.png'; 
import isEmpty from '../../../utils/isEmpty';

const Login = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isLogin);
  const hasErrorInLogin = useSelector(hasErrorUser);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RouterUrls?.dashboard);
    }
  }, [isAuthenticated]);

  const submitLogin = (e) => {

    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;

    if (!isEmpty(email) && !isEmpty(password)){
      signInWithEmailAndPassword(auth, email, password).then((response) => {
        dispatch(loginUser(response));
      }).catch((e) => {
        dispatch(setErrorLogin());
        console.error(e.message);
      });
    } else {
      dispatch(setErrorLogin());
    }
    
    e.preventDefault();
  };

  
  return (
    
    
    <div className='login_form'>
      <img src={logo} className="logo"/>

      <form onSubmit={submitLogin}>
        
        {hasErrorInLogin && <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Oops!</h4>
          <p> Something is wrong.</p>
          <hr></hr>
            <p class="mb-0">Check your Email or Password.</p>
        </div>}
        <div>
          <input name='email' type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" />
        </div>

        
        <div>
          <input name='password' type="password" className="form-control" placeholder="Password" aria-label="PasswordPassword" aria-describedby="addon-wrapping"/>
        </div>

      
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Log In</button>
        </div>

        
     
      </form>
      <footer className="login_footer">
        <p>&copy; {new Date().getFullYear()} Technological Institute of the Philippines. All rights reserved.</p>
      </footer>  
    </div>

    
  );
  
};

export default Login;
