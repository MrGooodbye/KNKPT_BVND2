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

const createAddPredecessor = async (dataPredecessor) => {
    const token = localStorage.getItem("jwt");
    return await axios.post(`${backendURL}/api/Medical/AddPredecessor`, dataPredecessor,
        {
            headers: {
                "content-type": "application/json",
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

const createAddMedicalBook = async (dataMedicalBook) => {
    const token = localStorage.getItem("jwt");
    return await axios.post(`${backendURL}/api/Medical/AddMedicalBook`, dataMedicalBook,
        {
            headers: {
                "content-type": "application/json",
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

const getListMedicalExaminationsGiveOldRegister = async (dayOfBirth, patientId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetExaminationsGiveRegister?dayOfBirth=${dayOfBirth}&patientId=${patientId}`, config)
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

const getMedicalDetailPatient = async (id) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/DetailPatient/${id}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getMedicalBook = async (medicalRegisterId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetMediacalBook?medicalRegisterId=${medicalRegisterId}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response
    })
}

const getUpdatePredecessor = async (patientId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetUpdatePredecessor/${patientId}`, config)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

const getUpdateMedicalBook = async (medicalBookId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetUpdateMedicalBook/${medicalBookId}`, config)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

const getAppointmentDate = async (medicalRegisterId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetAppointmentDate/${medicalRegisterId}`, config)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

const getAppointmentsNextWeek = async () => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetAppointmentsNextWeek`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getAppointmentsToday = async () => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Medical/GetAppointmentsToday`, config)
    .then(function (response) {
        return response.data
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

const updateMedicalState = async (id, state) => {
    const token = localStorage.getItem("jwt");
    return await axios.put(`${backendURL}/api/Medical/UpdateState?id=${id}&state=${state}`, {}, {
        headers: {
            "content-type": "text/plain; charset=utf-8",
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

const updateStateAppointment = async (dataAppointment, stateAppointment) => {
    const token = localStorage.getItem("jwt");
    return await axios.put(`${backendURL}/api/Medical/UpdateStateAppointment/${dataAppointment.medicalBookId}?appointmentDate=${dataAppointment.appointmentDate}&stateAppointment=${stateAppointment}`, {}, {
        headers: {
            "content-type": "text/plain; charset=utf-8",
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

const deleteMedicalBook = async (medicalBookId) => {
    const config = createConfig();
    return await axios.delete(`${backendURL}/api/Medical/DeleteMedicalBook/${medicalBookId}`, config)
    .then(function (response) {
        return response
    })
    .catch(function (error) {
        return error.response
    })
}

export {
    createMedicalRegister, createMedicalBackRegister, createCurrentDoctorExamining, createAddPredecessor, createAddMedicalBook,
    getRegistersByDateNow, getListMedicalExaminationsGiveRegister, getListMedicalExaminationsGiveOldRegister, getListOldDisease, getVaccinationByPatientId, getCurrentDoctorExamining, getMedicalDetailPatient, getMedicalBook, getUpdatePredecessor, getUpdateMedicalBook, getAppointmentDate, getAppointmentsNextWeek, getAppointmentsToday,
    updateMedicalRegister, updateMedicalState, updateStateAppointment,
    deleteMedicalBook
}