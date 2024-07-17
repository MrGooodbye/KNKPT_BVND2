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

const createMedicalRegister = async (dataPatientsRegister) => {
    const token = localStorage.getItem("jwt");
    return await axios.post(`${backendURL}/api/Medical/Register`, dataPatientsRegister, {
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

const createMedicalBackRegister = async (dataPatientsRegister) => {
    const token = localStorage.getItem("jwt");
    return await axios.post(`${backendURL}/api/Medical/BackRegister`, dataPatientsRegister, {
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

const createCurrentDoctorExamining = async (userIdDoctor) => {
    const token = localStorage.getItem("jwt");
    return await axios.post(`${backendURL}/api/Medical/SetDoctorExaming/${userIdDoctor}`, 
        {}, // Body của request, có thể là {} hoặc object
        {
            headers: {
                "content-type": "text/plain; charset=utf-8",
                Authorization: `Bearer ${token}`,
            },
        }
    )
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

const getRegistersByDateNow = async () => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetRegistersByDateNow`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getListMedicalExaminationsGiveRegister = async (dayOfBirth) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetExaminationsGiveRegister?dayOfBirth=${dayOfBirth}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getListOldDisease = async (patientId, phone, fullName, dayOfBirth, gender) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/SearchPatients?patientId=${patientId}&phone=${phone}&fullName=${fullName}&dayOfBirth=${dayOfBirth}&gender=${gender}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getVaccinationByPatientId = async (patientId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetVaccinationByPatientId/${patientId}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getCurrentDoctorExamining = async () => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetDoctorExamining`, config)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response.status
    })
}

const updateMedicalRegister = async (dataPatientsRegister) => {
    const token = localStorage.getItem("jwt");
    return await axios.put(`${backendURL}/api/Medical/EditRegister`, dataPatientsRegister, {
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
    createMedicalRegister, createMedicalBackRegister, createCurrentDoctorExamining,
    getRegistersByDateNow, getListMedicalExaminationsGiveRegister, getListOldDisease, getVaccinationByPatientId, getCurrentDoctorExamining,
    updateMedicalRegister
}