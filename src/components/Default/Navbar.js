import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar-default.css';
import logo from '../App/quizpilot log.png'
export default function Navbar() {
  return (
    <nav className="navbar-default">
      <div className="navbar-brand-default">
        <img src={logo} className="navbar-logo-default" />
        <h1 className='appQuiz-text-default' >Quiz</h1> <h1 className='appPilot-text-default'>  Pilot</h1>
      </div>
      <div className="navbar-links-default">
        <NavLink to="/" className="navbar-link-default" activeClassName="navbar-link-default-active">Home</NavLink>
        <NavLink to="features" className="navbar-link-default" activeClassName="navbar-link-default-active">Features</NavLink>
        <NavLink to="pricing" className="navbar-link-default" activeClassName="navbar-link-default-active">Pricing</NavLink>
        <NavLink to="products" className="navbar-link-default" activeClassName="navbar-link-default-active">Products</NavLink>
        <NavLink to="login" className="navbar-link-default" activeClassName="navbar-link-default-active">Sign In</NavLink>
      </div>
    </nav>
  );
}