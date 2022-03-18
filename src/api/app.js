import Axios from 'axios'
const api = "/api/app";
export default {
  async save(data) {
    let url = api+'/updateApp';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },
  async getApp() {
    let url = api+'/getApp';
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },
}
