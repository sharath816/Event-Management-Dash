// src/components/Footer.js
import React from 'react';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer>
            <div className="bottom-footer">
                <div className="top-header">
                    <h5>Contact Me</h5>
                    <h2 className="title">Sharath M Talawar</h2>
                </div>
                <div className="social-icons">        
                    <a href="https://www.linkedin.com/in/sharath-m-talawar/" target="_blank" rel="noopener noreferrer" className="icon">
                        <i className="uil uil-linkedin-alt"></i>
                    </a>
                    <a href="mailto:sharathmtalawar@gmail.com" target="_blank" rel="noopener noreferrer" className="icon">
                        <i className="fas fa-envelope"></i>
                    </a>  
                    <a href="https://github.com/sharath816" target="_blank" rel="noopener noreferrer" className="icon">
                        <i className="uil uil-github-alt"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
