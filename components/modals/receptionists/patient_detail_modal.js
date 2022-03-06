import { Button, Modal, Row, Col, Card } from "react-bootstrap";

const PatientDetailModal = ({ show, handleClose, selectedPatient }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-4">
            <Row>
              <Col>
                <b>Patient Number:</b>
              </Col>
              <Col>{selectedPatient?.patient_number}</Col>
            </Row>
            <Row>
              <Col>
                <b>Patient Name:</b>
              </Col>
              <Col>{selectedPatient?.patient_name}</Col>
            </Row>
            <Row>
              <Col>
                <b>Next of Kin:</b>
              </Col>
              <Col>{selectedPatient?.next_of_kin}</Col>
            </Row>
            <Row>
              <Col>
                <b>Address:</b>
              </Col>
              <Col>{selectedPatient?.address}</Col>
            </Row>
            <Row>
              <Col>
                <b>Date of birth:</b>
              </Col>
              <Col>{selectedPatient?.date_of_birth}</Col>
            </Row>
            <Row>
              <Col>
                <b>Age:</b>
              </Col>
              <Col>{selectedPatient?.age} yrs</Col>
            </Row>
            <Row>
              <Col>
                <b>Contacts:</b>
              </Col>
              <Col>{selectedPatient?.contacts}</Col>
            </Row>
          </Card>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Finished reading?
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PatientDetailModal;
