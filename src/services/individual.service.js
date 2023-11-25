import http from "../http-common";

class IndividualDataService {
  getAll() {
    return http.get("/individuals");
  }

  get(id) {
    return http.get(`/individuals/${id}`);
  }

  create(data) {
    return http.post("/individuals", data);
  }

  update(id, data) {
    return http.put(`/individuals/${id}`, data);
  }

  delete(id) {
    return http.delete(`/individuals/${id}`);
  }

  deleteAll() {
    //return http.delete(`/individuals`);
    return;
  }

  findByName(name) {
    return http.get(`/individuals?name=${name}`);
  }
}

export default new IndividualDataService();
