<template>
  <div class="header">
    <el-breadcrumb class="bread-crumb"
                   separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
      校园二手商品交易管理后台
    </el-breadcrumb>
    <div class="user-header">
      <div class="user-name">{{userName}}</div>
      <div class="logout"
           @click="logout">退出登录</div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
        userName: '管理员'
    }
  },
  created() {
      console.log(this.userName);
      const userName = localStorage.getItem('user_name')
      if(userName) this.userName = userName
  },
  methods: {
    logout () {
      this.$confirm('是否退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          localStorage.setItem('token', '')
          localStorage.setItem('user_name', '')
        this.$router.push('/login')
      }).catch(err => {
          console.log(err);
      })
    }
  }
}
</script>
<style scoped lang="scss">
.bread-crumb {
  position: absolute;
  top: 0;
  left: 0;
  //   margin-left: 180px;
    padding-left: 220px;
  //   width: calc(100% - 180px);
  display: flex;
  font-weight: 700;
  z-index: -999;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #d8dce5;
  box-sizing: border-box;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
}
.user-header {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  .user-name {
    padding: 0 30px;
  }
  .logout {
    cursor: pointer;
  }
}
</style>