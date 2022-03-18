<template>
  <div class="tree-details">
    <el-row type="flex">
      <el-col style="flex: 1">
        <span style="font-size: 13px">
          <span style="color: #3c8dbc">【</span>{{ data.data.menuName }}<span style="color: #3c8dbc">】</span>
        </span>
      </el-col>
      <el-col style="width: 180px">
        <el-button v-if="data.data.menuLevel > 0" @click="edit(data,$event)" type="normal" icon="el-icon-edit" circle  size="mini"></el-button>
        <el-button v-if="data.data.menuLevel > 0" @click="add(data,$event)" type="normal" icon="el-icon-plus" circle  size="mini"></el-button>
        <el-button v-if="data.data.menuLevel > 0" @click="deleteDepart(data,$event)" type="normal" icon="el-icon-delete" circle  size="mini"></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name:'TreeCategory',
    props: {
      data:Object,
    },
    data() {
      return {

      }
    },
    methods: {
      deleteDepart(node,e){
        this.$emit('delete-category',node.data);
        e.cancelBubble = true;
      },
      add(node,e){
        this.$emit('add-category',node.data);
        e.cancelBubble = true;
      },
      edit(node,e){
        this.$emit('edit-category',node.data);
        e.cancelBubble = true;
      },
      info(node,e){
        let info = node.data;
        this.$alert('<strong style="margin-right: 18px">菜单名称:</strong>'+info.name+' <i style="font-size: 24px" class="'+info.icon+'"></i><br/><br><br><strong>菜单路由:</strong><br><div class="category-description">'+(info.path?info.path:"暂无路由")+'</div>', '菜单详情', {
          type: 'info',
          dangerouslyUseHTMLString: true,
        }).then(r=>{});

        e.cancelBubble = true;
      }

    },
    mounted: function () {

      // console.log(this.data)

    },
    components: {

    }
  }
</script>
<style lang="less">
  .tree-details{
    flex: 1;
    .el-button.is-circle {
      padding: 8px;
    }
  }
  .category-description{
    text-indent: 2em;
  }
</style>
