import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/";

const fetchReceptionistStats = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.get(`${API_URL}receptionists/stats/`, config);

  return response.data;
};

const statService = {
  fetchReceptionistStats,
};

export default statService;
