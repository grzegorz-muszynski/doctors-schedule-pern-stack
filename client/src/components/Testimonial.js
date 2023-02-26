import React from 'react';

const Testimonial = ({testimonialDetail}) => {
    const {name, address, description, img} = testimonialDetail;
    console.log("testiMonialDetail" + testimonialDetail)
    return (
        <div class="item">
            <div class="shadow-effect">
                <img class="img-circle" src={img} />
                <p>{description}</p>
            </div>
            <div class="testimonial-name">
                <h5>{name}</h5>
                <small>{address}</small>
            </div>
        </div>
    );
};

export default Testimonial;