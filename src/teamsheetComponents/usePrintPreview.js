import React, {useState} from 'react';

const usePrintPreview = (initialValue) => {
    const [isPrintPreview, setIsPrintPreview] = useState(initialValue);

    const handlePrintPreview = () => {
        setIsPrintPreview(!isPrintPreview);
    };

    return {isPrintPreview, handlePrintPreview};
};
export default usePrintPreview;