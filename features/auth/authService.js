import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/auth/";

const login = async (userData) => {
  const response = await axios.post(API_URL + "login/", userData);

  if (response.data) {
    localStorage.setItem("authDetails", JSON.stringify(response.data));
  }
  return response.data;
};

const verifyToken = async (token) => {
  try {
    const response = await axios.post(API_URL + "token/verify/", { token });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem("authDetails");
  localStorage.removeItem("currentPageUri");
};

const updateUser = async (accessToken, userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.patch(`${API_URL}user/`, userData, config);

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

const updatePassword = async (accessToken, newPassword) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${API_URL}password/change/`,
      newPassword,
      config
    );

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

const forgotPasswordRequest = async (email) => {
  try {
    const response = await axios.post(`${API_URL}password/reset/`, { email });

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

const passwordResetConfirm = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}password/reset/confirm/`,
      payload
    );

    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

const authService = {
  login,
  verifyToken,
  logout,
  updateUser,
  updatePassword,
  forgotPasswordRequest,
  passwordResetConfirm,
};

export default authService;
