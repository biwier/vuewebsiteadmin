<template>
    <div>
      <el-card style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item  :to="{path: '/news/list'}">新闻列表</el-breadcrumb-item>
          <el-breadcrumb-item>新增新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <el-card style="padding-left: 20px;padding-right: 20px;margin-bottom: 5px">
        <el-form ref="newsForm" :model="newsForm" >
          <el-form-item label="新闻标题">
            <el-input v-model="newsForm.newsTitle" style="width:80%" :disabled="!isEdit"></el-input>
          </el-form-item>
          <el-form-item label="关键词">
            <el-tag
              :key="tag"
              v-for="tag in keywordsTags"
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
          <el-form-item label="描述:">
            <el-input type="textarea" v-model="newsForm.description" :disabled="!isEdit"></el-input>
          </el-form-item>
          <el-form-item label="新闻类别">
            <el-select v-model="newsForm.newsClassId" placeholder="请选择新闻类别" :disabled="!isEdit">
               <el-option
                 v-for="item in newsClassOption"
                 :key="item.id"
                 :value="item.id"
                 :label="item.newsClassName">
               </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新闻图片">
            <template>
              <upload v-model="newsForm.pic"></upload>
            </template>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="作者名称">
                <el-input style="width: 200px" placeholder="输入作者名称" v-model="newsForm.author" :disabled="!isEdit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker type="date" placeholder="选择时间" v-model="newsForm.updateDatetime" :disabled="!isEdit"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="访问人数">
                <el-input-number v-model="newsForm.visitNum" :disabled="!isEdit" ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <label>正文</label>
            <editor
              :value="newsForm.content"
              @getValue="getContent"
            >
            </editor>
          </el-form-item>
          <el-form-item>
            <template>
              <el-button type="info" style="float: right;margin-left: 5px" @click="isEdit=!isEdit" >编辑</el-button>
              <el-button type="success" style="float: right;" :disabled="!isEdit" @click="submitData">确认</el-button>
            </template>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
   const defaultForm = {
     id:undefined,
     newsTitle:'',
     author:'',
     url:'',
     visitNum:'',
     keywords:'',
     description:'',
     content:'',
     newsClassId:''
   };
   import Editor from '../../../components/Layout/Editor.vue'
   import Upload from '../../../components/Layout/Upload.vue'
   import NewsClass from '../../../api/newsClass.js'
   import News from '../../../api/news.js'
    export default {
      props: {
        isEdit: {
          type: Boolean,
          default: false
        }
      },
        name: "NewsDetail",
      data(){
          return{
            keywordsInputVisible:false,
            newsForm:{},
            newsClassOption:[],
            keywordsTags:[],
            inputKeywordsValue:''
          }
      },
      methods:{
        getContent(val){
          this.newsForm.content = val;
        },
        showKeywordsInput(){
          this.keywordsInputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveKeywordsTagInput.$refs.input.focus();
          });
        },
        handleKeywordsClose(tag) {
          this.keywordsTags.splice(this.keywordsTags.indexOf(tag), 1);
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
        async getNewsClassOption(){
          this.newsClassOption = await NewsClass.getList();
        },
        async getNews(data){
          let res = await News.get(data);
          if (res.code ===0){
            this.newsForm = res.msg;
            this.keywordsTags = this.newsForm.keywords.split('&');
          } else{
            this.$message.error(res.msg);
          }
        },
        async submitData(){
          let res = await News.save(this.newsForm);
          console.log(res);
          if (res.code===0){
            this.$notify.success(res.msg);
            this.$router.push("/news/list");
          } else {
            this.$notify.error(res.msg)
          }
        }
      },
      components:{
        Editor,Upload
      },
      watch: {
        keywordsTags: function (val) {
          this.newsForm.keywords = "";
          val.forEach(v => {
            this.newsForm.keywords += '&' + v;
          });
          this.newsForm.keywords = this.newsForm.keywords.substr(1, this.newsForm.keywords.length + 1)
        },
      },
      mounted(){
        this.getNewsClassOption();
      },
      created(){
        if (!this.isEdit) {
          const id = this.$route.params && this.$route.params.id;
          this.getNews(id);
        } else {
          this.newsForm = Object.assign({}, defaultForm)
        }
      },
    }
</script>

<style scoped>
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
