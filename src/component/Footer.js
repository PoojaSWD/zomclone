import React from 'react';
import './footer.css';

const Footer = () =>{
    
    return(
        <React.Fragment>
            <br/>
            <hr/>
            <center>
                <h3>&copy; PSDeveloper</h3>
                <div className="icons">
                <a href="www.facebook.com/">
                        <img src="https://i.ibb.co/wyH9JxS/facebook.png" alt="facebook" className="socialicon"/>
                    </a>
                    <a href="www.instagram.com/">
                        <img src="https://i.ibb.co/w0kZ5Hf/insta.png" alt="instagram" className="socialicon"/>
                    </a>
                </div>

                
            </center>
        </React.Fragment>
    )
}

export default Footer;