import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { tableIcons } from "../tableicons";
import MaterialTable from "material-table";
import ViewPatientDetailsModal from "../../modals/clinicians/view_details_modal";
import { useState } from "react";
import AdmitPatientModal from "../../modals/clinicians/admit_patient_modal";
import PrescribeModal from "../../modals/clinicians/prescribe_modal";
import ViewPatientHistoryModal from "../../modals/clinicians/history_modal";
import EditAdmissionModal from "../../modals/clinicians/edit_admission";

const AssignedPatientsTable = ({ data }) => {
  // Doing this because redux-toolkit applies object.freeze() on data
  // and can't modify object
  const patientData = data?.map((o) => ({ ...o }));

  const [showDetailModal, setShowDetailModal] = useState(false);

  const [showAdmitModal, setShowAdmitModal] = useState(false);

  const [showPrescribeModal, setShowPrescribeModal] = useState(false);

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const [showEditAdmitModal, setShowEditAdmissionModal] = useState(false);

  const [selection, setSelection] = useState(null);

  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelection(null);
  };

  const handleCloseAdmitModal = () => {
    setShowAdmitModal(false);
    setSelection(null);
  };

  const handleClosePrescribeModal = () => {
    setShowPrescribeModal(false);
    setSelection(null);
  };

  const handleCloseEditAdmissionModal = () => {
    setShowEditAdmissionModal(false);
    setSelection(null);
    setSelectedAdmission(null)
  };

  const handleCloseHistoryModal = () => {
    setShowHistoryModal(false);
    setSelection(null);
  };

  const onEditAdmissionBtnHandler = (e, selectedAdmission) => {
    setShowHistoryModal(false);
    setSelectedAdmission(selectedAdmission)
    setShowEditAdmissionModal(true);
  };

  const actions = [
    {
      icon: tableIcons.Details,
      tooltip: "Details",
      onClick: (event, rowData) => {
        setSelection(rowData);
        setShowDetailModal(true);
      },
    },
    {
      icon: tableIcons.Admit,
      tooltip: "Admit patient",
      onClick: (event, rowData) => {
        setSelection(rowData);
        setShowAdmitModal(true);
      },
    },
    {
      icon: tableIcons.Prescribe,
      tooltip: "Prescribe",
      onClick: (event, rowData) => {
        setShowPrescribeModal(true);
        setSelection(rowData);
      },
    },
    {
      icon: tableIcons.History,
      tooltip: "history",
      onClick: (event, rowData) => {
        setSelection(rowData);
        setShowHistoryModal(true);
      },
    },
  ];

  const columns = [
    { title: "Patient Number", field: "patient.patient_number" },
    { title: "Patient Name", field: "patient.patient_name" },
    { title: "status", field: "status" },
  ];

  return (
    <>
      {/* Patient data table */}
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={patientData}
          title="Patients Referred To you"
          actions={actions}
          options={{
            sorting: true,
            exportButton: true,
            actionsColumnIndex: -1,
            paging: false,
            sorting: true,
            draggable: true,
          }}
        />
      </div>

      {/* Patient Detail Data Modal */}
      <ViewPatientDetailsModal
        show={showDetailModal}
        handleClose={handleCloseDetailModal}
        selection={selection}
      />

      {/* Admit Patient Modal */}
      <AdmitPatientModal
        show={showAdmitModal}
        handleClose={handleCloseAdmitModal}
        selection={selection}
      />

      <PrescribeModal
        show={showPrescribeModal}
        handleClose={handleClosePrescribeModal}
        selection={selection}
      />

      {/* Patient History Modal */}
      <ViewPatientHistoryModal
        handleClose={handleCloseHistoryModal}
        show={showHistoryModal}
        selection={selection}
        onEditBtnClick={onEditAdmissionBtnHandler}
      />

      {/* Edit Admission Modal */}
      <EditAdmissionModal
        show={showEditAdmitModal}
        handleClose={handleCloseEditAdmissionModal}
        selectedAdmission={selectedAdmission}
      />
    </>
  );
};

export default AssignedPatientsTable;
