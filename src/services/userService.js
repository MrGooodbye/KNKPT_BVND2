import axios from "axios";
const registerNewUser = (data) => {
  let { email, userName, phone, password } = data;
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    userName,
    phone,
    password,
  });
};
const userLogin = (data) => {
  let { userName, password } = data;
  return axios.post("http://localhost:8080/api/v1/login", {
    userName,
    password,
  });
};
const fetchAllUsers = () => {
  return axios.get("http://localhost:8080/api/v1/user/read");
};
export { registerNewUser, userLogin, fetchAllUsers };
