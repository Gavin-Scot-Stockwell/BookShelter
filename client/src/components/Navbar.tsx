import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(auth.loggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  const handleProtectedNavigation = (path: string) => {
    if (!auth.loggedIn()) {
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <div className="nav display-flex justify-space-between align-center py-2 px-5">
      <div className="nav-title">
        <Link to="/">
          <h2>Book Shelter</h2>
        </Link>

        {!loginCheck ? (
          <button className="btn" type="button">
            <Link to="/login">Login</Link>
          </button>
        ) : (
          <button
            className="btn"
            type="button"
            onClick={() => {
              auth.logout();
              setLoginCheck(false);
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}

        <button className="btn" type="button" onClick={() => handleProtectedNavigation("/show-volunteers")}>
          Saved Books
        </button>

        <button className="btn" type="button" onClick={() => handleProtectedNavigation("/")}>
          Main
        </button>
      </div>
    </div>
  );
};

export default Navbar;
