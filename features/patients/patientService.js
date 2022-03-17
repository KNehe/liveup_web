import axios from "axios";
import globalAxios, { CURRENT_API_URL } from "../../axios/index";
import userService from "../users/userService";

const API_URL = CURRENT_API_URL;

const getPatientsAssignedToClinician = async (url, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const api_url = url ? url : API_URL + "assigned-patients/";

  const response = await axios.get(api_url, config);

  return response.data;
};

const getPatientsRegisteredByReceptionist = async (url, accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let api_url;
  if (url) {
    api_url = url;
  } else {
    api_url = API_URL + "receptionist-patients/";
  }
  const response = await axios.get(api_url, config);

  return response.data;
};

const updatePatientDetails = async (
  accessToken,
  patientUri,
  patientDetails
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.patch(patientUri, patientDetails, config);

  return response.data;
};

const registerPatient = async (accessToken, patientDetails) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.post(
    API_URL + "patients/",
    patientDetails,
    config
  );

  return response.data;
};

const deletePatient = async (accessToken, patient_uri) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios.delete(patient_uri, config);

  return response.data;
};

const getPatientData = async (url, accessToken) => {
  // url should be in the form http://127.0.0.1:8000/api/v1/patients/22/
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios.get(url, config);

  return response.data;
};

const aggregateAssignedPatientsData = async (url, accessToken) => {
  let data = await patientService.getPatientsAssignedToClinician(
    url,
    accessToken
  );

  for (const item of data.results) {
    const patient = await getPatientData(item.patient, accessToken);
    const created_by = await userService.getUserData(
      item.created_by,
      accessToken
    );
    // const doctor = await userService.getUserData(item.doctor, accessToken);

    if (item.updated_by) {
      const updated_by = await userService.getUserData(
        item.updated_by,
        accessToken
      );
      item["updated_by"] = updated_by;
    }

    item["patient"] = patient;
    // item["doctor"] = doctor;
    // item["patient_name"] = patient?.patient_name;
    // item["age"] = patient?.age;
    item["created_by"] = created_by;
  }

  return data;
};

const getPatientsByName = async (accessToken, patientName) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await globalAxios.get(
    `patients/by-name/?patient_name=${patientName}`,
    config
  );
  return response.data;
};

const patientService = {
  getPatientsAssignedToClinician,
  getPatientsRegisteredByReceptionist,
  updatePatientDetails,
  registerPatient,
  deletePatient,
  getPatientData,
  aggregateAssignedPatientsData,
  getPatientsByName,
};

export default patientService;
