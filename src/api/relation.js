import Axios from 'axios'
const api = "/api/relation";

export default {

  /**
   *   page ,rows,functionId
   * @returns {Promise<*>}
   */
  async getList() {
    let url = api+'/list';
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  /**
   *
   * @param produvtId, functionId
   * @returns {Promise<*>}
   */
  async save(data) {
    let url = api+'/save';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  async delete(data) {
    let url = api+'/delete';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  async get(data) {
    let url = api+'/showFunctions?productId='+data;
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },
}
