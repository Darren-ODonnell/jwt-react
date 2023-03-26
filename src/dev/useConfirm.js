import {useState, useEffect} from 'react';

const useConfirm = (message, callback) => {
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (showConfirm) {
            const confirmAction = window.confirm(message);
            if (confirmAction) {
                console.log("Got Here")
                // callback();
            }
            setShowConfirm(false);
        }
    }, [showConfirm, message, callback]);

    const handleConfirm = (data) => {
        console.log("id: " + data.id)
        setShowConfirm(true);
    };

    return [handleConfirm];
};

export default useConfirm;
