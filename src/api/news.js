import Axios from 'axios'

const api = '/api/news';
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
  async get(data) {
    let url = api+'/getNews?id='+data;
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

  async save(data) {
    let url = api+'/saveNews';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  async updateTop(data){
    let url = api+'/updateTop';
    return new Promise(resolve => {
      Axios.get(url,{params:data}).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  }
}
