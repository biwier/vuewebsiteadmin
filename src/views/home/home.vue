<template>
    <div>
      <el-row :gutter="20"">
        <el-col :span="8">
          <div class="div_style">
            <div style="width: 20px"></div>
            <img src="@/assets/消息.png" style="width: 90px;height: 90px;display: inline-block;"/>
            <div style="position: absolute;line-height: 100px;height: 100px;right: 40px;top: 0;">
              <router-link :to="{path: '/message/list'}" style="font-size: 22px;color: #000;text-decoration: none">
                新留言
              </router-link>
              <span class="count_style" >{{messageNum}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="div_style">
            <div style="width: 20px"></div>
            <img src="@/assets/文章.png" style="width: 90px;height: 90px;display: inline-block;"/>
            <div style="position: absolute;line-height: 100px;height: 100px;right: 40px;top: 0;">
              <router-link :to="{path: '/news/list'}" style="font-size: 22px;color: #000;text-decoration: none">
                文章
              </router-link>
              <span class="count_style" >{{newsNum}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="div_style">
            <div style="width: 20px"></div>
            <img src="@/assets/产品.png" style="width: 90px;height: 90px;display: inline-block;"/>
            <div style="position: absolute;line-height: 100px;height: 100px;right: 40px;top: 0;">
              <router-link :to="{path: '/product/list'}" style="font-size: 22px;color: #000;text-decoration: none">
                产品
              </router-link>
              <span class="count_style" >{{productNum}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-card style="margin-left: 46px;margin-top: 5px">
            <div>
              <span>
                <router-link :to="{path: '/product/list'}" style="color: rgba(143,135,255,0.45);font-size: 20px;text-decoration: none">
                     最新产品
                </router-link>
              </span>
              <hr style="color: #ffffff"/>
              <ul style="list-style: none;padding-left: 0;font-size: 20px;" v-for="item in productList">
                <li style="margin-top: 2px;">
                  <div style="height: 60px;line-height: 60px">
                    <img :src="item.pic" style="width: 50px;height: auto;display: inline-block;"/>
                    <span style="position: absolute" >
                      <router-link :to="{path: '/product/edit/'+item.id}" style="text-decoration: none;color: #000;">
                        {{item.productName}}
                      </router-link>
                    </span>
                    <span style="float: right">{{item.updateDatetime.split('T')[0]}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card style="margin-left: 5px;margin-top: 5px;height: 240px">
            <div>
              <span>
                <router-link :to="{path: '/message/list'}" style="color: rgba(143,135,255,0.45);font-size: 20px;text-decoration: none">
                     最新留言
                </router-link>
              </span>
              <hr style="color: #ffffff"/>
              <ul style="list-style: none;padding-left: 0;font-size: 18px;" v-for="item in messageList">
                <li style="width:70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block">
                  {{item.message}}
                </li>
                <span style="float: right;position: absolute">{{item.createDatetime.split('T')[0]}}</span>

              </ul>
            </div>
          </el-card>
          <el-card style="margin-left: 5px;margin-top: 5px;height: 500px;">
            <div>
              <span>
                <router-link :to="{path: '/news/list'}" style="color: rgba(143,135,255,0.45);font-size: 20px;text-decoration: none">
                     最新文章
                </router-link>
              </span>
              <hr style="color: #ffffff"/>
              <ul style="list-style: none;padding-left: 0;font-size: 15px" v-for="item in newsList">
                <li style="width:96%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;display: inline-block;height: 20px;">
                  <router-link :to="{path: '/news/edit/'+item.id}" style="text-decoration: none;color: #000;">
                  {{item.newsTitle}}
                  </router-link>
                  <span style="float: right;">{{item.updateDatetime.split('T')[0]}}</span>
                </li>
              </ul>
            </div>
          </el-card>

        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Product from '../../api/product.js'
  import News from '../../api/news.js'
  import Message from '../../api/message.js'
    export default {
        name: "home",
      data(){
          return{
            searchDTO:{
              page:1,
              rows:10
            },
            newsNum:0,
            productNum:0,
            messageNum:0,
            newsList:[],
            productList:[],
            messageList:[]
          }
      },
      methods:{
          async getNewsList(){
            this.searchDTO={
              page:1,
              rows:11
            };
            let res =await News.getList(this.searchDTO);
            this.newsList = res.result;
            this.newsNum = res.total;
          },
        async getProductList(){
          this.searchDTO={
            page:1,
            rows:8,
            keyword:'',
            productClassName:''
          };
          let res = await Product.getList(this.searchDTO);
          this.productNum = res.total;
          this.productList = res.result;
        },
        async getMessageList(){
          this.searchDTO={
            page:1,
            rows:5
          };
          let res = await Message.getList(this.searchDTO);
          this.messageNum = res.total;
          this.messageList = res.result;
        }
      },
      mounted(){
          this.getNewsList();
          this.getProductList();
          this.getMessageList();

      }
    }
</script>

<style scoped>
  .count_style{
    font-size: 20px;
    background-color: rgb(245, 108, 108);
    color: white;
    padding: 1px 17px;
    border-radius: 10px;
  }
  .div_style{
    width: 300px;
    height: 100px;
    background-color: #b7c4bf;
    line-height: 100px;
    position: relative;
    display: flex;
    align-items: center;
    margin: 22px 10px 10px 30px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    overflow: hidden;

  }
</style>
