import globalAxios from '../../axios/index'


const fetchReceptionistStats = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await globalAxios.get('receptionists/stats/', config);

  return response.data;
};

const fetchClinicianStats = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await globalAxios.get('medics/stats/', config);

  return response.data;
}

const statService = {
  fetchReceptionistStats,
  fetchClinicianStats,
};

export default statService;
