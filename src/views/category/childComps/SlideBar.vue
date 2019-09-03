<template>
    <div class="category-list">
        <scroll class="content">
            <van-sidebar v-model="activeKey">
                <van-sidebar-item v-for="(item, index) in categoryList" :key="index" :title="item.title" to="" />
            </van-sidebar>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import {getCategory} from 'network/category'
    import Scroll from 'components/common/scroll/Scroll'
    export default {
        name:'SlideBar',
        components:{
            Scroll
        },
        data() {
            return {
                activeKey: 0,
                categoryList:[]
            }
        },
        methods: {
            
        },
        created() {
            getCategory().then(res=>{
                // console.log(res)
                this.categoryList = res.data.data.category.list;
            console.log(this.categoryList)
            })
        },

    }
</script>

<style scoped>
    .category-list{
        height: 100%;
    }
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 89px;
        left: 0;
        right: 0;
    }
</style>