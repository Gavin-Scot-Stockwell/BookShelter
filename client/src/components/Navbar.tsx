import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div className="bg-white
    ">
      <div className="nav-title">
        <Link to='/'>
          <h2>Adopt a new book today!</h2>
        </Link>
{!loginCheck ? (
          <button className='btn' type='button'>
            <Link to='/login'>Login</Link>
          </button>
        ) : (
          <button
            className='btn'
            type='button'
            onClick={() => {
              auth.logout();
            }}
          >
            Logout
          </button>
        )}

        <button className='btn' type='button'>
          <Link to='/show-volunteers'>Saved Books</Link>
        </button>

        <button className='btn' type='button'>
          <Link to=''>Main</Link>
        </button>
        
      </div>
    </div>
  );
};

export default Navbar;
