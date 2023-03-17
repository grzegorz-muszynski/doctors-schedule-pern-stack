import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export function NavBar (props) {
    // The variable for hiding and showing navbar on narrower screens 
    const [menuBtnClicked, setMenuBtnClicked] = useState(false);

    function hideShowNavbar() {
        setMenuBtnClicked(!menuBtnClicked);
    }

    function notFinished () {
        alert(`That feature isn't completed yet. In the meantime, you can check three pages which are already available - the page with a table (the hyperlink in "Check schedule" button), the 'Home' page and the page with list of patients via 'See list of visits' button.`);
    }

    return (
        <>
            <div className={menuBtnClicked ? 'menuBtn menuBtnClicked' : 'menuBtn'} onClick={hideShowNavbar}>Menu</div>

            <div id='allNavHome'>
                <ul id={menuBtnClicked ? 'navHomeUnwrapped' : 'navHome'}>
                    <li><Link className='linksHome' to={props.btn1link}>{props.btn1desc}</Link></li>
                    <li><Link className='linksHome' to={props.btn2link}>{props.btn2desc}</Link></li>
                </ul>
                <ul className={menuBtnClicked ? 'signInUp signInUpunWrapped' : 'signInUp'}>
                    <li onClick={notFinished}>Sign in</li>
                    <li onClick={notFinished}>Sign up</li>
                </ul>
            </div>
        </>
    )
}