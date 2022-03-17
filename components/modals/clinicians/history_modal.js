import { useEffect } from "react";
import { Button, Modal, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAdmissions,
  resetLoadingAdmissionError,
  resetLoadingHistoryAdmissionError,
} from "../../../features/admissions/admissionSlice";
import {
  getPrescriptions,
  resetLoadingPrescriptionHistoryError,
} from "../../../features/prescriptions/prescriptionSlice";
import AdmissionHistoryCard from "./admission_history_card";
import PrescriptionCard from "./prescription_card";

const ViewPatientHistoryModal = ({
  show,
  handleClose,
  selection,
  onEditAdmissionBtnClick,
  onEditPrescriptionBtnClicked,
}) => {
  const {
    prescs,
    isLoadingPrescriptionHistoryError,
    isLoadingPrescSuccess,
    isLoadingPresc,
    isLoadingPrescMessage,
  } = useSelector((state) => state.prescribe);

  const {
    admissions,
    isLoadingAdmissionError,
    isLoadingAdmissionSuccess,
    isLoadingAdmission,
    isLoadingAdmissionMessage,
  } = useSelector((state) => state.admit);

  const dispatch = useDispatch();

  const { authDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    if (selection && show) {
      fetchPrescriptions(selection?.patient?.url);
      fetchAdmissions(selection?.patient?.url);
    }
    if (isLoadingAdmissionError) {
      dispatch(resetLoadingHistoryAdmissionError());
    }
    if (isLoadingPrescriptionHistoryError) {
      dispatch(resetLoadingPrescriptionHistoryError());
    }
  }, [selection, show]);

  const fetchPrescriptions = (url) => {
    if (url) {
      const patient_id = getIdFromUrl(url);
      dispatch(getPrescriptions(patient_id));
    }
  };

  const fetchAdmissions = (url) => {
    if (url) {
      const patient_id = getIdFromUrl(url);
      dispatch(getAdmissions(patient_id));
    }
  };

  const getIdFromUrl = (url) => {
    const list = url?.split("/");
    return list[list.length - 2];
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Patient History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Patient Name: {selection?.patient?.patient_name}</h5>
          <Accordion>
            {/* prescriptions */}

            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {" "}
                <h6>Prescriptions</h6>
              </Accordion.Header>
              <Accordion.Body>
                <Card className="p-4">
                  {isLoadingPresc ? (
                    <p className="text-info">Loading prescriptions...</p>
                  ) : isLoadingPrescriptionHistoryError ? (
                    <p className="text-danger">
                      An error occurred while Loading prescriptions
                    </p>
                  ) : isLoadingPrescSuccess && prescs.length == 0 ? (
                    <p className="text-success">
                      No prescriptions recorded for patient
                    </p>
                  ) : (
                    prescs.map((item, i) => (
                      <PrescriptionCard
                        key={i}
                        item={item}
                        authDetails={authDetails}
                        onEditBtnClicked={onEditPrescriptionBtnClicked}
                      />
                    ))
                  )}
                </Card>
              </Accordion.Body>
            </Accordion.Item>

            {/* admissions */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h6>Admissions</h6>
              </Accordion.Header>
              <Accordion.Body>
                <Card className="p-4">
                  {isLoadingAdmission ? (
                    <p className="text-info">Loading admissions...</p>
                  ) : isLoadingAdmissionError ? (
                    <p className="text-danger">
                      An error occurred while Loading admissions
                    </p>
                  ) : isLoadingAdmissionSuccess && admissions.length == 0 ? (
                    <p className="text-success">Patient not admitted yet </p>
                  ) : (
                    admissions.map((item, i) => (
                      <AdmissionHistoryCard
                        key={i}
                        item={item}
                        authDetails={authDetails}
                        onEditBtnClick={onEditAdmissionBtnClick}
                      />
                    ))
                  )}
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Finished reading?
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewPatientHistoryModal;
