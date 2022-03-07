import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updatePatientDetails,
  getPatientsForRecep,
} from "../../../features/patients/patientSlice";

const EditPatientDetailModal = ({ show, handleClose, selectedPatient }) => {
  const [patientFormData, setPatientFormData] = useState(selectedPatient);

  const [isFectchingUpdate, setFetchingUpdate] = useState(false);

  const {
    isUpdatingPatient,
    isUpdatingPatientError,
    isUpdatingPatientMessage,
    isUpdatingPatientSuccess,
  } = useSelector((state) => state.patient);

  const { currentPageUri } = useSelector((state) => state.page);

  const dispatch = useDispatch();

  useEffect(() => {
    setPatientFormData(selectedPatient);
  }, [selectedPatient]);

  useEffect(() => {
    if (isUpdatingPatientError) {
      toast.error(isUpdatingPatientMessage);
    }
  }, [isUpdatingPatientError, isUpdatingPatientMessage]);

  useEffect(() => {
    if (isUpdatingPatientSuccess && !isUpdatingPatient && show) {
      setFetchingUpdate(true);
      toast.info("Patient Details modified successfully");
      //Reload state with new data that includes updated patient
      dispatch(getPatientsForRecep(currentPageUri));
      setFetchingUpdate(false);
      handleClose()
    }
  }, [isUpdatingPatientSuccess, isUpdatingPatient]);

  const onInputChange = (e) => {
    setPatientFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmitted = (e) => {
    e.preventDefault();
    dispatch(updatePatientDetails(patientFormData));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modify Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-2">
            <Form onSubmit={onFormSubmitted}>
              <Form.Group className="mb-4" controlId="patient_name">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={patientFormData?.patient_name || ""}
                  name="patient_name"
                  type="text"
                  placeholder="Enter patient name"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="next_of_kin">
                <Form.Label>Next of Kin</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={patientFormData?.next_of_kin || ""}
                  name="next_of_kin"
                  type="text"
                  placeholder="Enter next of kin"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={patientFormData?.address || ""}
                  name="address"
                  type="text"
                  placeholder="Enter address"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="contacts">
                <Form.Label>Contacts</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={patientFormData?.contacts || ""}
                  name="contacts"
                  type="text"
                  placeholder="Enter contacts"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="dateofbirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={patientFormData?.date_of_birth || ""}
                  name="date_of_birth"
                  type="text"
                  placeholder="Enter date of birth"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isUpdatingPatient || isFectchingUpdate}
              >
                {isUpdatingPatient || isFectchingUpdate ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Save changes"
                )}
              </Button>
            </Form>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditPatientDetailModal;
