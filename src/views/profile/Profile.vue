<template>
    <div class="profile">
        <nav-bar class="nav-bar">
            <div slot="center">个人中心</div>
        </nav-bar>
        <login class="login"/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Login from './childComps/Login'
export default {
    name:'profile',
    components:{
        NavBar,Login
    },
    data() {
        return {

        }
    },

}
</script>

<style scoped>
    .profile{
        margin: auto;
    }
    .nav-bar{
        background-color: var(--color-tint);
        color:#fff;
    }
    .login{
        margin: 100px 0;
    }
</style>