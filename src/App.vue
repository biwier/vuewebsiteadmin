<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
  name: 'App',
  data () {
    return {

    }
  },
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  width: 100%;
  height: 100%;
  padding: 0;
  margin:  0;
  position: absolute;
}
body{
  padding: 0;
  margin: 0;
}
.el-dialog__title{
  color: white !important;
}
.el-dialog__header{
  background-color: #616d6d;
  font-weight: 600;
}
.el-upload{
  background-color: rgba(128, 128, 128, 0.6);
}
</style>
