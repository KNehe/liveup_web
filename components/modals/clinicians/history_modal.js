import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPrescriptions } from "../../../features/prescriptions/prescriptionSlice";
import PrescriptionCard from "./prescription_card";

const ViewPatientHistoryModal = ({ show, handleClose, selection }) => {
  const {
    prescs,
    isLoadingPrescError,
    isLoadingPrescSuccess,
    isLoadingPresc,
    isLoadingPrescMessage,
  } = useSelector((state) => state.prescribe);

  const { authDetails } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selection && show) {
      fetchPrescriptions(selection?.patient?.url);
    }
  }, [selection, show]);

  const fetchPrescriptions = (url) => {
    if (url) {
      const list = url?.split("/");
      const patient_id = list[list.length - 2];
      dispatch(getPrescriptions(patient_id));
    }
  };
  // console.log("modal", prescs);
   
  // Generate prescriptions
  const presData = prescs.map((item, i) => {
    return (
        <PrescriptionCard key={i} item={item} authDetails={authDetails} />
    );
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Patient History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Patient Name: {selection?.patient?.patient_name}</h5>
          <Card className="p-4">
            <h5>Prescriptions</h5>
            {isLoadingPresc ? (
              <p className="text-info">Loading prescriptions...</p>
            ) : isLoadingPrescError ? (
              <p className="text-danger">
                An error occurred while Loading prescriptions
              </p>
            ) : isLoadingPrescSuccess && presData.length == 0 ? (
              <p className="text-success">
                No prescriptions recorded for patient
              </p>
            ) : (
              presData
            )}
          </Card>
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
