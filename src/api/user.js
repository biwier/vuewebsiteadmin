import Axios from 'axios'

export default {

  async login(data){
    let api = '/api/user/login';
    return new Promise((resolve,reject)=>{
      Axios.post(api,data).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }
      })
    })
  },
  async passLogin(){
    let api = '/api/user/login';
    return new Promise((resolve,reject)=>{
      Axios.get(api).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }
      })
    })
  },
  async loginout(){
    let api = '/api/user/loginOut';
    return new Promise((resolve,reject)=>{
      Axios.get(api).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }
      })
    })
  },

  async getUser(data){
    let api = '/api/user/getUser?userId='+data;
    return new Promise((resolve,reject)=>{
      Axios.get(api).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }
      })
    })
  },

  async getList(data){
    let api = '/api/user/getList';
    return new Promise((resolve,reject)=>{
      Axios.get(api,data).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }
      })
    })
  },

  async deleteUser(data){
    let api = '/api/user/deleteUser';
    return new Promise((resolve,reject)=>{
      Axios.post(api,data).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }
      })
    })
  },

  async saveUser(data){
    let api = '/api/user/saveUser';
    return new Promise((resolve,reject)=>{
      Axios.post(api,data).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }
      })
    })
  },

  async getUserByName(data){

  }


}
