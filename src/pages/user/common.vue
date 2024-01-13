<template>
  <div class="common-wrap">
    <div class="search">
      <el-input class="input"
                v-model="user_id"
                placeholder="请输入用户id"></el-input>
      <el-button type="primary"
                 @click="handleSearchUser"
                 class="btn">搜索</el-button>
      <el-button type="primary"
                 @click="handleClearUser"
                 class="btn">清除</el-button>
    </div>

    <el-table :data="tableData"
              height="450"
              stripe
              border
              class="my-table"
              :cell-style="{'padding': '8px 0'}"
              :header-cell-style="{'padding': '8px 0'}"
              style="width: 95%">
      <el-table-column prop="uid"
                       label="索引"
                       width="85">
      </el-table-column>
      <el-table-column prop="user_id"
                       label="用户编号"
                       width="260">
      </el-table-column>
      <el-table-column prop="user_name"
                       label="用户名"
                       width="260">
      </el-table-column>
      <el-table-column prop="user_school"
                       label="学校"
                       width="260">
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button type="danger"
                     v-if="scope.row.ban == 0"
                     @click="handleBanUser(scope.row)"
                     size="mini">封禁</el-button>
          <el-button type="danger"
                     @click="handleBanUser(scope.row)"
                     v-if="scope.row.ban == 1"
                     size="mini">解禁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total,prev, pager, next"
                   :page-size="12"
                   :current-page="currentPage"
                   @current-change="handleCurrentChange"
                   :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { user } from '../../axios/api'

export default {
 
  data () {
    return {
      user_id: '',
      tableData: [],
      currentPage: 1,
      total: 0
    }
  },
  mounted () {
    console.log(this.$route.query.id);
    if(this.$route.query.id) {
        this.user_id = this.$route.query.id
    }
    this.getCommonUserData()
  },
  methods: {
    getCommonUserData () {
      user.getCommonUserData({
        user_id: this.user_id,
        currentPage: this.currentPage,
      }).then(res => {
        this.total = res.data.totalNum
        this.tableData = res.data.results
      })
    },
    handleSearchUser () {
      this.currentPage = 1
      this.getCommonUserData()

    },
    handleClearUser () {
      this.currentPage = 1
      this.user_id = ''
      this.getCommonUserData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCommonUserData()
    },
    handleBanUser (value) {
      let str = ''
      let ban = 0
      if (value.ban == 0)
      {
        str = '是否封禁用户？'
        ban = 1
      } else
      {
        str = '是否解禁用户'
        ban = 0
      }
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        user.banUser({
          user_id: value.user_id,
          ban: ban
        }).then(res => {
          if (ban === 0)
          {
            this.$message.success('解禁成功')
          } else {
            this.$message.success('封禁成功')
          }
          this.getCommonUserData()

        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped lang="scss">
.common-wrap {
  width: 86%;
  margin-top: 60px;
  .search {
    display: flex;
    justify-content: flex-end;
    margin: 30px;
    .select {
      width: 160px;
    }
    .input {
      width: 300px !important;
    }
    .btn {
      margin-left: 30px;
    }
  }
  .my-table {
    margin: 0 30px;
  }
}
</style>
