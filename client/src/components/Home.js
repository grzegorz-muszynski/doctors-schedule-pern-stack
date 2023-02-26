import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './Home.css';
import { TestimonialSlider } from './TestimonialSlider';

export function Home () {
    // Variables initialized for manipulating responsive navbar on narrower screens 
    const [menuBtnClicked, setMenuBtnClicked] = useState(false);
    // Variables for manipulating the 'greeting' element
    const [showGreeting, setShowGreeting] = useState(true);
    const controlGreeting = () => {
        if (window.scrollY > 100) {
            setShowGreeting(false);
        } else {
            setShowGreeting(true);
        }
    }
    // Variables for manipulating two text and image containers
    const triggeringOnce = {
        'threshold': 0,
        'triggerOnce': true
    }
    const { ref: ref2, inView: isElementVisible2 } = useInView(triggeringOnce);
    const { ref: ref3, inView: isElementVisible3} = useInView(triggeringOnce);

    // Mounting the event listener
    useEffect(() => {
        window.addEventListener('scroll', controlGreeting);
        return () => {
            window.removeEventListener('scroll', controlGreeting);
        }
    }, []);

    function hideShowNavbar() {
        setMenuBtnClicked(!menuBtnClicked);
    }

    function notFinished () {
        alert(`That feature isn't completed yet. In the meantime, you can check two pages which are already available - the current one and the page with a table (the hyperlink in "Check Schedule" button).`);
    }

    return (
        <>
            <div class={menuBtnClicked ? 'menuBtn menuBtnClicked' : 'menuBtn'} onClick={hideShowNavbar}>Menu</div>

            <div id='allNavHome'>
                <ul id={menuBtnClicked ? 'navHomeUnwrapped' : 'navHome'}>
                    <li><Link className='linksHome' to='/'>Check Schedule</Link></li>
                    <li onClick={notFinished}><Link className='linksHome'>See list of doctors</Link></li>
                </ul>
                <ul className={menuBtnClicked ? 'signInUp signInUpunWrapped' : 'signInUp'}>
                    <li onClick={notFinished}>Sign in</li>
                    <li onClick={notFinished}>Sign up</li>
                </ul>
            </div>

            <div className={showGreeting ?  'greeting' : 'greeting hiddenGreeting'}>
                <h2>The program for a clinic</h2>
                <hr id='separatorMain'></hr>
                Welcome to Doctor's schedule - your handy tool for managing doctor's calendar. Log patients visits, custom your own list of doctors and watch how easier your clinic can be run.
            </div>
            <img src='../images/reception4.jpg' id='homeBackground' alt="home backgroundwallpaper" />

            <div className='textAndImgContainer'>
                <div className='textZone textZoneFirst'>
                    <h5 className='smallTitle'>Tailored to everyone</h5>
                    <hr className="rounded" id="separatorFirst"></hr>
                    <p className='smallText'>Doctor's schedule is a program for offices and large facilities. For and all those involved in health care like:
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
                <img src='../images/groupDoctors.jpg' className='pictureFirst' />
            </div>

            <div className={isElementVisible2 ? 'ImgAndTextContainer show' : 'ImgAndTextContainer hiddenOnRight'}>
                <img src='../images/workSave.jpg' className={'pictureSecond'} ref={ref2} />
                <div className='textZone textZoneSecond'>
                    <h5 className='smallTitle'>Work safely</h5>
                    <hr className="rounded" id='separatorSecond'></hr>
                    <p className='smallText '>We encrypt and protect patient data thanks to monitored, protected 24/7 server rooms. Backups are created in real time and stored in a replacement server room.</p>
                </div>
            </div>

            <div className={isElementVisible3 ? 'textAndImgContainer show' : 'textAndImgContainer hiddenOnLeft'}  ref={ref3}>
                <div className='textZone textZoneThird'>
                    <h5 className='smallTitle'>24/7 support</h5>
                    <hr className="rounded" id='separatorThird'></hr>
                    <p className='smallText'>Our Support Team is available <strong>7 days a week</strong> around the clock. We value personal, open contact. We are always available.
                    <br/>&emsp;Need help getting started? Do you want to <strong>train a new employee?</strong> Contact us whenever you need it.
                    <br/>&emsp;If you prefer to meet in person, we will <strong>visit you on site.</strong></p>
                </div>
                <img src='../images/support.jpg' className='pictureThird' />
            </div>

            <TestimonialSlider/>
        </>
    )
}