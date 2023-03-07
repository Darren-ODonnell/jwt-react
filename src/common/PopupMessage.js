import React from 'react';

const PopupMessage = (props) => {
    return (
        <div className="popup-message">
            {props.message}
        </div>
    );
}

export default PopupMessage;
