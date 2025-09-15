import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const userRole = localStorage.getItem('role'); // 'admin', 'user', 'storeowner'

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">StoreRating</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!userRole && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">SignUp</Link></li>
              </>
            )}
            {userRole === 'user' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/user">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/stores">Stores</Link></li>
              </>
            )}
            {userRole === 'storeowner' && (
              <li className="nav-item"><Link className="nav-link" to="/owner">Dashboard</Link></li>
            )}
            {userRole === 'admin' && (
              <li className="nav-item"><Link className="nav-link" to="/admin">Dashboard</Link></li>
            )}
            {userRole && (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => localStorage.clear()}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
