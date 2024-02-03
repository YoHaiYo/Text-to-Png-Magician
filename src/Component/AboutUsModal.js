import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'
import fontdata from '../Data/fontdata'

export default function AboutUsModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button style={{backgroundColor: "#072f6a"}} variant="primary" onClick={() => setShow(true)}>
      About
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-width" // Modal.css에서 커스텀한 스타일! 
        aria-labelledby="FontModal-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="FontModal-custom-modal-styling-title">
            About Us
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
<p>When I had a hard time getting the font I wanted, I made a reaction project with the idea of "What if there is a site that simply changes the font I want to an image on the web?"</p>
<p>If you have any additional requests for this site, please contact us at: <span className='fw-bold'>12si47bun@naver.com</span></p>

<hr/>
          <p className='h6 fw-bold text-center' >If you are more curious about this project, please refer to the following GitHub address.</p>
          <p className='h5 fw-bold text-center my-3' ><a target='_blank' className='text-primary' href="https://github.com/YoHaiYo/Text-to-Png-Magician">
            https://github.com/YoHaiYo/Text-to-Png-Magician</a></p>
          <br/>

          <div className='d-flex justify-content-center align-items-center'>
            <span className='h6 fw-bold text-center' >you want font CSS file ? </span>
            <span className='h5 fw-bold text-center ms-1' ><a target='_blank' className='text-success' href="https://github.com/YoHaiYo/Text-to-Png-Magician/blob/main/public/css/font.css">
              Go to font css file</a></span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}