import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('accessToken', response.data.accessToken);
            navigate('/transactions');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="bank-logo-background"></div>
            
            <div className="login-card">
                <div className="bank-logo">
                    <h1>SecureBank</h1>
                </div>
                
                <h2 className="login-title">Login to Your Account</h2>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="input-group">
                    <label htmlFor="email">Customer ID/Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email"
                    />
                </div>
                
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                    />
                </div>
                
                <button className="login-button" onClick={handleLogin}>
                    Sign In
                </button>
                
                <div className="help-links">
                    <a href="#forgot">Forgot Password?</a>
                    <a href="#register">New User? Register Here</a>
                </div>
                
                <div className="security-notice">
                    <span>🔒</span>
                    <span>Your security is our priority</span>
                </div>
            </div>
        </div>
    );
};



export default Login;