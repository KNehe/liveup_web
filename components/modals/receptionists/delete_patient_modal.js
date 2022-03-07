import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Card,
  Form,
  Spinner,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deletePatient,
  getPatientsForRecep,
} from "../../../features/patients/patientSlice";
import { getReceptionistStats } from "../../../features/stats/statSlice";

const DeletePatientDetailModal = ({ show, handleClose, selectedPatient }) => {
  const [patientFormData, setPatientFormData] = useState(selectedPatient);

  const [isFectchingUpdate, setFetchingUpdate] = useState(false);

  const {
    isDeletingPatient,
    isDeletingError,
    deletingMessage,
    isDeletingSuccess,
  } = useSelector((state) => state.patient);

  const dispatch = useDispatch();

  useEffect(() => {
    setPatientFormData(selectedPatient);
  }, [selectedPatient]);

  useEffect(() => {
    if (isDeletingError) {
      toast.error(deletingMessage);
    }
  }, [isDeletingError, deletingMessage]);

  useEffect(() => {
    if (isDeletingSuccess && !isDeletingPatient && show) {
      setFetchingUpdate(true);
      toast.info("Patient deleted successfully");
      //Reload state with new data that includes updated patient
      dispatch(getPatientsForRecep(null));
      setFetchingUpdate(false);
      dispatch(getReceptionistStats());
    }
  }, [isDeletingSuccess, isDeletingPatient]);

  const onFormSubmitted = (e) => {
    e.preventDefault();
    dispatch(deletePatient(patientFormData.url));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Delete Patient ({patientFormData?.patient_name}) ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-2">
            <Form onSubmit={onFormSubmitted}>
              <Row>
                <Col>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isDeletingPatient || isFectchingUpdate}
                  >
                    {isDeletingPatient || isFectchingUpdate ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Confirm delete"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeletePatientDetailModal;
