<template>
    <div>
      <div style="padding-top: 5px;padding-bottom: 5px;margin: 5px 0;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/product">产品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>产品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
        <el-input @blur="getList" v-model="searchDTO.keyword" placeholder="输入关键词" suffix-icon="el-icon-search" style="width: 200px;margin-left: 10px" ></el-input>
        <el-select v-model="searchDTO.productClassName" placeholder="请选择产品类型">
          <el-option
            v-for="item in productClassOption"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
        <el-button type="normal" @click="getList"><i class="el-icon-search"></i></el-button>
        <div style="display: inline;float: right;margin-right: 10px">
          <router-link :to="'/product/add'">
            <el-button style="border-radius: 24px;margin-right: 5px;">添加产品</el-button>
          </router-link>
          <el-button @click="deleteProduct" style="border-radius: 24px;">批量删除</el-button>
        </div>
      </el-row>
      <el-card>
        <el-table
          :data="tableList"
          ref="multipleTable"
          tooltip-effect="dark"
          border fit highlight-current-row
          @selection-change="handleSelectionChange"
          style="width: 100%"
          v-loading="tableLoading">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column align="center" label="ID" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="产品名称" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.productName}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="产品图片" min-width="180">
            <template slot-scope="scope">
              <img :src="scope.row.pic" height="50px"/>
            </template>
          </el-table-column>

          <el-table-column align="center" label="产品类别" width="180">
            <template slot-scope="scope">
              <span>{{scope.row.productClassName}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="关键词" min-width="180">
            <template slot-scope="scope">
              <el-tag v-for="tag in (scope.row.keywords).split('&') " :key="scope.row.id" style="margin:1px">
                {{tag}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="最后更新时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.updateDatetime | parseTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <router-link :to="'/product/edit/'+scope.row.id">
                <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
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
          :total="total">
        </el-pagination>
        </div>
      </el-card>
    </div>
</template>
<script>
  import Product from '../../api/product.js'
  import ProductClass from '../../api/productClass.js'
    export default {
        name: "ProductList",
      data (){
          return{
            tableLoading:false,
            tableList:[],
            total:undefined,
            searchDTO:{
              page:1,
              rows:10,
              keyword:'',
              productClassName:''
            },
            keywordsTags:[],
            multipleSelection: [],
            productClassOption:[]
          }
      },
      methods:{
        handleSelectionChange(val){
          this.multipleSelection = val;
        },
        async getList(){
          this.tableLoading = true;
          let res = await Product.getList(this.searchDTO);
          this.total = res.total;
          this.tableList = res.result;
          this.tableLoading = false;
        },
        handleSizeChange(val){
          this.searchDTO.rows = val;
          this.getList();
        },
        handleCurrentChange(val){
          this.searchDTO.page = val;
          this.getList();
        },
        deleteProduct(){
          let self = this;
          if (self.multipleSelection.length===0){
            self.$message.warning("请勾选至少一项产品")
          } else {
            let deleteIds = [];
            self.multipleSelection.forEach(v =>{
               deleteIds.push(v.id)
            });
            self.$confirm('此操作将删除这些产品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              Product.delete(deleteIds).then(function(res){
                if (res.code === 0){
                  self.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                  });
                }
                self.multipleSelection = [];
                self.getList();
              }).catch(() => {

              });});
          }
        },
        async getOptions(){
          let res = await ProductClass.getList();
          this.productClassOption = res;
        }

      },
      filters:{
         parseTime : function(time) {
          return time.split("T")[0]
        },
        parseKeywords : function (key) {
          return key.split("&")
        }
      },
      mounted(){
          this.getList();
          this.getOptions();
      }
    }
</script>

<style scoped>

</style>
