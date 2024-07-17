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

const getListProvince = async () => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Administrative/ListProvince`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getListDistrict = async (provinceId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Administrative/GetListDistrictByIdProvince/${provinceId}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getListWard = async (districtId) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Administrative/GetListWardByIdDistrict/${districtId}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

const getFullAddressByIdWard = async (codeWard) => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/Administrative/GetFullAddressByIdWard/${codeWard}`, config)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        return error.response.status
    })
}

export {
    getListProvince, getListDistrict, getListWard, getFullAddressByIdWard
}