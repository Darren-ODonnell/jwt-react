import React, { useCallback, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';

function ConfirmationModal({showModal, setShowModal, message, title, onConfirm, setDeleteConfirmation, type}) {



    const handleConfirm = () => {
        let bool = true
        console.log("setDeleteConfirmation: " + setDeleteConfirmation(bool) + bool)
        setDeleteConfirmation(true)
        // onConfirm()
        handleClose()
    };

    const handleClose = () => {
        setShowModal(false);
        setDeleteConfirmation(false);
    }

    const showDeleteElements = useCallback(() => {
        switch(type) {
            case "Delete" :  return true;
            case "Filter" :  return false;
        }
    },[type])
    const showFilterElements = useCallback(() => {
        switch(type) {
            case "Delete" :  return false;
            case "Filter" :  return true;
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
