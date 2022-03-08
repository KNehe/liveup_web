import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { tableIcons } from "../tableicons";
import MaterialTable from "material-table";
import ViewPatientDetailsModal from "../../modals/clinicians/view_details_modal";
import { useState } from "react";

const AssignedPatientsTable = ({ data }) => {
  // Doing this because redux-toolkit applies object.freeze() on data
  // and can't modify object
  const patientData = data?.map((o) => ({ ...o }));

  const [showDetailModal, setShowDetailModal] = useState(false);

  const [selection, setSelection] = useState(null);

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelection(null);
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
        alert("haha");
      },
    },
    {
      icon: tableIcons.Prescribe,
      tooltip: "Prescribe",
      onClick: (event, rowData) => {
        alert("haha");
      },
    },
    {
      icon: tableIcons.History,
      tooltip: "history",
      onClick: (event, rowData) => {
        alert("haha");
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
    </>
  );
};

export default AssignedPatientsTable;
