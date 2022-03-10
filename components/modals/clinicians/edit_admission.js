import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllWards } from "../../../features/wards/wardSlice";
import { updateAdmission } from "../../../features/admissions/admissionSlice";

const EditAdmissionModal = ({ show, handleClose, selectedAdmission }) => {
  const [patientFormData, setPatientFormData] = useState(selectedAdmission);

  const {
    wards,
    isLoadingWardError,
    isLoadingWardSuccess,
    isLoadingWard,
    isLoadingWardMessage,
  } = useSelector((state) => state.ward);

  const {
    isUpdatingAdmissionError,
    isUpdatingAdmissionSuccess,
    isUpdatingAdmission,
    isUpdatingAdmissionMessage,
  } = useSelector((state) => state.admit);

  const dispatch = useDispatch();

  // update internal state and fetch wards
  useEffect(() => {
    if (selectedAdmission && show) {
      setPatientFormData(selectedAdmission);
      dispatch(getAllWards());
    }
  }, [selectedAdmission, show]);
  
  useEffect(() => {
    if (isUpdatingAdmissionError) {
      toast.error(isUpdatingAdmissionMessage);
    }
  }, [isUpdatingAdmissionError, isUpdatingAdmissionMessage]);

    // trigger after updating the ward to which a patient is admitted
  useEffect(() => {
    if (isUpdatingAdmissionSuccess && !isUpdatingAdmission && show) {
      toast.info(`Admission updated successfully`);
      handleClose()
    }
  }, [isUpdatingAdmissionSuccess, isUpdatingAdmission]);

  const onInputChange = (e) => {
    setPatientFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmitted = (e) => {
    e.preventDefault();

    if (
      !patientFormData?.new_ward ||
      patientFormData?.new_ward === "Select a ward"
      || patientFormData?.new_ward === "default"
    ) {
      toast.error("Choose a ward");
      return;
    }

    if (patientFormData?.ward?.url === patientFormData?.new_ward) {
      toast.error("Selected ward is the same as the current ward");
      return;
    }

    const admissionPayload = {
      admissionUri: patientFormData?.url,
      ward: patientFormData?.new_ward,
    };

    // alert(JSON.stringify(admissionPayload));

    dispatch(updateAdmission(admissionPayload));
  };

  const formSelectOptions = wards[0]?.map((item, i) => {
    return (
      <option value={item?.url} key={i}>
        {item?.name}
      </option>
    );
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Admission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-4">
            <Form onSubmit={onFormSubmitted}>
              <h5>Patient Name: {patientFormData?.patient?.patient_name}</h5>
              <h5>Current Ward: {patientFormData?.ward?.name}</h5>

              <Form.Group className="mb-4" controlId="wards">
                <>
                  {isLoadingWard ? (
                    <p className="text-primary">Fetching wards...</p>
                  ) : isLoadingWardError ? (
                    <p className="text-danger">
                      An error occurred while fetching wards
                    </p>
                  ) : (
                    <>
                      <Form.Select
                        size="md"
                        aria-label="Select a ward"
                        onChange={onInputChange}
                        name="new_ward"
                        required
                      >
                        <option defaultValue="default">
                          Select a ward
                        </option>
                        {formSelectOptions}
                      </Form.Select>
                    </>
                  )}
                </>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                  disabled={isUpdatingAdmission}
              >
                {isUpdatingAdmission ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Confirm"
                )}
              </Button>
            </Form>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditAdmissionModal;
