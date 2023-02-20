import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// export function Home () {
//     return <h3>There is nothing, yet 😌 This page was created in purpose of practising React Router. Please, be patient - I am gonna put here more features in coming days 😀</h3>;
// }

export function Home () {
    return (
        <body>
            <ul id='navHome' >
                <li><Link class='linksHome' to='/'>Check Schedule</Link></li>
                <li><Link class='linksHome'>See list of doctors</Link></li>
            </ul>
            <ul id='signInUp' >
                {/* <li><div class='signInUpBtn'>Sign in</div></li>
                <li><div class='signInUpBtn'>Sign up</div></li> */}
                <li>Sign in</li>
                <li>Sign up</li>
            </ul>
            <div id='greeting'><h2>The program for a clinic</h2>Welcome to Doctor's schedule - your handy tool for managing doctor's calendar. Log patients visits, custom your own list of doctors and watch how easier your clinic can be run.</div>
            <img src='../images/reception4.jpg' id='homeBackground' alt="home backgroundwallpaper" />

            <div class='textAndImgContainer'>
                <div class='textZone textZoneFirst'>
                    <h5 class='smallTitle'>Tailored to everyone</h5>
                    <hr class="rounded" id="separatorFirst"></hr>
                    <p class='smallText'>Doctor's schedule is a program for offices and large facilities. For and all those involved in health care like:
                    <strong>
                        <br/>-doctors
                        <br/>-nurses
                        <br/>-midwives
                        <br/>-dentists
                        <br/>-physiotherapists
                        <br/>-psychologists
                        <br/>-registrars
                        <br/>-managers
                    </strong> 
                    <br/>You give us inspiration - we implement what you need.</p>
                </div>
                <img src='../images/groupDoctors.jpg' class='pictureFirst' />
            </div>

            <div class='ImgAndTextContainer'>
                <img src='../images/workSave.jpg' class='pictureSecond' />
                <div class='textZone textZoneSecond'>
                    <h5 class='smallTitle'>Work safely</h5>
                    <hr class="rounded"></hr>
                    <p class='smallText '>We encrypt and protect patient data thanks to monitored, protected 24/7 server rooms. Backups are created in real time and stored in a replacement server room.</p>
                </div>
            </div>

            <div class='textAndImgContainer'>
                <div class='textZone textZoneThird'>
                    <h5 class='smallTitle'>24/7 support</h5>
                    <hr class="rounded" id='separatorThird'></hr>
                    <p class='smallText'>Our Support Team is available <strong>7 days a week</strong> around the clock. We value personal, open contact. We are always available.
                    <br/>&emsp;Need help getting started? Do you want to <strong>train a new employee?</strong> Contact us whenever you need it.
                    <br/>&emsp;If you prefer to meet in person, we will <strong>visit you on site.</strong></p>
                </div>
                <img src='../images/support.jpg' class='pictureThird' />
            </div>
        </body>
    )
}