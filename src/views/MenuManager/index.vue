<template>
  <div class="index">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 17px;margin: 15px">
      <el-breadcrumb-item :to="{ path: '/parkingInfo' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row style="margin-bottom: 5px;background-color: rgb(110, 120, 126);height: 80px;line-height: 80px">
      <div style="display: inline;float: right;margin-right: 10px">
        <el-button @click="addCategory(false)" style="border-radius: 24px;">新增菜单</el-button>
      </div>
    </el-row>
    <el-card >
      <el-tree
        :indent="38"
        :props="props"
        :data="data"
        @node-click="handleNodeClick"
        :render-content="renderContent"
        :default-expand-all="true"
      >
      </el-tree>
    </el-card>
    <CategoryEdit
      :title="categoryEditTitle"
      :dialogFormVisible="dialogFormVisible"
      :data="currentEditCategory"
      @val-change="categoryEditChange"
      @cancel="dialogFormVisible = false"
    >
    </CategoryEdit>


  </div>
</template>

<script>
  import TreeDetails from './TreeDetails.vue';
  import CategoryEdit from './CategoryEdit.vue'
  import SysMenu from '../../api/sysMenu.js'
  export default {
    data() {
      return {
        data:[],
        categoryEditTitle:"",
        dialogFormVisible:false,
        currentEditCategory:null,
        props: {
          children: "children",
          label: 'menuName',
        }
      };
    },
    methods: {
      handleNodeClick(){

      },
      async categoryEditChange(data){
        let self = this;
        let result = await SysMenu.addOrUpdateCategoryMenu(data);
        console.log(result);
        if (result.status){
          self.init();
          self.$notify.success(result.reason);
          self.dialogFormVisible = false;
        } else{
          self.$notify.error(result.reason);
        }
      },
      deleteCategory(data){
        let self = this;
        self.$confirm('此操作将删除'+ data.menuName+'该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let info =  await SysMenu.deleteCategory(data.id);
          if (info.status){
            self.$notify({
              title:'成功',
              message:info.reason,
              type: 'success'
            });
            self.init();
          }else{
            self.$notify({
              title:'失败',
              message:info.reason,
              type: 'warning'
            })
          }
        });

      },
      addCategory(data){
        let self = this;
        if (data.menuLevel === 2){
          self.$notify({
            title: '注意',
            message: '为了页面布局，只能添加2级别菜单！',
            type: 'warning'
          });
          return;
        }
        self.dialogFormVisible = true;
        self.currentEditCategory = {};
        if(!data) {
          self.categoryEditTitle = '添加一级菜单';
          self.currentEditCategory.menuLevel = 1;
          self.currentEditCategory.parentId = 0;
        } else {
          self.currentEditCategory.parentId = data.id;
          self.currentEditCategory.menuLevel = 2;
          self.categoryEditTitle = '添加“'+data.menuName+'”的子菜单';
        }

      },
      editCategory(data){
        let self = this;
        self.dialogFormVisible = true;
        self.currentEditCategory = data;
        self.categoryEditTitle = '修改“'+data.menuName+'”菜单';
      },
      renderContent(h, { node, data, store }) {
        return this.$createElement('TreeDetails',{props: {data:node},on:{
            'add-category': this.addCategory,
            'edit-category':this.editCategory,
            'delete-category':this.deleteCategory,
          }});
      },

      async init(){
        this.data = await SysMenu.getMenuList();
        this.data = this.data.detail;
      }
    },
    mounted: function () {
      this.init();
    },
    components: {
      TreeDetails,CategoryEdit
    }
  };
</script>
<style lang="less">
  .index{
    width: 100%;
    height: calc(~'100vh - 65px');
  }
  .el-tree-node__content {
    height: 40px;
    line-height: 40px;
  }



</style>


