<template>
  <div>
  <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
      <div style="display: inline;float: right;margin-right: 10px">
        <el-button @click="addMessage" style="border-radius: 24px;">新增留言</el-button>
      </div>
    </el-row>
  <el-card>
    <hr>
    <el-table
      :data="messageData"
      style="width: 100%">
      <el-table-column
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.createDatetime | FormatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新日期"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.createDatetime | FormatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        label="处理状态"
        width="200">
        <template slot-scope="scope">
          <span v-show="scope.row.status===0||scope.row.status===null" style="font-weight: 600;color: #0a76a4">{{scope.row.status| StatusFilter}}</span>
          <span v-show="scope.row.status===1" style="font-weight: 600;color:#9bbf3c">{{scope.row.status| StatusFilter}}</span>
          <span v-show="scope.row.status===2" style="font-weight: 600;color: #a40919">{{scope.row.status| StatusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="message"
        label="留言内容"
        width="280">
      </el-table-column>
      <el-table-column
        prop="response"
        label="回复内容"
        width="280">
      </el-table-column>

      <el-table-column
        label="操作"
        fixed="right"
        width="200"
        align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteMessage(scope.row.id)">删除</el-button>
          <el-button type="primary" @click="auditMessage(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width:100%;position: fixed;bottom: 0;background-color:white;z-index: 999">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchDTO.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="searchDTO.rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchDTO.total">
    </el-pagination>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="messageVisible"
      width="50%"
      align="center">
      <el-form :model="messageForm">
        <el-form-item label="姓名" label-width="10%">
          <el-input v-model="messageForm.name" style="width: 80%" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="电话"  label-width="10%">
          <el-input v-model="messageForm.phone" style="width: 80%" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  label-width="10%">
          <el-input v-model="messageForm.email" style="width: 80%" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="留言信息"  label-width="10%">
          <el-input type="textarea" v-model="messageForm.message" style="width: 80%" :disabled="!isEdit"></el-input>
        </el-form-item>
        <div v-show="isAudit">
          <hr style="margin-bottom: 20px">
          <el-form-item label="回复信息"  label-width="10%">
            <el-input type="textarea" v-model="messageForm.response" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="审核状态"  label-width="10%">
            <el-select v-model="messageForm.status" placeholder="请选择您的审核结果" style="width: 80%">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
            <el-button type="primary" @click="submitMessage">确认</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </el-card>
  </div>
</template>

<script>
  import moment from 'moment'
  import Message from '../../api/message.js'
    export default {
        name: "index",
      data(){
          return{
            title:'',
            messageData:[],
            searchDTO:{
              page:1,
              rows:10,
              total:0
            },
            isEdit:false,
            isAudit:false,
            messageVisible:false,
            messageForm:{},
            options:[
              {
                code:0,
                value:'待审核'
              },
              {
                code:1,
                value:'审核通过'
              },
              {
                code:2,
                value:'审核未通过'
              }
            ]
          }
      },
      methods:{
         async getList(){
            let res = await Message.getList(this.searchDTO);
            this.messageData = res.result;
            this.searchDTO.total = res.total;
          },
        handleSizeChange(val){
           this.searchDTO.rows = val;
           this.getList();
        },
        handleCurrentChange(val){
           this.searchDTO.page = val;
           this.getList();
        },
        auditMessage(data){
           this.title = "审核留言";
           this.isAudit = true;
           this.isEdit = false;
           this.messageVisible = true;
           this.messageForm = data;
        },
        addMessage(){
          this.title = "新增留言";
          this.isEdit = true;
          this.isAudit = false;
          this.messageVisible = true;
        },
        cancel(){
          this.messageForm = {};
           this.messageVisible = false;
        },
        async submitMessage(){
           let res = await Message.save(this.messageForm);
           if (res.code===0){
             this.$notify.success(res.msg)
             this.messageVisible = false
             this.getList();
           } else {
             this.$notify.error(res.msg)
           }
        },
        deleteMessage(data){
          this.$confirm('此操作将删除当前留言, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'

        }).then(async ()=>{
            let res = await Message.delete(data);
            if (res.code===0){
              this.$notify.success("删除成功")
              this.getList();
            }else {
              this.$notify.error(res.msg);
            }
          }).catch(()=>{

          })
        }
      },
      mounted(){
          this.getList();
      },
      filters:{
          StatusFilter:function (val) {
            if (val===1){
              return "审核通过"
            } else if (val===2){
              return "审核未通过"
            } else {
              return "待审核"
            }
          },
          FormatDate:(date) => {
            return moment(date).format("YYYY年MM月DD日 HH时mm分ss秒")
          }
      }
    }
</script>

<style scoped>
  .pass{
    color: #3a835d;
  }
  .fail{
    color:red;
  }
  .wait{
    color: #0a76a4;
  }
</style>
