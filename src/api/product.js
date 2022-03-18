import Axios from 'axios'


const api = '/api/product';
export default {

  async getList(data) {
    let url = api+'/getList';
    return new Promise(resolve => {
      console.log(JSON.stringify(data));
      Axios.get(url,{params:data}).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },
  async getProduct(data) {
    let url = api+'/getProduct?id='+data;
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
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

  async saveProduct(data) {
    let url = api+'/saveProduct';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },




}
