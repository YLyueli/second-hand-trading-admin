<template>
  <div id="app">
    <div v-if="!$route.meta.showNoSideBar">
      <side-bar></side-bar>
      <bread-crumb></bread-crumb>
    </div>
    <router-view />
  </div>
</template>

<script>
import SideBar from '@/components/Sidebar/index'
import BreadCrumb from '@/components/BreadCrumb/index'

export default {
  name: 'App',
  components: {
    SideBar,
    BreadCrumb
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  overflow: hidden;
}
/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #eaecf1;
  border-radius: 3px;
}
</style>
