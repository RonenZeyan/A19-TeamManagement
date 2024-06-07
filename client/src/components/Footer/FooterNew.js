
import React from 'react';
import "./FooterNew.css"


/**
 * @component
 * this component used for display the footer 
 * @returns {JSX.Element} - a rendered footer component. 
 */

const Footer = () => {

    return (
            <footer className="footer my-20">
                <div className="footer">
                    <div className="row">
                        <ul>
                            <li><a href="/contactUs">Contact Us</a></li>
                            <li><a href="/AboutUs">About Us</a></li>
                            <li><a href="/FAQs">FAQs</a></li>
                        </ul>
                    </div>
                    <div className="row" style={{paddingLeft: '8%', paddingRight: '8%'}}>
                        <hr />
                        <p style={{paddingTop: '1%'}}> © 2024 TeamPower</p> 
                    </div>
                </div>
            </footer>
    )
}

export default Footer;