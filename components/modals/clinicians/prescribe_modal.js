import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updatePatientDetails,
  getPatientsForRecep,
} from "../../../features/patients/patientSlice";
import { registerPrescription, resetLoadingPrescError } from "../../../features/prescriptions/prescriptionSlice";

const PrescribeModal = ({ show, handleClose, selection }) => {
  const [formData, setFormData] = useState(selection);

  const {
    prescs,
    singlePresc,
    isLoadingPrescError,
    isLoadingPrescSuccess,
    isLoadingPresc,
    isLoadingPrescMessage,
  } = useSelector((state) => state.prescribe);

  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(selection);
  }, [selection]);

  useEffect(() => {
    if (isLoadingPrescError) {
      toast.error(isLoadingPrescMessage);
    }
    dispatch(resetLoadingPrescError())
  }, [isLoadingPrescError, isLoadingPrescMessage]);

  useEffect(() => {
    if (isLoadingPrescSuccess && !isLoadingPresc && show) {
      toast.info("Prescription added successfully !");
      handleClose();
    }
  }, [isLoadingPrescSuccess, isLoadingPresc]);

  const onInputChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmitted = (e) => {
    e.preventDefault();
    const requestPayload = {
      patient: formData?.patient?.url,
      start_datetime: formData?.start_datetime,
      end_datetime: formData?.end_datetime,
      description: formData?.description,
    };
    // alert(JSON.stringify(requestPayload));
    dispatch(registerPrescription(requestPayload));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Prescribe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* patient detials */}
          <Card className="p-2 mb-2">
            <p>
              <b>Patient Number: </b>
              {formData?.patient?.patient_number}
            </p>

            <p>
              <b>Patient Name: </b>
              {formData?.patient?.patient_name}
            </p>
            <p>
              <b>Patient Age: </b>
              {formData?.patient?.age} yrs
            </p>
          </Card>
          {/* card with form */}
          <Card className="p-2">
            {/* form */}
            <Form onSubmit={onFormSubmitted}>
              {/* start date time */}
              <Col>
                <Form.Group className="mb-4" controlId="start_datetime">
                  <Form.Label>Start date and time</Form.Label>
                  <Form.Control
                    required
                    onChange={onInputChange}
                    value={formData?.start_datetime || ""}
                    name="start_datetime"
                    type="datetime-local"
                    placeholder="Enter start date and time"
                  />
                </Form.Group>
              </Col>

              {/* end date time */}

              <Form.Group className="mb-4" controlId="end_datetime">
                <Form.Label>End date and time</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={formData?.end_datetime || ""}
                  name="end_datetime"
                  type="datetime-local"
                  placeholder="Enter end date and tome"
                  min={new Date().toISOString()}
                />
              </Form.Group>

              {/* description */}
              <Form.Group className="mb-4" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={formData?.description || ""}
                  min="20"
                  name="description"
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isLoadingPresc}
              >
                {isLoadingPresc ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Add prescription"
                )}
              </Button>
            </Form>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PrescribeModal;
