import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';

function ConfirmationModal({showModal, setShowModal, setConfirmation, message, title, onConfirm, type}) {
    const renderCount = useRef(0);
    // useEffect(() => {
    //     renderCount.current++;
    //     console.log('Render count - ConfirmationModal:', renderCount.current);
    // });

    const handleConfirm = () => {
        let bool = true

        setConfirmation(true)
        // onConfirm()
        handleClose()
    };

    const handleClose = () => {
        setShowModal(false);
        setConfirmation(false);
    }

    const showDeleteElements = useCallback(() => {
        switch(type) {
            case "Delete" :  return true;
            case "Filter" :
               return false;
           default:
        }
    },[type])

    const showFilterElements = useCallback(() => {
        switch(type) {
            case "Delete" :  return false;
           case "Filter" :
              return true;
           default:
        }
    },[type])

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>

                <Modal.Footer>
                    {showDeleteElements() && <Button variant = "secondary" onClick = { handleClose }>   Cancel  </Button> }
                    {showDeleteElements() && <Button variant = "primary"   onClick = { handleConfirm }> Confirm </Button> }
                    {showFilterElements() && <Button variant = "primary"   onClick = { handleClose }>   OK      </Button> }
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default ConfirmationModal;
