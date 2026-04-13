import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';



function ConfirmDialog({confirm}) {
 const [show, setShow] = useState(false);

  const handleClose = () =>{ 
    setShow(false);
    window.location.reload();
  }


  useEffect(() => {
    setShow(true);
   }, []);

  return (
 <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>WARNING</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this trip?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant="danger" onClick={confirm}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  
  );
}
export default ConfirmDialog;

