import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateReferral, resetUpdateReferralError} from "../../../features/referrals/refferralSlice";
import { getAssignedPatients } from "../../../features/patients/assigned_patientsSlice";

const EditStatusModal = ({ show, handleClose, selection }) => {
  const [formData, setFormData] = useState(selection);

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
      setFormData(selection);
    }
  }, [selection, show]);

  useEffect(() => {
    if (isUpdatingReferralError) {
      toast.error(isUpdatingReferralMessage);
      dispatch(resetUpdateReferralError())
    }
  }, [isUpdatingReferralError, isUpdatingReferralMessage]);

  useEffect(() => {
    if (isUpdatingReferralSuccess && !isUpdatingReferral && show) {
      toast.info(`Status changed to '${formData?.new_status}' successfully`);
      dispatch(getAssignedPatients(currentPageUri));
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

    if (
      !formData?.new_status ||
      formData?.new_status === "default" ||
      formData?.new_status === "Choose status"
    ) {
      toast.error("Choose status");
      return;
    }

    if (formData?.status === formData?.new_status) {
      toast.error("Choice is same as current status");
      return;
    }

    const payload = {
      status: formData?.new_status,
      referralUri: formData.url,
    };

    dispatch(updateReferral(payload));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Change status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="p-2">
            <Form onSubmit={onFormSubmitted}>
              <h5>Patient Name: {formData?.patient?.patient_name}</h5>
              <p className="mt-4">
                <strong>Note</strong>
              </p>
              <p>
                To change status to Admitted, check <strong>Admit</strong> in
                actions
              </p>
              <p className="mb-4">
                Status is by default <b>"Not Seen"</b>, when a patient is
                referred to you
              </p>

              <Form.Group className="mb-4" controlId="status">
                <Form.Select
                  size="md"
                  aria-label="Choose status"
                  onChange={onInputChange}
                  name="new_status"
                  required
                >
                  <option defaultValue value="default">
                    Choose status
                  </option>
                  <option value="In progress">In progress</option>
                  <option value="Discharged">Discharged</option>
                  <option value="Not seen">Not seen</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isUpdatingReferral}
              >
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

export default EditStatusModal;
