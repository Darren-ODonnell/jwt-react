import React from 'react';

const FullBleedImage = ({source}) => {
    return (
        <div style={{
            backgroundImage: `url(${source})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '10vh',
            width: '100%'
        }}/>
    );
};

export default FullBleedImage;