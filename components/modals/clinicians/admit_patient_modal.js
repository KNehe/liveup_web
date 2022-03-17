import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllWards } from "../../../features/wards/wardSlice";
import { admitPatient } from "../../../features/admissions/admissionSlice";
import { getClinicianStats } from "../../../features/stats/statSlice";
import { updateReferral } from "../../../features/referrals/refferralSlice";
import { getAssignedPatients } from "../../../features/patients/assigned_patientsSlice";

const AdmitPatientModal = ({ show, handleClose, selection }) => {
  const [patientFormData, setPatientFormData] = useState(selection);

  const [referalPayload, setReferalPayload] = useState(null);

  const {
    wards,
    isLoadingWardError,
    isLoadingWardSuccess,
    isLoadingWard,
    isLoadingWardMessage,
  } = useSelector((state) => state.ward);

  const {
    isAdmittingError,
    isAdmittingSuccess,
    isAdmitting,
    isAdmittingMessage,
  } = useSelector((state) => state.admit);

  const {
    isUpdatingReferralSuccess,
    isUpdatingReferral,
    isUpdatingReferralError,
    isUpdatingReferralMessage,
  } = useSelector((state) => state.referral);

  const dispatch = useDispatch();

  const { currentPageUri } = useSelector((state) => state.page);

  useEffect(() => {
    if (selection && show) {
      setPatientFormData(selection);
      dispatch(getAllWards());
    }
  }, [selection, show]);

  //   admissions
  useEffect(() => {
    if (isAdmittingError) {
      toast.error(isAdmittingMessage);
    }
  }, [isAdmittingError, isAdmittingMessage]);

  useEffect(() => {
    if (isAdmittingSuccess && !isAdmitting && show) {
      toast.info(`Patient admitted successfully`);
      dispatch(updateReferral(referalPayload));
    }
  }, [isAdmittingSuccess, isAdmitting]);

  //   referrals
  useEffect(() => {
    if (isUpdatingReferralError) {
      toast.error(isUpdatingReferralMessage);
    }
  }, [isUpdatingReferralError, isUpdatingReferralMessage]);

  useEffect(() => {
    if (isUpdatingReferralSuccess && !isUpdatingReferral && show) {
      toast.info(`Status changed to admitted`);
      dispatch(getClinicianStats());
      dispatch(getAssignedPatients(currentPageUri));
      handleClose();
    }
  }, [isUpdatingReferralSuccess, isUpdatingReferral]);

  //   handlers

  const onInputChange = (e) => {
    setPatientFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmitted = (e) => {
    e.preventDefault();

    if (!patientFormData?.ward || patientFormData?.ward === "default") {
      toast.error("Choose a ward");
      return;
    }

    const admissionPayload = {
      patient: patientFormData?.patient?.url,
      ward: patientFormData.ward,
    };

    const referralPayload = {
      status: "Admitted",
      referralUri: patientFormData.url,
    };
    setReferalPayload(referralPayload);
    dispatch(admitPatient(admissionPayload));
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
          <Modal.Title>Admit Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-2">
            <Form onSubmit={onFormSubmitted}>
              <h5>Patient Name: {patientFormData?.patient?.patient_name}</h5>

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
                        name="ward"
                        required
                      >
                        <option selected defaultValue="default">
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
                disabled={isAdmitting | isUpdatingReferral}
              >
                {isAdmitting | isUpdatingReferral ? (
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

export default AdmitPatientModal;
