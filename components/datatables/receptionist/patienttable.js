import { tableIcons } from "../tableicons";
import MaterialTable from "material-table";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import PatientDetailModal from "../../modals/receptionists/patient_detail_modal";
import EditPatientDetailModal from "../../modals/receptionists/edit_patient_detail_modal";
import RegisterPatientModal from "../../modals/receptionists/register_patient_modal";
import DeletePatientModal from "../../modals/receptionists/delete_patient_modal";
import ReferPatientModal from "../../modals/receptionists/refer_patient_modal";
import ReferralHistoryModal from "../../modals/receptionists/referral_history_modal";

const RegisteredPatientsTable = ({ data }) => {
  // Doing this because redux-toolkit applies object.freeze() on data
  // and can't modify object
  const patientData = data.map((o) => ({ ...o }));

  const [showPatientDetailModal, setPatientDetailModal] = useState(false);
  const [showEditDetailModal, setEditDetailModal] = useState(false);
  const [showAddPatientModal, setAddPatientModal] = useState(false);
  const [showDeletePatientModal, setDeletePatientModal] = useState(false);
  const [showReferPatientModal, setReferPatientModal] = useState(false);
  const [showReferralHistoryModal, setReferralHistoryModal] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleClosePatientDetailModal = () => {
    setPatientDetailModal(false);
  };

  const handleCloseEditModal = () => {
    setEditDetailModal(false);
  };

  const handleCloseAddModal = () => {
    setAddPatientModal(false);
  };

  const handleCloseDeleteModal = () => {
    setDeletePatientModal(false);
  };

  const handleCloseReferModal = () => {
    setReferPatientModal(false);
  };

  const handleCloseReferralHistoryModal = () => {
    setSelectedPatient(null);
    setReferralHistoryModal(false);
  };

  const columns = [
    { title: "Patient Number", field: "patient_number" },
    { title: "Patient Name", field: "patient_name" },
    { title: "Address", field: "address" },
  ];

  const actions = [
    {
      icon: tableIcons.Edit,
      tooltip: "Modify patient data",
      onClick: (event, rowData) => {
        setSelectedPatient(rowData);
        setEditDetailModal(true);
      },
    },
    {
      icon: tableIcons.Send,
      tooltip: "Refer patient",
      onClick: (event, rowData) => {
        setSelectedPatient(rowData);
        setReferPatientModal(true);
      },
    },
    {
      icon: tableIcons.DetailPanel,
      tooltip: "View more",
      onClick: (event, rowData) => {
        setSelectedPatient(rowData);
        setPatientDetailModal(true);
      },
    },
    {
      icon: tableIcons.Delete,
      tooltip: "Delete patient",
      onClick: (event, rowData) => {
        setSelectedPatient(rowData);
        setDeletePatientModal(true);
      },
    },
    {
      icon: tableIcons.History,
      tooltip: "View referral history",
      onClick: (event, rowData) => {
        setSelectedPatient(rowData);
        setReferralHistoryModal(true);
      },
    },
  ];

  return (
    <>
      {/* Registered Patients Data Table */}
      <Container>
        <Row className="mb-2">
          <Col>&nbsp;</Col>
          <Col>
            <Button variant="primary" onClick={(e) => setAddPatientModal(true)}>
              Register patient
            </Button>
          </Col>
        </Row>
        <Row>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              columns={columns}
              data={patientData}
              title="Patients You Have Registered"
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
        </Row>
      </Container>

      {/* Patient Detail Modal */}
      <PatientDetailModal
        show={showPatientDetailModal}
        handleClose={handleClosePatientDetailModal}
        selectedPatient={selectedPatient}
      />

      {/* Edit Patient Detail Modal */}
      <EditPatientDetailModal
        show={showEditDetailModal}
        handleClose={handleCloseEditModal}
        selectedPatient={selectedPatient}
      />

      {/* Regsiter Patient  Modal */}
      <RegisterPatientModal
        show={showAddPatientModal}
        handleClose={handleCloseAddModal}
      />

      {/* Delete patient modal */}
      <DeletePatientModal
        show={showDeletePatientModal}
        handleClose={handleCloseDeleteModal}
        selectedPatient={selectedPatient}
      />

      {/* Delete patient modal */}
      <ReferPatientModal
        show={showReferPatientModal}
        handleClose={handleCloseReferModal}
        selectedPatient={selectedPatient}
      />

      {/* Patient Referral History Modal */}
      <ReferralHistoryModal
        show={showReferralHistoryModal}
        handleClose={handleCloseReferralHistoryModal}
        selection={selectedPatient}
      />
    </>
  );
};

export default RegisteredPatientsTable;
