<template>
    <div>
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>功能分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
        <el-select v-model="searchDTO.classCode" placeholder="请选择功能类型类别" style="margin-left: 10px">
          <el-option
            v-for="item in options"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <el-button type="normal" @click="getList"><i class="el-icon-search"></i></el-button>
        <div style="display: inline;float: right;margin-right: 10px">
          <el-button @click="addDialogVisible = true" style="border-radius: 24px;">添加功能</el-button>
        </div>
      </el-row>
      <el-card style="position: relative">
        <el-dialog
          title="新增功能类型"
          :visible.sync="addDialogVisible"
          width="60%">
          <el-form ref="form" :model="defaultData" label-width="80px">
            <el-form-item label="功能名称">
              <el-input v-model="defaultData.functionClassName"></el-input>
            </el-form-item>
            <el-form-item label="英文名称">
              <el-input v-model="defaultData.englishName"></el-input>
            </el-form-item>
            <el-form-item label="产品名称">
              <el-input v-model="defaultData.productName"></el-input>
            </el-form-item>
            <el-alert
              title="此处如果是基础功能，则为移动端显示图标；如果为特殊功能，则为移动端详情图片"
              type="warning">
            </el-alert>
            <el-form-item label="图标图片">
              <template>
                <upload v-model="defaultData.iconPc"></upload>
              </template>
            </el-form-item>
            <el-alert
              title="此处如果是基础功能，则为移动端详情图片；如果为特殊功能，则为pc的banner图"
              type="warning">
            </el-alert>
            <el-form-item label="Banner图片">
              <template>
                <upload v-model="defaultData.icon"></upload>
              </template>
            </el-form-item>
            <el-alert
              title="此处如果是基础功能，则为PC的显示图标；如果为特殊功能，则为pc的功能图片"
              type="warning">
            </el-alert>
            <el-form-item label="功能图片">
              <template>
                <upload v-model="defaultData.pic"></upload>
              </template>
            </el-form-item>
            <el-form-item label="功能描述">
              <el-input type="textarea" v-model="defaultData.description" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitData(defaultData)">确认</el-button>
              <el-button type="info" @click="addDialogVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-pagination
          class="page"
          small
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
        <div v-loading="loading" v-for="item in tableList">
          <div class="el-col-4" style="margin: 10px">
            <el-card :body-style="{ padding: '0px'}" shadow="hover">
              <img :src="item.pic" class="image" height="200" width="200px">
              <div style="padding: 14px;">
                <span>{{item.functionClassName}}</span>
                <el-button type="text" @click="deleteFunction(item.id)"><i class="el-icon-delete"></i></el-button>
                <div class="bottom clearfix">
                  <time class="time">{{ item.updateDatetime.split('T')[0] }}</time>
                  <el-button type="text" class="button" @click="getFunctionDesc(item)">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </div>
          <el-dialog
            title="功能详情"
            :visible.sync="dialogVisible"
            width="60%">
            <el-form ref="form" :model="functionDesc" label-width="80px">
              <el-form-item label="功能名称">
                <el-input v-model="functionDesc.functionClassName" :disabled="!isEdit"></el-input>
              </el-form-item>
              <el-form-item label="系列名称">
                <el-input v-model="functionDesc.englishName" :disabled="!isEdit"></el-input>
              </el-form-item>
              <el-form-item label="产品名称">
                <el-input v-model="functionDesc.productName" :disabled="!isEdit"></el-input>
              </el-form-item>
              <el-form-item label="功能类型">
                <el-radio-group v-model="functionDesc.classCode" :disabled="!isEdit">
                  <el-radio :label="0">基本功能</el-radio>
                  <el-radio :label="1">特有功能</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-alert
                title="此处如果是基础功能，则为移动端显示图标；如果为特殊功能，则为移动端详情图片"
                type="warning">
              </el-alert>
              <el-form-item label="图标图片">
                <template>
                  <upload v-model="functionDesc.iconPc"></upload>
                </template>
              </el-form-item>
              <el-alert
                title="此处如果是基础功能，则为移动端详情图片；如果为特殊功能，则为pc的banner图"
                type="warning">
              </el-alert>
              <el-form-item label="Banner图片">
                <template>
                  <upload v-model="functionDesc.icon"></upload>
                </template>
              </el-form-item>
              <el-alert
                title="此处如果是基础功能，则为PC的显示图标；如果为特殊功能，则为pc的功能图片"
                type="warning">
              </el-alert>
              <el-form-item label="功能图片">
                <template>
                  <upload v-model="functionDesc.pic"></upload>
                </template>
              </el-form-item>
              <el-form-item label="功能描述">
                <el-input type="textarea" v-model="functionDesc.description" :disabled="!isEdit"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="isEdit=!isEdit">编辑</el-button>
                <el-button type="success" :disabled="!isEdit" @click="submitData(functionDesc)">确认</el-button>
                <el-button type="info" @click="dialogVisible=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>

      </el-card>
    </div>

</template>

<script>
    import Function from '../../api/functionClass.js'
    import Upload from '../../components/Layout/Upload.vue'
    export default {
      name: "FunctionList",
      data(){
          return{
            loading:false,
            addDialogVisible:false,
            isEdit:false,
            total:undefined,
            dialogVisible:false,
             searchDTO:{
               page:1,
               rows:10,
               classCode:""
             } ,
            tableList:[],
            functionDesc:{},
            defaultData:{
              functionClassName:'',
              englishName:'',
              pic:'',
              description:'',
              productName:'',
              icon:'',
              iconPc:''
            },
            deleteIds:[],
            options:[
              {
                name:"特有功能",
                code:1
              },
              {
                name:"基本功能",
                code:0
              }
            ]
          }
      },
      methods:{
        async getList(){
          this.loading = true;
          let res = await Function.getClassList(this.searchDTO);
          this.tableList = res.result;
          console.log(this.tableList);
          this.total = res.total;
          this.loading = false;
        },
        getFunctionDesc(data){
          this.dialogVisible = true;
          this.functionDesc = data;
        },
        async submitData(data){
          let res = await Function.saveFunctionClass(data);
          if (res.code===0){
            this.$notify.success("操作成功");
            this.dialogVisible = false;
            this.addDialogVisible = false;
            this.isEdit = false;
            this.defaultData = {};
            this.getList();
          } else {
            this.$notify.error(res.msg)
          }
        },
        handleCurrentChange(val){
          this.searchDTO.page = val;
          this.getList();
        },
        deleteFunction(data){
           this.deleteIds.push(data);
           this.$confirm('此操作将删除该功能类型, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
           }).then(async ()=>{
             let res = await Function.deleteFunctionClass(this.deleteIds);
             if (res.code===0){
               this.$notify.success("删除成功");
               this.getList();
             } else {
               this.$notify.error(res.msg);
             }
           }).catch(()=>{

           });
        }
      },
      created(){
          this.getList();
      },
      components:{
          Upload
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .page{
    text-align: center;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    background-color: gainsboro
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
