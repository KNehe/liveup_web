import { useState, useEffect } from "react";
import { Button, Modal, Card, Form, Spinner, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllWards } from "../../../features/wards/wardSlice";
import { admitPatient } from "../../../features/admissions/admissionSlice";
import { getClinicianStats } from "../../../features/stats/statSlice";
import {
  getReferrals,
  updateReferral,
} from "../../../features/referrals/refferralSlice";
import { getAssignedPatients } from "../../../features/patients/assigned_patientsSlice";
import ReferralHistoryCard from "./referral_history_card";

const ReferralHistoryModal = ({ show, handleClose, selection }) => {
  const {
    referrals,
    isLoadingReferralsSuccess,
    isLoadingReferrals,
    isLoadingReferralsError,
    isLoadingReferralsMessage,
  } = useSelector((state) => state.referral);

  const dispatch = useDispatch();

  const { authDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    if (selection && show) {
      fetchReferrals(selection?.url);
    }
  }, [selection, show]);

  const fetchReferrals = (url) => {
    if (url) {
      const patientId = getIdFromUrl(url);
      dispatch(getReferrals(patientId));
    }
  };
  const getIdFromUrl = (url) => {
    const list = url?.split("/");
    return list[list.length - 2];
  };


  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Referral History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Patient Name: {selection?.patient_name || ""}</h5>
          <Card className="p-2">
            {isLoadingReferrals ? (
              <p className="text-info">Loading referral history...</p>
            ) : isLoadingReferralsError ? (
              <p className="text-danger">
                An error occurred while Loading referral history...
              </p>
            ) : isLoadingReferralsSuccess && referrals.length == 0 ? (
              <p className="text-success">
                Patient has not been referred to any clinician yet!
              </p>
            ) : 
            referrals?.map((item, i) => (
                <ReferralHistoryCard key={i} item={item} authDetails={authDetails}/>
            ))
           
            }
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReferralHistoryModal;
