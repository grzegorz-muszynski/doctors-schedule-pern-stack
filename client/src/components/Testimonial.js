import React from 'react';

const Testimonial = ({testimonialDetail}) => {
    const {name, address, description, img} = testimonialDetail;

    return (
        <div className="item">
            <div className="testimonial-description">
                <img className="imgCircle" src={img} />
                <p>{description}</p>
            </div>
            <div className="testimonialName">
                <h5>{name}</h5>
                <small>{address}</small>
            </div>
        </div>
    );
};

export default Testimonial;