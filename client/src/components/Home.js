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
            <img src='../images/reception3.jpg' id='homeBackground' alt="home backgroundwallpaper" />


            <div class='textAndImgContainer'>
                <div class='textZone'>
                    <h5 class='smallTitle'>Tailored to everyone</h5>
                    <hr class="rounded"></hr>
                    <p class='smallText'>Doctor's schedule is a program for offices and large facilities. For <strong>doctors, nurses, midwives, dentists, physiotherapists, psychologists, registrars, managers</strong> and all those involved in health care. You give us inspiration - we implement what you need.</p>
                </div>
                <img src='../images/groupDoctors.jpg' class='smallPictures' />
            </div>
        </body>
    )
}