import { tableIcons } from "../tableicons";
import MaterialTable from "material-table";

const RegisteredPatientsTable = ({ data }) => {
  const patientData = data.map((o) => ({ ...o }));

  const columns = [
    { title: "Patient Number", field: "patient_number" },
    { title: "Patient Name", field: "patient_name" },
    { title: "Address", field: "address" },
  ];

  const actions=[
    {
      icon: tableIcons.Edit,
      tooltip: 'Modify patient data',
      onClick: (event, rowData) => alert("You saved " + rowData.patient_name)
    },
    {
        icon: tableIcons.Send,
        tooltip: 'Refer patient',
        onClick: (event, rowData) => alert("You saved " + rowData.patient_name)
      },
    {
      icon: tableIcons.DetailPanel,
      tooltip: 'View more',
      onClick: (event, rowData) => confirm("You want to delete " + rowData.name)
    }
  ]

  return (
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
            draggable: true
        }}
      />
    </div>
  );
};

export default RegisteredPatientsTable;
