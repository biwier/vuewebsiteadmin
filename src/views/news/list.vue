<template>
  <div>
    <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
        <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
      <el-input @blur="getList" v-model="searchDTO.keyword" placeholder="输入新闻标题" suffix-icon="el-icon-search" style="width: 200px;margin-left: 10px" ></el-input>
      <el-select v-model="searchDTO.newsClassId" placeholder="请选择新闻类别">
        <el-option
          v-for="item in newsClassOption"
          :key="item"
          :value="item.id"
          :label="item.newsClassName">
        </el-option>
      </el-select>
      <el-button type="normal" @click="getList"><i class="el-icon-search"></i></el-button>
      <div style="display: inline;float: right;margin-right: 10px">
        <router-link :to="'/news/add'">
          <el-button style="border-radius: 24px;margin-right: 5px;">添加新闻</el-button>
        </router-link>
        <el-button @click="deleteNews" style="border-radius: 24px;">批量删除</el-button>
      </div>
    </el-row>
    <el-card>
      <el-table
        :v-loading="listLoading"
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        border fit highlight-current-row
        @selection-change="handleSelectionChange"
        v-loading="listLoading">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="newsTitle"
          label="新闻标题"
          min-width="180">
        </el-table-column>
        <el-table-column
          align="center"
          label="新闻图片"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="height: 50px"/>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="作者"
          width="180"
          prop="author">
        </el-table-column>
        <el-table-column
         align="center"
         label="新闻类别"
         width="180">
          <template slot-scope="scope">
            <span>{{scope.row.newsClassId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="关键词" align="center" width="180">
          <template slot-scope="scope">
            <el-tag v-for="tag in (scope.row.keywords).split('&') " :key="scope.row" style="margin:1px">
              {{tag}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="访问人数"
          width="180"
          prop="visitNum">
        </el-table-column>
        <el-table-column
          align="center"
          label="是否置顶"
          width="180">
          <template slot-scope="scope">
            <el-button v-show="scope.row.top===0||scope.row.top===null" type="info" size="small" @click="toTop(scope.row)">置顶</el-button>
            <el-button v-show="scope.row.top===1" type="danger" size="small" @click="toTop(scope.row)">取消置顶</el-button>
          </template>

        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <router-link :to="'/news/edit/'+scope.row.id">
              <el-button type="primary" size="small">查看</el-button>
            </router-link>
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
          :total="total"
          >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import News from '../../api/news.js'
  import NewsClass from '../../api/newsClass.js'
  export default {
    name: "list",
    data(){
      return{
        list: null,
        total: 0,
        listLoading: false,
        searchDTO: {
          page: 1,
          rows: 10,
          keyword:'',
          newsClassId: undefined
        },
        news:{},
        multipleSelection: [],
        newsClassOption:[],
        topData:{
          id:'',
          top:'',
        }
      }
    },
    methods:{
      async getList(){
        this.listLoading = true;
        let res = await News.getList(this.searchDTO);
        this.total = res.total;
        this.list = res.result;
        this.listLoading = false;
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val){
        this.searchDTO.rows = val;

        this.getList();
      },
      handleCurrentChange(val){
        this.searchDTO.page = val;

        this.getList();
      },
      async getNewsClassOption(){
        this.newsClassOption = await NewsClass.getList();
      },
      async deleteNews(){
        let self = this;
        if (self.multipleSelection.length===0){
          self.$message.warning("请勾选至少一个新闻")
        } else {
          let deleteIds = [];
          self.multipleSelection.forEach(v => {
            deleteIds.push(v.id)
          });
          self.$confirm('此操作将删除这些新闻, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            News.delete(deleteIds).then(function (res) {
              if (res.code === 0) {
                self.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success'
                });
              }
              self.multipleSelection = [];
              self.getList();
            }).catch(() => {

            });
          });
        }
      },
      async toTop(data){
        this.topData.id = data.id;
        if (data.top===0||data.top===null){
          this.topData.top = 1;
        } else{
          this.topData.top = 0;
        }
        let res = await News.updateTop(this.topData);
        if (res.code===0){
          this.$notify.success("操作成功");
          this.getList();
        } else {
          this.$notify.error("操作失败！")
        }
      }

    },
    mounted(){
      this.getList();
      this.getNewsClassOption();
    },
  }
</script>

<style scoped>

</style>
