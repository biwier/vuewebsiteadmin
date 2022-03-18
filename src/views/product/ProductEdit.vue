<template>
  <div id="product">
    <el-card style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/product/list' }">产品列表</el-breadcrumb-item>
        <el-breadcrumb-item>新增产品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card style="padding-left: 20px;padding-right: 20px;margin-bottom: 5px">
      <el-form ref="form" :model="productData" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="productData.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品类别">
          <el-select v-model="productData.productClassId" placeholder="请选择产品类型">
            <el-option
              v-for="item in productClassOption"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片详情">
          <template>
            <upload v-model="productData.pic"></upload>
          </template>
        </el-form-item>
        <el-form-item label="产品长图">
          <template>
            <upload v-model="productData.longPic"></upload>
          </template>
        </el-form-item>
        <el-form-item label="关键词">
          <div v-show="showKeyEdit">
            <label>修改为:</label>
            <el-input v-model="changeData.changeValue" size="small" style="width: 400px;" ></el-input>
            <el-button size="small" type="info" @click="submitChangeKey">确定</el-button>
          </div>
          <el-tag
            :key="tag"
            v-for="(tag,index) in keywordsTags"
            @click="editKeyword(tag,index)"
            closable
            :disable-transitions="false"
            @close="handleKeywordsClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="keywordsInputVisible"
            v-model="inputKeywordsValue"
            ref="saveKeywordsTagInput"
            size="small"
            @keyup.enter.native="handleKeywordsInputConfirm"
            @blur="handleKeywordsInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showKeywordsInput">+ New Keyword</el-button>
        </el-form-item>
        <el-form-item label="功能类型">
          <el-select v-model="productData.functionId"  multiple placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in functionOption"
              :key="item.id"
              :label="item.functionClassName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品属性">
          <el-card>
            <el-alert
              title="请以key：value的形式输入产品的每个属性;点击某个属性可对其进行修改"
              type="info">
            </el-alert>
            <div v-show="showAttrEdit">
              <label>修改为:</label>
              <el-input v-model="changeAttrData.changeValue" size="small" style="width: 1000px;" ></el-input>
              <el-button size="small" type="info" @click="submitChangeAttr">确定</el-button>
            </div>
            <el-tag
              :key="tag"
              v-for="(tag,index) in attributeTages"
              @click="editAttr(tag,index)"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="medium"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="medium" @click="showInput">+ New Attr</el-button>
          </el-card>
        </el-form-item>
        <el-form-item label="产品描述">
          <editor
            :value="productData.detail"
            @getValue="getContent"
          >
          </editor>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="productData.mainDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import Editor from '../../components/Layout/Editor.vue'
  import Upload from '../../components/Layout/Upload.vue'
  import ProductClass from '../../api/productClass.js'
  import FunctionClass from '../../api/functionClass.js'
  import Product from '../../api/product.js'
  export default {
    data(){
      return{
        showKeyEdit:false,
        changeData:{
          changeValue:"",
          changeIndex:""
        },
        showAttrEdit:false,
        changeAttrData:{
          changeValue:"",
          changeIndex:""
        },
        loading:false,
        productData:{
          productName:"",
          productClassId:"",
          pic:"",
          longPic:'',
          functionClassId:"",
          keywords:"",
          attribute:"",
          detail:'',
          mainDescription:"",
          functionId:[]
        },
        keywordsTags: [],
        attributeTages:[],
        inputVisible: false,
        keywordsInputVisible:false,
        inputValue: '',
        inputKeywordsValue:'',
        productClassOption:[],
        functionOption:[],

      }
    },
    methods: {
      handleClose(tag) {
        this.attributeTages.splice(this.attributeTages.indexOf(tag), 1);
      },
      handleKeywordsClose(tag) {
        this.keywordsTags.splice(this.keywordsTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      showKeywordsInput(){
        this.keywordsInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveKeywordsTagInput.$refs.input.focus();
        });
      },
      editKeyword(tag,index){
        this.showKeyEdit = true;
        this.changeData.changeValue = tag;
        this.changeData.changeIndex = index;
      },
      submitChangeKey(){
        console.log(this.keywordsTags[this.changeData.changeIndex]);
        this.keywordsTags[this.changeData.changeIndex] = this.changeData.changeValue;
        this.changeData = {
          changeValue:"",
          changeIndex:""
        };
        this.showKeyEdit = false;
      },
      editAttr(tag,index){
        this.showAttrEdit = true;
        this.changeAttrData.changeValue = tag;
        this.changeAttrData.changeIndex = index;
      },
      submitChangeAttr(){
        this.attributeTages[this.changeAttrData.changeIndex] = this.changeAttrData.changeValue;
        this.changeAttrData = {
          changeValue:"",
          changeIndex:""
        };
        this.showAttrEdit = false;
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.attributeTages.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
        console.log("attributeTages:",this.attributeTages)
      },
      handleKeywordsInputConfirm() {
        let inputKeywordsValue = this.inputKeywordsValue;
        if (inputKeywordsValue) {
          this.keywordsTags.push(inputKeywordsValue);
        }
        this.keywordsInputVisible = false;
        this.inputKeywordsValue = '';
        console.log("keywordsTags:",this.keywordsTags)
      },
      async onSubmit(){
        this.loading = true;
        console.log(this.productData);
        let res = await Product.saveProduct(this.productData);
        if (res.code === 0){
          this.loading = false;
          this.$notify({
            title: '成功',
            message: '新增成功',
            type: 'success'
          });
          this.$router.push("/product/list");
        }else if (res.code === 1){
          this.loading = false;
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'warning'
          });
        } else {
          this.loading = false;
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error'
          });
        }
      },
      getContent(val){
        this.productData.detail = val;
      },
      async getOptions(){
        let res = await ProductClass.getList();
        this.productClassOption = res;
        this.functionOption = await FunctionClass.getList();
      }
    },
    created(){
      this.getOptions()
    },
    components:{
      Editor,Upload
    },
    watch:{
      keywordsTags :function (val) {
        console.log(val)
        this.productData.keywords = "";
        val.forEach( v => {
          this.productData.keywords += '&'+v;
        });
        this.productData.keywords = this.productData.keywords.substr(1,this.productData.keywords.length+1)
      },
      attributeTages :function (val) {
        console.log(val)
        this.productData.attribute = "";
        val.forEach( v => {
          this.productData.attribute += ','+v;
        })
      },
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
