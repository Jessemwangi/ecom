import React from 'react';
import './Contact.scss'


const Contact = () => {
    return (
        <div className='contact'>
            <div className="wrapper">
                <span>Be in touch</span>
                <div className="mail">
                    <input type="email"  placeholder='enter email'/>
                    <button className='send'>Join us</button>
                </div>
            </div>
            
        </div>
    );
};

export default Contact;