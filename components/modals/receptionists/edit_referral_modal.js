import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getClinicians } from "../../../features/clinicians/clinicianSlice";
import { referPatient, updateReferral } from "../../../features/referrals/refferralSlice";
import { getReceptionistStats } from "../../../features/stats/statSlice";

const EditReferralModal = ({ show, handleClose, selectedReferral }) => {
  const [formData, setFormData] = useState(selectedReferral);
  const {
    clinicians,
    isLoadingCliniciansError,
    isLoadingCliniciansSuccess,
    isLoadingClinicians,
    loadingCliniciansMessage,
  } = useSelector((state) => state.clinician);

  const {
    isUpdatingReferralError,
    isUpdatingReferralSuccess,
    isUpdatingReferral,
    isUpdatingReferralMessage,
  } = useSelector((state) => state.referral);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedReferral && show){
      setFormData(selectedReferral);
      dispatch(getClinicians());
    }
  }, [selectedReferral, show]);

  useEffect(() => {
    if (isUpdatingReferralError) {
      toast.error(isUpdatingReferralMessage);
    }
  }, [isUpdatingReferralError, isUpdatingReferralMessage]);

  useEffect(() => {
    if (isUpdatingReferralSuccess && !isUpdatingReferral && show) {
      toast.info(`Patient referral details updated successfully`);
      dispatch(getReceptionistStats());
      handleClose();
    }
  }, [isUpdatingReferralSuccess, isUpdatingReferral]);

  const onInputChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmitted = (e) => {
    e.preventDefault();

    if (!formData?.new_doctor || formData?.new_doctor === "default") {
      toast.error("Choose a clinician");
      return;
    }

    if (formData?.doctor?.url === formData?.new_doctor) {
      toast.error("Choice is same as current value");
      return;
    }

    const requestPayload = {
      doctor: formData.new_doctor,
      referralUri: formData.url
    };
    dispatch(updateReferral(requestPayload));
  };

  const formSelectOptions = clinicians[0]?.map((item, i) => {
    return (
      <option value={item?.url} key={i}>
        {item?.first_name} {item?.last_name} | {item?.role}
      </option>
    );
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Referral</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-4">
            <Form onSubmit={onFormSubmitted}>
              <h6>Patient Name: {formData?.patient?.patient_name}</h6>
              <h6>Patient Number: {formData?.patient?.patient_number}</h6>
              <Form.Group className="mb-4" controlId="clinicians">
                <>
                  {isLoadingClinicians ? (
                    <p className="text-primary">Fetching doctors...</p>
                  ) : isLoadingCliniciansError ? (
                    <p className="text-danger">
                      An error occurred while fetching clinicians
                    </p>
                  ) : (
                    <>
                      <Form.Select
                        size="md"
                        aria-label="Select a doctor"
                        onChange={onInputChange}
                        name="new_doctor"
                        required
                      >
                        <option selected defaultValue value="default">
                          Select a clinician
                        </option>
                        {formSelectOptions}
                      </Form.Select>
                    </>
                  )}
                </>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isUpdatingReferral}>
                {isUpdatingReferral ? (
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

export default EditReferralModal;
