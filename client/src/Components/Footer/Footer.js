import React from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

const Footer = () => {
    return (
        <footer className="section">
            <div className="level">
                <div className="level-item">
                    <GoMarkGithub 
                        size={30} 
                        style={{
                            color: "#eee"
                        }}    
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;