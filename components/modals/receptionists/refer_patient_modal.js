import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getClinicians } from "../../../features/clinicians/clinicianSlice";
import {
  getPatientsForRecep,
} from "../../../features/patients/patientSlice";
import {
  referPatient,
} from "../../../features/referrals/refferralSlice";


const ReferPatientModal = ({ show, handleClose, selectedPatient }) => {
  const [patientFormData, setPatientFormData] = useState(selectedPatient);

  const {
    clinicians,
    isLoadingCliniciansError,
    isLoadingCliniciansSuccess,
    isLoadingClinicians,
    loadingCliniciansMessage,
  } = useSelector((state) => state.clinician);

  const  {
    isReferringError,
    isReferringSuccess,
    isReferring,
    referringMessage,
  } = useSelector((state) => state.referral);

  const dispatch = useDispatch();

  useEffect(() => {
    setPatientFormData(selectedPatient);
    dispatch(getClinicians());
  }, [selectedPatient]);

  useEffect(() => {
    if (isReferringError) {
      toast.error(referringMessage);
    }
  }, [isReferringError, referringMessage]);

  useEffect(() => {
    if (isReferringSuccess && !isReferring && show) {
      toast.info(`Patient referred successfully`);
      handleClose()
    }
  }, [isReferringSuccess, isReferring]);

  const onInputChange = (e) => {
    setPatientFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmitted = (e) => {
    e.preventDefault();

    if (!patientFormData?.doctor || patientFormData?.doctor === 'default')
    {
      toast.error('Choose a clinician')
      return
    }

    const requestPayload = {
      patient: patientFormData.url,
      doctor: patientFormData.doctor,
    };
    // alert(JSON.stringify(requestPayload));
    dispatch(referPatient(requestPayload));
  };

  const formSelectOptions = clinicians[0]?.map((item, i) => {
    return (
      <option value={item?.url} key={i} name="doctor">
        {item?.first_name} {item?.last_name} | {item?.role}
      </option>
    );
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Refer Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-2">
            <Form onSubmit={onFormSubmitted}>
              <h5>Patient Name: {patientFormData?.patient_name}</h5>

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
                        name='doctor'
                        required
                      >
                        <option selected defaultValue="default">Select a clinician</option>
                        {formSelectOptions}
                      </Form.Select>
                    </>
                  )}
                </>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isReferring}
              >
                {isReferring ? (
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

export default ReferPatientModal;
