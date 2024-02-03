import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Modal.css'
import fontdata from '../Data/fontdata'

function FontLicenseModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button style={{backgroundColor: "#072f6a"}} variant="primary" onClick={() => setShow(true)}>
      License
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-width" // Modal.css에서 커스텀한 스타일! 
        aria-labelledby="FontModal-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="FontModal-custom-modal-styling-title">
            About Font License
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The fonts can be used, researched, modified, and redistributed freely unless they are sold on their own. In addition, users other than intellectual property holders cannot modify, distribute, and sell them, and they must be used in the form they were distributed.</p>
          <p className='h5 fw-bold text-center mb-5' >Click on the font for more license information.</p>

          {/* 폰트 정보 출력 */}
          <div className='d-flex flex-wrap'>
            {fontdata.map((el, index) => (
              <div key={index} className='col-6 col-lg-4 text-center' >
                  <a style={{fontFamily: `${el.fontfamily}`}} href={el.url} target="_blank" rel="noopener noreferrer">
                  {el.viewname}
                  </a>
                <hr className='mx-3'/>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FontLicenseModal;