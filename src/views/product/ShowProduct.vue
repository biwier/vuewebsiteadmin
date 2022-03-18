<template>
  <div id="product">
    <el-card style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/product/list'}">产品列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改产品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card style="padding-left: 20px;padding-right: 20px;margin-bottom: 5px">
      <el-form ref="form" :model="productData" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="productData.productName" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="产品类别">
          <el-select v-model="productData.productClassName" placeholder="请选择产品类型" :disabled="!isEdit">
            <el-option
              v-for="item in productClassOption"
              :key="item.name"
              :label="item.name"
              :value="item.name">
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
            :closable="isEdit"
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
          <el-button v-else class="button-new-tag" size="small" @click="showKeywordsInput" :disabled="!isEdit">+ New Keyword</el-button>
        </el-form-item>
        <el-form-item label="功能类型">
          <el-select v-model="productData.functionId" multiple placeholder="请选择" :disabled="!isEdit" style="width: 100%;">
            <el-option
              v-for="item in functionOption"
              :key="item.id"
              :label="item.functionClassName"
              :value="item.id"
              >
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
              :closable="isEdit"
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
            <el-button v-else class="button-new-tag" size="medium" :disabled="!isEdit" @click="showInput">+ New Attr</el-button>
          </el-card>
        </el-form-item>
        <el-form-item label="产品描述">
          <editor
            @getValue="getContent"
            v-model="productData.detail"
          >
          </editor>
        </el-form-item>
        <el-alert
          title="该字段用于详情页面mate的描述"
          type="info">
        </el-alert>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="productData.mainDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="!isEdit">确定</el-button>
          <el-button type="warning" @click="isEdit=true">修改</el-button>
          <el-button @click="$router.back()">返回</el-button>
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
        isEdit:false,
        productData:{
          productName:"",
          productClassName:"",
          pic:"",
          functionClassId:"",
          keywords:"",
          attribute:"",
          detail:'',
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
        console.log(this.productData);
        // this.productData.functionId = this.functionIds;
        let res = await Product.saveProduct(this.productData);
        if (res.code === 0){
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
        }else if (res.code === 1){
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'warning'
          });
        } else {
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
      },
      async getProduct(){
        let _this = this;
        const id = _this.$route.params && _this.$route.params.id;
        let res =  await Product.getProduct(id);
        if (res.code ===0){
          _this.productData = res.msg;
            console.log(_this.productData);
          _this.functionIds = res.msg.functionId;
          _this.keywordsTags = _this.productData.keywords.split("&");
          _this.attributeTages = _this.productData.attribute.split(",");
          console.log(_this.attributeTages)
        } else {
          _this.$message.error(res.msg)
        }
      }

    },
    created(){
      this.getOptions();
      this.getProduct()
    },
    components:{
      Editor,Upload
    },
    watch:{
      keywordsTags :function (val) {
        this.productData.keywords = "";
        val.forEach( v => {
          this.productData.keywords += '&'+v;
        });
        this.productData.keywords = this.productData.keywords.substr(1,this.productData.keywords.length+1)
      },
      attributeTages :function (val) {
        this.productData.attribute = "";
        val.forEach( v => {
          this.productData.attribute += ','+v;
        });
        this.productData.attribute = this.productData.attribute.substr(1,this.productData.attribute.length+1)
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
