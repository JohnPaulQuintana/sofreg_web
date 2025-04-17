import React from 'react';

const GoogleMap = () => {
    return (
        <div className="google-map">
            <iframe
                id='gmap_canvas'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247008.0944718269!2d120.89737213525214!3d14.684209776454338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ba0942ef7375%3A0x4a9a32d9fe083d40!2sQuezon%20City%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2sin!4v1734418933489!5m2!1sen!2sin" style={{ border: 0, width: '100%', height: '400px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            


        </div>
    );
};

export default GoogleMap;
