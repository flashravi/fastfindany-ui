import axios from "axios";

const localurl = "http://localhost:8080/api";
const ec2url = "http://18.218.53.124/api/";

export default axios.create({
  baseURL: ec2url,
  headers: {
    "Content-type": "application/json"
  }
});
