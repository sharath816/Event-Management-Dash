import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const FIXED_EMAIL = 'user@example.com';
    const FIXED_PASSWORD = 'password123';

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
            login();
            navigate('/events'); 
        } else {
            alert('Invalid email or password'); 
        }
    };

    return (
        <div className="containere">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label"></label>
                    <input 
                        type="email" 
                        placeholder="Email"
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"></label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn ">Login</button>
            </form>
        </div>
    );
};

export default Login;
