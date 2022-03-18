<template>
    <news-detail :is-edit="true"></news-detail>
</template>

<script>
    import NewsDetail from './components/NewsDetail.vue'
    export default {
        name: "Edit",
      components:{NewsDetail}
    }

</script>

<style scoped>

</style>
