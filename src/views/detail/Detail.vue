<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"/>
        <scroll class="content" ref="scroll" :probeType='3' @scroll='contentScroll'>
            <detail-swiper :topImages='topImages'/>
            <detail-base-info :goods='goods'/>
            <detail-shop-info :shop='shop'/>
            <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'/>
            <detail-param-info ref="params" :paramInfo='paramInfo'/>
            <detail-comment-info ref="comment" :commentInfo='commentInfo'/>
            <goods-list ref="recommends" :goods='recommends'/>
        </scroll>
        <detail-bottom-bar @addCart='addToCart'/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <!-- <toast :message='message' :show='show'/> -->
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo';
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import GoodsList from 'components/content/goods/GoodsList'
    import {debounce} from 'common/utils'
    import {backTopMixin} from 'common/mixin'
    import DetailBottomBar from './childComps/DetailBottomBar'
    import Scroll from 'components/common/scroll/Scroll';
    // import Toast from 'components/common/toast/Toast'
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
            GoodsList,
            DetailBottomBar,
            // Toast
        },
        mixins:[backTopMixin],
        data() {
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},
                recommends:[],
                themeTopYs:[],
                currentIndex:0,
                // message:'',
                // show:false

            }
        },
        created() {
            // console.log(this.$route.params);
            this.iid = this.$route.params.iid;

            //获取详情数据
            getDetail(this.iid).then(res=>{
                //1.获取顶部的图片轮播数据
                // console.log(res)
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
                // console.log(res);
                let result = res.data.data;
                this.recommends = result.list;
                // console.log(this.recommends)

            })

        },
        methods: {
            imageLoad(){
                this.$refs.scroll.refresh();

                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE)
                console.log( this.themeTopYs);
            },
            titleClick(index){
                console.log(index);
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000)
            },
            contentScroll(position){
                // console.log(position);
                //获取y值
                const positionY = -position.y;

                let length = this.themeTopYs.length;
                for (let i = 0; i < length-1; i++) {
                    // if (this.currentIndex != i && ((i<length - 1 && positionY > this.themeTopYs[i])&&(positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY > this.themeTopYs[i]))) {
                        // this.currentIndex = i;
                        // console.log(i);
                        // this.$refs.nav.currentIndex = this.currentIndex;

                    // }

                    if (this.currentIndex !==i && ((positionY >= this.themeTopYs[i])&&(positionY < this.themeTopYs[i+1]))) {
                        this.currentIndex = i;
                        console.log(i);
                        this.$refs.nav.currentIndex = this.currentIndex;
                    }
                    
                }

                //判断BackTop是否显示
                this.isShowBackTop = (-position.y) > 1000

                //决定isTabFixed是否实现吸顶(position:fixed)
                this.listenShowBackTop(position)
            },
            addToCart(){
                // console.log('-------');
                //1.获取购物车需要展示的信息
                const product={}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid
                // console.log(this.goods);
                //2.将商品添加到购物车里
                this.$store.dispatch('addCart',product).then(res=>{
                    this.$toast.show(res,1500)
                })
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