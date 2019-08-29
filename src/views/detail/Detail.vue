<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scroll">
            <detail-swiper :topImages='topImages'/>
            <detail-base-info :goods='goods'/>
            <detail-shop-info :shop='shop'/>
            <detail-goods-info :detailInfo='detailInfo'/>
            <detail-param-info :paramInfo='paramInfo'/>
            <detail-comment-info :commentInfo='commentInfo'/>
            <goods-list :goods='recommends'/>
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import Scroll from 'components/common/scroll/Scroll';
    import DetailGoodsInfo from './childComps/DetailGoodsInfo';
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import GoodsList from 'components/content/goods/GoodsList'
    import {debounce} from 'common/utils'
    export default {
        name:'Detail',
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList
        },
        data() {
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[]
            }
        },
        created() {
            console.log(this.$route.params);
            this.iid = this.$route.params.iid;

            //获取详情数据
            getDetail(this.iid).then(res=>{
                //1.获取顶部的图片轮播数据
                console.log(res)
                let result = res.data.result;
                this.topImages = result.itemInfo.topImages;

                //2.获取商品信息
                this.goods = new Goods(result.itemInfo,result.columns,result.shopInfo.services)
                // console.log(this.goods);
                
                //3.创建店铺信息
                this.shop = new Shop(result.shopInfo)

                //4.获取详细的信息
                this.detailInfo = result.detailInfo;
                // console.log(this.detailInfo);

                //5.获取参数信息
                this.paramInfo = new GoodsParam(result.itemParams.info,result.itemParams.rule)
                // console.log(this.paramInfo);
                //6.获取评论信息
                if (result.rate.cRate !==0) {
                    this.commentInfo = result.rate
                }
                // console.log(this.commentInfo);

            })

            //获取推荐信息
            getRecommend().then(res=>{
                console.log(res);
                let result = res.data.data;
                this.recommends = result.list;
                console.log(this.recommends)

            })

        },
        methods: {
            imageLoad(){
                this.$refs.scroll.refresh();
            }
        },
        mounted() {
        //图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.resfresh,50);
        this.$bus.$on('detailitemImageLoad',()=>{
            refresh();
        })
    },
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    /* .detail-nav{
        position: relative;
        z-index: 9;
    } */
    /* .content{
        height: calc(100%-44px);
        overflow: hidden;
    } */
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>