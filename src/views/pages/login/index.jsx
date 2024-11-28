import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { isLogin, loginUser } from '../../../reduxModules/user';
import RouterUrls from '../../../constants/routeUrls';

import './login.scss';
import logo from '../../../assets/logo.png'; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isLogin);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RouterUrls?.dashboard);
    }
  }, [isAuthenticated]);

  const submitLogin = (e) => {
    dispatch(loginUser());
    e.preventDefault();
  };
  return (
    <div className='login_form'>
      <img src={logo} className="logo"/>

      <form onSubmit={submitLogin}>
        
        <div>
          <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping"/>
        </div>

        
        <div>
          <input type="password" className="form-control" placeholder="Password" aria-label="PasswordPassword" aria-describedby="addon-wrapping" />
        </div>

      
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Log In</button>
        </div>

        
     
      </form>
    </div>
  );
};

export default Login;
