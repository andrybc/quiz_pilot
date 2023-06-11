import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserNavbar.css';
import logo from '../App/quizpilot log.png'
export default function UserNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} className="navbar-logo" />
        <h1 className='appQuiz-text' >Quiz</h1> <h1 className='appPilot-text'>  Pilot</h1>
      </div>
      <div className="navbar-links">
        <NavLink to="users" className="navbar-link" activeClassName="navbar-link-active">Dashboard</NavLink>
        <NavLink to="features" className="navbar-link" activeClassName="navbar-link-active">My Features</NavLink>
        <NavLink to="pricing" className="navbar-link" activeClassName="navbar-link-active">Memberships</NavLink>
        <NavLink to="products" className="navbar-link" activeClassName="navbar-link-active">My Products</NavLink>
        
      </div>
    </nav>
  );
}