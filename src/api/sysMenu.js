import axios from 'axios'

export default {

  //增加菜单
  async addOrUpdateCategoryMenu(data){
    var api = '/api/sysMenu/save';
    return new Promise((resolve,reject)=>{
      axios.post(api,data).then(response=>{
        if (response.status===200){
          resolve(response.data)
        }else{
          resolve(this.failResult(response.data.reason))
        }
      }).catch(error=>{
        resolve(this.failResult("请求失败！"+error))
      })
    })
  },

  //删除菜单
 async deleteCategory(data){
    var api = "/api/sysMenu/delete?id="+data;
    return new Promise(resolve => {
      axios.get(api).then(response=>{
        if (response.status===200){
          resolve(response.data);
        }
      }).catch(error =>{

      })
    })
  },
  async getMenuList() {
    var api = '/api/sysMenu/list';
    return new Promise((resolve,reject) =>{
      axios.get(api).
      then(response =>{
        if (response.status === 200){
          resolve(response.data)
        }else{
          resolve({"status":false,"reason":response.data.reason})
        }
      }).catch(error=>{
        resolve({"status":false,"reason":"请求失败!"})
      })
    })
  },

  //返回失败结果
  failResult(msg){
    return {"status":false,"reason":msg};
  }


}
