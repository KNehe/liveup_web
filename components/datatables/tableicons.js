import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import More from "@material-ui/icons/DetailsOutlined";
import Send from "@material-ui/icons/Send";
import History from "@material-ui/icons/History";
import Details from "@material-ui/icons/Details";

const styles = {
  margin: "0",
  padding: "0",
  textDecoration: "underline",
  fontSize: "1rem",
  fontWeight: "700",
};

const AdmitIcon = () => {
  return <p style={styles}>Admit</p>;
};

const PrescribeIcon = () => {
  return <p style={styles}>Prescibe</p>;
};

const SatusIcon = () => {
  return <p style={styles}>Status✏️</p>;
};

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref}  />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Send: forwardRef((props, ref) => <Send {...props} ref={ref} />),
  More: forwardRef((props, ref) => <More {...props} ref={ref} />),
  History: forwardRef((props, ref) => <History {...props} ref={ref} />),
  Details: forwardRef((props, ref) => <Details {...props} ref={ref} />),
  Admit: AdmitIcon,
  Prescribe: PrescribeIcon,
  Satus: SatusIcon,
};

tableIcons.Add.displayName = 'Add'
tableIcons.Check.displayName = 'Check'
tableIcons.Clear.displayName = 'Clear'
tableIcons.Delete.displayName = 'Delete'
tableIcons.DetailPanel.displayName = 'DetailPanel'
tableIcons.Edit.displayName = 'Edit'
tableIcons.Export.displayName = 'Export'
tableIcons.Filter.displayName = 'Filter'
tableIcons.FirstPage.displayName = 'FirstPage'
tableIcons.LastPage.displayName = 'LastPage'
tableIcons.NextPage.displayName = 'NextPage'
tableIcons.PreviousPage.displayName = 'PreviousPage'
tableIcons.ResetSearch.displayName = 'ResetSearch'
tableIcons.Search.displayName = 'Search'

tableIcons.SortArrow.displayName = 'SortArrow'
tableIcons.ThirdStateCheck.displayName = 'ThirdStateCheck'
tableIcons.ViewColumn.displayName = 'ViewColumn'
tableIcons.Send.displayName = 'Send'

tableIcons.More.displayName = 'More'
tableIcons.History.displayName = 'History'
tableIcons.Details.displayName = 'Details'


export { tableIcons };
