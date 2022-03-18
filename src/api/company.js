import Axios from 'axios'

const api = "/api/companyInfo";

export default {



  getCompanyInfo(){
    let url = api+'/getCompany';
    return new Promise(resolve => {
      Axios.get(url).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },

  saveCompanyInfo(data){
    let url = api+'/saveCompany';
    return new Promise(resolve => {
      Axios.post(url,data).then(response=>{
        if (response.status ===200){
          resolve(response.data)
        }
      })
    })
  },
}
