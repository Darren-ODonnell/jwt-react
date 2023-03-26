import React, { useState } from 'react';

function PrintDisplay() {
    const [display, setDisplay] = useState('Your display text');
    const [showButton, setShowButton] = useState(true);

    const handlePrint = () => {
        setShowButton(false);
        window.onafterprint = () => setShowButton(true);
        window.print();
    };

    return (
        <div>
            <div>{display}</div>
            {showButton && <button onClick={handlePrint}>Print</button>}
        </div>
    );
}

export default PrintDisplay;
