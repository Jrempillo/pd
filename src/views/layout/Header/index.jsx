import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLogin, currentUser, logoutUser } from '../../../reduxModules/user';

import isEmpty from '../../../utils/isEmpty';
import logo from '../../../assets/logo.png';
import './Header.scss';

const Header = () => {
  const isAuthenticated = useSelector(isLogin);
  const userInformation = useSelector(currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Assuming logout action clears user data in Redux
    dispatch(logoutUser());
  };
  
  return (
    <nav className="header navbar navbar-expand bg-primary">
      <div className="container-fluid">
        <img src={logo} className="logo" />
        {
          isAuthenticated && !isEmpty(userInformation) && (
            <>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-0 d-flex">
                <li className="nav-item">
                    <a className="home-text nav-link active fw-bolder" aria-current="page" >Home</a>
                </li>
              </ul>
              <div className="btn-group">
                <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userInformation?.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                </ul>
              </div>
              
            
            </div>
            
            </>
          )
        }
        
      </div>
    </nav>
  );
};

export default Header;
