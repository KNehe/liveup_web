import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { tableIcons } from "../tableicons";
import MaterialTable from "material-table";

const AssignedPatientsTable = ({ data }) => {
  // Doing this because redux-toolkit applies object.freeze() on data
  // and can't modify object
  const patientData = data?.map((o) => ({ ...o }));
  
  const actions = [
    {
        icon: tableIcons.DetailPanel,
        tooltip: "Details",
        onClick: (event, rowData) => {
          alert("haha");
        },
      },
    {
        icon: tableIcons.Add,
        tooltip: "Admit patient",
        onClick: (event, rowData) => {
          alert("haha");
        },
      },
      {
        icon: tableIcons.Filter,
        tooltip: "Prescribe",
        onClick: (event, rowData) => {
          alert("haha");
        },
      },
      {
        icon: tableIcons.Check,
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
  );
};

export default AssignedPatientsTable;
