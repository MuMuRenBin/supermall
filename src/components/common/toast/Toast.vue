<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name:'Toast',
        props:{
            // message:{
            //     type:String,
            //     default(){
            //         return '';
            //     }
            // },
            // show:{
            //     type:Boolean,
            //     default(){
            //         return false;
            //     }
            // }
        },
        data() {
            return {
                message:'',
                isShow:false
            }
        },
        methods: {
            show(message,duration){
                this.message = message;
                this.isShow = true;

                setTimeout(()=>{
                    this.message = '';
                    this.isShow = false;
                },duration)
            }
        },
    }
</script>

<style scoped>
    .toast{
        position: fixed;
        color: #fff;
        padding: 10px;
        border-radius: 10px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(0, 0, 0, .5);
        z-index: 9;
        /* transition: .5s; */
    }
</style>