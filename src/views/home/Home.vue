<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control ref='tabControl1' :titles='["流行","新款","精选"]'
        @tabClick='tabClick' class='tab-control' v-show="isTabFixed"/>
        <scroll class="content"  ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
            <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'/>
            <recommend-view :recommends='recommends'/>
            <feature-view/>
            <tab-control ref='tabControl2' :titles='["流行","新款","精选"]'
                @tabClick='tabClick'/>
            <goods-list :goods='showGoods'></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home';
import {debounce} from 'common/utils'

export default {
    name:'Home',
    components:{
        NavBar,
        TabControl,
        GoodsList,
        RecommendView,
        FeatureView,
        HomeSwiper,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop: false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
        }
    },
    created() {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
    mounted() {
        //图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.resfresh,50);
        this.$bus.$on('homeitemImageLoad',()=>{
            refresh();
        })
    },
    computed: {
        showGoods(){
            return this.goods[this.currentType].list;
        }
    },
    methods: {
        /** 网络请求相关的方法*/
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
                // console.log(res);
                this.banners=res.data.data.banner.list;
                this.recommends=res.data.data.recommend.list;
            })
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
                // console.log(res);
                this.goods[type].list.push(...res.data.data.list);
                this.goods[type].page+=1
                //完成上拉加载更多
                this.$refs.scroll.finishPullUp()
            })
        },

        /**事件监听相关方法 */
        
        tabClick(index){
            // console.log(index)
            switch (index) {
                case 0:
                    this.currentType='pop'
                    break;
                case 1:
                    this.currentType='new'
                    break;
                case 2:
                    this.currentType='sell'
                    break;
            }
            this.$refs.tabControl1.currentIndex=index;
            this.$refs.tabControl2.currentIndex=index;
        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0)
        },
        contentScroll(position) {
            //判断BackTop是否显示
            this.isShowBackTop = (-position.y) > 1000

            //决定isTabFixed是否实现吸顶(position:fixed)
            this.isTabFixed = (-position.y)>this.tabOffsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
            //获取tabControl的offsetTop
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            console.log(this.tabOffsetTop)
        }
    },
    activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
    },
}
</script>

<style scoped>
    #home{
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
        /* 使用原生滚动防止头部跟随滚动条滚动的时候用的样式 */
        /* position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 5; */
    }
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    .tab-control{
        position: relative;
        z-index: 9;
    }
    /* .fixed{
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
    } */
    /* .content{
        height: calc(100%-93px);
        overflow: hidden;
        margin-top: 44px;
    } */
</style>