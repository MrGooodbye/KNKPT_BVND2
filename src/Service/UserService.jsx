import axios from "axios";

const backendURL = 'https://api-khamnhi.somee.com';

const createConfig = () => {
  const token = localStorage.getItem("jwt");
  // Thiết lập tiêu đề "Authorization" trong yêu cầu Axios
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

const userLogin = async (userId, password) => {
  return await axios.post(`${backendURL}/api/UserAccount/Login`, { userId, password })
  .then(function (response) {
      return response
  })
  .catch(function (error) {
    return error.response
  })
};

const getUserLogin = async () => {
  const config = createConfig();
  return await axios.get(`${backendURL}/api/UserAccount/GetUserLogin`, config)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error.response.status
  })
}

const getGetListDoctor = async () => {
  const config = createConfig();
  return await axios.get(`${backendURL}/api/UserAccount/GetDoctors`, config)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error.response.status
  })
}

export {
    userLogin, 
    getUserLogin, getGetListDoctor
}
