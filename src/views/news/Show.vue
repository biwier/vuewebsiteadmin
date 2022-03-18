<template>
  <news-detail :is-edit="false"></news-detail>
</template>

<script>
  import NewsDetail from './components/NewsDetail.vue'
    export default {
        name: "Show",
      components:{NewsDetail}
    }
</script>

<style scoped>

</style>
