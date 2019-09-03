<template>
    <div class="cart-list">
        <scroll class="content">
            <cart-list-item v-for="(item, index) in cartList" :product='item' :key="index"/>
        </scroll>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
    export default {
        name:'CartList',
        components:{
            Scroll,
            CartListItem
        },
        computed: { 
            ...mapGetters(['cartList'])
        },

    }
</script>

<style scoped>
    .cart-list{
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