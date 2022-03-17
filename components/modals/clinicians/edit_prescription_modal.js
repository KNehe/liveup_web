import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {resetUpdaingPrescError, updatePrescription } from "../../../features/prescriptions/prescriptionSlice";

const EditPrescriptionModal = ({ show, handleClose, selection }) => {
  const [formData, setFormData] = useState(selection);
 console.log(selection)
  const {
    prescs,
    singlePresc,
    isUpdatingPrescError,
    isUpdatingPrescSuccess,
    isUpdatingPresc,
    isUpdatingPrescMessage,
  } = useSelector((state) => state.prescribe);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selection && show) {
      setFormData(selection);
    }
  }, [selection, show]);

  useEffect(() => {
    if (isUpdatingPrescError) {
      toast.error(isUpdatingPrescMessage);
    }
    dispatch(resetUpdaingPrescError())
  }, [isUpdatingPrescError, isUpdatingPrescMessage]);

  useEffect(() => {
    if (isUpdatingPrescSuccess && !isUpdatingPresc && show) {
      toast.info("Prescription updated successfully !");
      handleClose();
    }
  }, [isUpdatingPrescSuccess, isUpdatingPresc]);

  const onInputChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmitted = (e) => {
    e.preventDefault();
    const requestPayload = {
      start_datetime: formData?.start_datetime,
      end_datetime: formData?.end_datetime,
      description: formData?.description,
      prescriptionUri: formData?.url
    };
    // alert(JSON.stringify(requestPayload));
    dispatch(updatePrescription(requestPayload));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update prescription</Modal.Title>
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
                  onChange={onInputChange}
                  value={formData?.end_datetime || ""}
                  name="end_datetime"
                  type="datetime-local"
                  placeholder="Enter end date and time"
                />
              </Form.Group>

              {/* description */}
              <Form.Group className="mb-4" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
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
                disabled={isUpdatingPresc}
              >
                {isUpdatingPresc ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Update prescription"
                )}
              </Button>
            </Form>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditPrescriptionModal;
