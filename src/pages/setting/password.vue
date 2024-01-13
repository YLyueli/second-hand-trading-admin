<template>
  <div class="home-wrap">
    <div class="search">
      <label for="">请输入新密码</label>
      <el-input 
                class="input"
                placeholder=""></el-input>
      <label for="">再次输入密码</label>
      <el-input
                class="input"
                placeholder=""></el-input>
      
      <el-button type="primary"
                 class="btn">修改</el-button>
    </div>

  </div>
</template>
<script>
import SideBar from '@/components/Sidebar/index'

export default {
  components: {
    SideBar
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '商品标题'
      }, {
        value: '选项2',
        label: '商品分类'
      }, {
        value: '选项3',
        label: '交易学校'
      }],
      value: '',
      tableData: [{
        date: '207',
        name: '王小虎',
        address: '合肥'
      },
      {
        date: '207',
        name: '王小虎',
        address: '合肥'
      }]
    }
  }
}
</script>
<style scoped lang="scss">
.home-wrap {
  width: 86%;
  margin-top: 60px;
  .search {
    display: flex;
    margin: 80px;
    flex-direction: column;
    align-items: flex-start;
    .select {
      width: 160px;
    }
    .input {
      width: 300px !important;
      margin: 30px 0;
    }
    .btn {
    }
  }
  .my-table {
    margin: 0 30px;
  }
}
</style>
