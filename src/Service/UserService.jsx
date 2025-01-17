import axios from "axios";
//import SignalService from "./SignalService.jsx"

const backendURL = 'https://beknkpt2.dvtien.id.vn';

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

const userLogin = async (userName, password) => {
  return await axios.post(`${backendURL}/api/UserAccount/Login`, { userName, password })
  .then(function (response) {
    //SignalService.startSignalRConnection(response.data.tokenDTO.token)
      return response
  })
  .catch(function (error) {
    return error.response
  })
};

const addUser = async (dataAddUser) => {
  const token = localStorage.getItem("jwt");
  return await axios.post(`${backendURL}/api/UserAccount/AddUser`, dataAddUser, { 
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
  },
  })
  .then(function (response) {
    //SignalService.startSignalRConnection(response.data.tokenDTO.token)
      return response
  })
  .catch(function (error) {
    return error.response
  })
}

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

const updatePassword = async (inputPayloadPassword) => {
  const token = localStorage.getItem("jwt");
    return await axios.put(`${backendURL}/api/UserAccount/ChangePassword`, inputPayloadPassword, {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

const updateActiveUser = async (userId, isActive) => {
  const token = localStorage.getItem("jwt");
    return await axios.put(`${backendURL}/api/UserAccount/EditIsActiveUser?userId=${userId}&isActive=${isActive}`, {}, {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

const editUserLogin = async (dataUpdateUser) => {
  const token = localStorage.getItem("jwt");
  return await axios.put(`${backendURL}/api/UserAccount/EditUserLogin?`, dataUpdateUser, {
      headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
      },
  })
  .then(function (response) {
      return response
  })
  .catch(function (error) {
      return error.response
  })
}

const updateUserAccount = async (dataUpdateUser) => {
  const token = localStorage.getItem("jwt");
    return await axios.put(`${backendURL}/api/UserAccount/UpdateUserAccount?`, dataUpdateUser, {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

export {
    userLogin, addUser,
    getUserLogin, getGetListDoctor,
    updatePassword, updateActiveUser, editUserLogin, updateUserAccount
}
