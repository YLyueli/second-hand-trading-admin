<template>
  <el-menu :default-active="activeIndex"
           class="el-menu-vertical-demo"
           background-color="#5D687F"
           text-color="#fff"
           router
           active-text-color="#F2E0A0">

    <el-menu-item index="/">
      <i class="el-icon-s-goods"></i>
      <span slot="title">商品管理</span>
    </el-menu-item>
    <el-menu-item index="/order">
      <i class="el-icon-s-order"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-menu-item index="/notice">
      <i class="el-icon-message-solid"></i>
      <span slot="title">公告管理</span>
    </el-menu-item>
    <el-submenu index="/common">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item class="item"
                    index="/common">
        <i class="el-icon-menu"></i>
        <span slot="title">小程序用户</span>
      </el-menu-item>
      <el-menu-item class="item"
                    index="/admin">
        <i class="el-icon-menu"></i>
        <span slot="title">管理员用户</span>
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="/report">
      <i class="el-icon-warning"></i>
      <span slot="title">用户举报</span>
    </el-menu-item>
    <!-- <el-submenu index="/person">
      <template slot="title">
        <i class="el-icon-s-tools"></i>
        <span>个人设置</span>
      </template>
      <el-menu-item class="item"
                    index="/person">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item class="item"
                    index="/password">
        <i class="el-icon-user-solid"></i>
        <span slot="title">密码修改</span>
      </el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: this.$route.path
    }
  },
}

</script>

<style scoped lang="scss">
.el-menu-vertical-demo {
  width: 180px;
  height: 100%;
  li {
    text-align: left;
  }
}
.item {
  text-align: right;
  width: 180px !important;
  min-width: 180px !important;
}
</style>
// <el-submenu index="1">
//         <template slot="title">
//           <i class="el-icon-location"></i>
//           <span>导航一</span>
//         </template>
//         <el-menu-item-group>
//           <template slot="title">分组一</template>
//           <el-menu-item index="1-1">选项1</el-menu-item>
//           <el-menu-item index="1-2">选项2</el-menu-item>
//         </el-menu-item-group>
//         <el-menu-item-group title="分组2">
//           <el-menu-item index="1-3">选项3</el-menu-item>
//         </el-menu-item-group>
//         <el-submenu index="1-4">
//           <template slot="title">选项4</template>
//           <el-menu-item index="1-4-1">选项1</el-menu-item>
//         </el-submenu>
//       </el-submenu>