import { Button, Modal, Row, Col, Card } from "react-bootstrap";

const ViewPatientDetailsModal = ({ show, handleClose, selection }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Referral Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* patient info */}
          <Card className="p-4">
            <Row>
              <Col>
                <b>Patient Number:</b>
              </Col>
              <Col>{selection?.patient?.patient_number}</Col>
            </Row>
            <Row>
              <Col>
                <b>Patient Name:</b>
              </Col>
              <Col>{selection?.patient?.patient_name}</Col>
            </Row>
            <Row>
              <Col>
                <b>Next of Kin:</b>
              </Col>
              <Col>{selection?.patient?.next_of_kin}</Col>
            </Row>
            <Row>
              <Col>
                <b>Address:</b>
              </Col>
              <Col>{selection?.patient?.address}</Col>
            </Row>
            <Row>
              <Col>
                <b>Date of birth:</b>
              </Col>
              <Col>{selection?.patient?.date_of_birth}</Col>
            </Row>
            <Row>
              <Col>
                <b>Age:</b>
              </Col>
              <Col>{selection?.patient?.age} yrs</Col>
            </Row>
            <Row>
              <Col>
                <b>Contacts:</b>
              </Col>
              <Col>{selection?.patient?.contacts}</Col>
            </Row>
          </Card>

          {/* referer info */}
          <Card className="p-4 mt-2">
            <Row>
              <Col>
                <b>Refferred by:</b>
              </Col>
              {selection?.created_by?.first_name ? (
                <Col>
                  {selection?.created_by?.first_name}{" "}
                  {selection?.created_by?.last_name}
                </Col>
              ) : (
                <Col>{selection?.created_by?.username}</Col>
              )}
            </Row>
            <Row>
              <Col>
                <b>Role:</b>
              </Col>
              <Col>{selection?.created_by?.role}</Col>
            </Row>
            <Row>
              <Col>
                <b>Email:</b>
              </Col>
              <Col>{selection?.created_by?.email}</Col>
            </Row>
            <Row>
              <Col>
                <b>Date Refferred:</b>
              </Col>
              <Col>{new Date(selection?.created_at).toLocaleDateString()}</Col>
            </Row>
            <Row>
              <Col>
                <b>Time Refferred:</b>
              </Col>
              <Col>{new Date(selection?.created_at).toLocaleTimeString()}</Col>
            </Row>
            <Row>
              <Col>
                <b>Status:</b>
              </Col>
              <Col>{selection?.status}</Col>
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

export default ViewPatientDetailsModal;
