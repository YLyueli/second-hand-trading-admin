<template>
  <div class="person-wrap">
    <div class="search">
      <label for="">手机号</label>
      <el-input v-model="phone"
                class="input"
                placeholder="请输入手机号"></el-input>
      <label for="">用户名</label>
      <el-input v-model="name"
                class="input"
                placeholder="请输入用户名"></el-input>
      <label for="">学校</label>
      <el-input v-model="school"
                class="input"
                placeholder="请输入学校"></el-input>
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
      phone: '',
      name: '',
      school: '',
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
.person-wrap {
  width: 86%;
  margin-top: 60px;
  .search {
    display: flex;
    margin: 30px 80px;
    flex-direction: column;
    align-items: flex-start;
    .select {
      width: 160px;
    }
    .input {
      width: 300px !important;
      margin: 30px 0;
    }
  }
  .my-table {
    margin: 0 30px;
  }
}
</style>
