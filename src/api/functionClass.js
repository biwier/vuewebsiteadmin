import Axios from 'axios'

const api = "/api/functionClass";
export default {

  async getList() {
    let url = api+'/getOptionList';
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  async getClassList(data) {
    let url = api+'/getList';
    return new Promise(resolve => {
      Axios.get(url,{params:data}).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  async saveFunctionClass(data) {
    let url = api+'/saveFunctionClass';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  async deleteFunctionClass(data) {
    let url = api+'/delete';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },


}
