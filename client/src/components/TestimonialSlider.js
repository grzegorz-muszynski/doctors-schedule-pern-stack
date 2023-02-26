import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Testimonial from './Testimonial';
import './Testimonial.css';

// import 'bootstrap/dist/css/bootstrap.min.css';

export const TestimonialSlider = () => {
  
    const testimonials = [
        {   
            key: 'testimonial-1',
            name: 'Dr. Gregory House',
            description: "It's a brilliant, very intuitive, effective tool and big improvement for my hospital.",
            address: 'USA',
            img: '../images/drHouse.jpg'
        },
        {   
            key: 'testimonial-2',
            name: 'Dr. Harold',
            description: "You can trust me. It's the best program for clinics.",
            address: 'Hungary',
            img: './images/harold2.jpg'
        },
        {   
            key: 'testimonial-3',
            name: 'Dr. Dre',
            description: "Actually, I ain't medicine doctor but my homies working in hospitals claim this app is kinda cool stuff.",
            address: 'USA',
            img: '../images/drDre.jpg'
        },
        {   
            key: 'testimonial-4',
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
        items: 3,
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
                items: 2
            },
            1000: {
                items: 3
            }
        }
    };

    return (
        <section id="testimonial" className="testimonials pt-70 pb-70">
            <div className="container mt-5">
                <div className="text-center ">
                    <h3 className="sectionTitle">Our references</h3>
                </div>
                <p className="text-center">The program has been trusted by many specialists. Try you too!</p>
                <hr id='separatorReferences'></hr>

                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel id="customer-testimonials" className="owl-carousel owl-theme" {...options}>
                            {
                                testimonials.map(testimonialDetail => {
                                    return (
                                        <Testimonial testimonialDetail={testimonialDetail} key={testimonialDetail.key} />
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