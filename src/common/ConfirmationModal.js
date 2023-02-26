import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

function ConfirmationModal({showModal, setShowModal, message, title, onConfirm, setConfirmation, handleDelete}) {

    const handleClose = () => {
        console.log("ConfirmationModal - HandleClose")
        setShowModal(false);
        setConfirmation(false);
    }

    const handleConfirm = () => {
        console.log("ConfirmationModal - HandleConfirm")
        onConfirm();
        setConfirmation(true)
        handleClose();
    };

    console.log("ShowModal: " + showModal)

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmationModal;
