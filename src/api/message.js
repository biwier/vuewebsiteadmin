import Axios from 'axios'
const api = "/api/message";

export default {

  async getList(data) {
    let url = api+'/getList';
    return new Promise(resolve => {
      Axios.get(url,{params:data}).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

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
    let url = api+'/delete?id='+data;
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  async get(data) {
    let url = api+'/get?id='+data;
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },
}
