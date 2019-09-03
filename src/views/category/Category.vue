<template>
    <div>
        <nav-bar class="nav-bar">
            <div slot="center">商品分类</div>
        </nav-bar>
        <slide-bar></slide-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import SlideBar from './childComps/SlideBar'
export default {
    name:'Category',
    components:{
        SlideBar,
        NavBar
    },
    data() {
        return {
            
        }
    },

}
</script>

<style scoped>
    .nav-bar{
        background-color: var(--color-tint);
        color:#fff;
    }
</style>