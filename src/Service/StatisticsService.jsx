import axios from "axios";

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

const getReportPatient = async (dateSelectedReport) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Admin/GetReportPatient?dateStart=${dateSelectedReport.dateStart}&dateEnd=${dateSelectedReport.dateEnd}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

export {
    getReportPatient
}