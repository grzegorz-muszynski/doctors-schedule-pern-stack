import React, { useEffect, useState } from 'react';
import Testimonial from './Testimonial';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import userPic from '../images/haroldUser.jpg';
import './Testimonial.css'

export const TestimonialSlider = () => {
  
    const testimonials = [
        {
            name: 'Gregory House',
            description: "It's a brilliant, very intuitive, effective tool and big improvement for my hospital.",
            address: 'USA',
            img: '../images/drHouse.jpg'
        },
        {
            name: 'Dr. Dre',
            description: "Actually, I ain't medicine doctor but my homies working in hospitals claim this app is kinda cool stuff.",
            address: 'USA',
            img: '../images/drDre.jpg'
        },
        {
            name: 'Dr. Harold',
            description: "It's the best program for clinics. Please, trust me.",
            address: 'Hungary',
            img: './images/harold.jpg'
        },        
        {
            name: 'Dr. John Dolittle',
            description: "No matter you manage big hospital, physiotherapy center or veterinary clinic - it's the app for you.",
            address: 'UK',
            img: '../images/drDolittle.jpg'
        }
    ]

    // Owl carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 4,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };

    return (
        <section id="testimonial" className="testimonials pt-70 pb-70">
            <div className="container mt-5">
                <h4 className="miniTitle text-center">TESTIMONIALS</h4>
                <div className="text-center ">
                    <h3 className="sectionTitle">What Our Clients are Saying?</h3>
                </div>
                <p className="text-center ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {
                                testimonials.length === 0 
                                    ?
                                        <div class="item">
                                            <div class="shadow-effect">
                                                <img class="img-circle" src={userPic} />

                                                <p>555555555555555555555555555555555</p>
                                            </div>
                                            <div class="testimonial-name">
                                                <h5>Dr Random</h5>
                                                <small>Poland</small>
                                            </div>
                                        </div> 
                                    :
                                        testimonials.map(testimonialDetail => {
                                            return (
                                                <Testimonial testimonialDetail={testimonialDetail} key={testimonialDetail._key} />
                                            )
                                        })
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};