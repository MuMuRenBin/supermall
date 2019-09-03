<template>
    <div class="bottom-bar">
        <div class="check-content" @click="checkClick">
            <check-button :isChecked='isSelectAll' class="check-button"/>
            <span>全选</span>
        </div>
        <div class="totalPrice">
            合计：{{totalPrice}}
        </div>
        <div class="calculator" @click="calcClick">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'
    export default {
        name:'CartBottomBar',
        components:{
            CheckButton
        },
        computed: {
            totalPrice(){
                return '￥'+this.$store.state.cartList.filter(item=>{
                    return item.checked
                }).reduce((preValue,item)=>{
                    return preValue+item.price * item.count
                },0)+'元'
            },
            checkLength(){
                return this.$store.state.cartList.filter(item=>item.checked).length
            },
            isSelectAll(){
                //第一种
                //return !(this.$store.state.cartList.filter(item=>!item.checked).length)
                //第二种
                // return !this.$store.state.cartList.some(item=>!item.checked)
                //第三种
                // return !this.$store.state.cartList.find(item=>!item.checked)
                //第四种
                for (const item of this.$store.state.cartList) {
                    if (!item.checked) {
                        return false
                    }
                }
                return true;
            }
        },
        methods: {
            checkClick(){
                if(this.isSelectAll){
                    this.$store.state.cartList.forEach(item=>item.checked=false)
                }else{
                    this.$store.state.cartList.forEach(item=>item.checked=true)
                }
            },
            calcClick(){
                if (!this.isSelectAll) {
                    this.$toast.show('请选择所想要购买的商品',15000)
                }
            }
        },
    }
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        width: 100%;
        display: flex;
        /* justify-content: space-between; */
        background-color: #eee;
        position: absolute;
        bottom: 49px;
        /* flex: 1; */
    }
    .check-content{
        display: flex;
        align-items: center;
        line-height: 40px;
        margin-left: 8px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 4px;
    }
    .totalPrice{
        line-height: 40px;
        margin-left: 10px;
    }
    .calculator{
        position: absolute;
        line-height: 40px;
        width: 90px;
        text-align: center;
        right: 10px;
        background-color: red;
        color: #fff;
    }
</style>