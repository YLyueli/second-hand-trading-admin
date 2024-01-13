<template>
  <div class="admin-wrap">
    <div class="search">
      <el-input class="input"
                v-model="user_id"
                placeholder="请输入管理员账号"></el-input>
      <el-button type="primary"
                 @click="handleSearchUser"
                 class="btn">搜索</el-button>
      <el-button type="primary"
                 @click="handleClearUser"
                 class="btn">清除</el-button>
      <el-button type="primary"
                 @click="handleRelease('add')"
                 class="btn">新增管理员</el-button>
    </div>

    <el-table :data="tableData"
              height="450"
              stripe
              border
              class="my-table"
              :cell-style="{'padding': '3px 0'}"
              :header-cell-style="{'padding': '8px 0'}"
              style="width: 95%">
      <el-table-column prop="uid"
                       label="索引"
                       width="100">
      </el-table-column>
      <el-table-column prop="user_id"
                       label="手机号"
                       width="190">
      </el-table-column>
      <el-table-column prop="user_name"
                       label="用户名"
                       width="190">
      </el-table-column>
      <el-table-column prop="password"
                       label="密码"
                       width="190">
      </el-table-column>
      <el-table-column prop="user_school"
                       label="学校"
                       width="190">
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button @click="handleRelease('edit', scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)"
                     type="text"
                     size="small">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total,prev, pager, next"
                   :page-size="12"
                   :current-page="currentPage"
                   @current-change="handleCurrentChange"
                   :total="total">
    </el-pagination>
    <div class="popup"
         v-if="isPopup">
      <div class="item">
        <div style="width: 70px;">账号</div>
        <el-input class="input"
                  v-model="account"
                  placeholder="请输入账号"></el-input>
      </div>
      <div class="item">
        <div style="width: 70px;">用户名</div>
        <el-input class="input"
                  v-model="name"
                  placeholder="请输入用户名"></el-input>

      </div>
      <div class="item">
        <div style="width: 70px;">密码</div>
        <el-input class="input"
                  v-model="password"
                  placeholder="请输入密码"></el-input>

      </div>
      <div class="item">
        <div style="width: 70px;">学校</div>
        <el-input class="input"
                  v-model="school"
                  placeholder="请输入学校"></el-input>
      </div>

      <div class="item">
        <el-button type="primary"
                   @click="handleRealseAdmin"
                   class="btn">确认</el-button>
        <el-button type="primary"
                   @click="cancelAdd"
                   class="btn">取消</el-button>
      </div>
    </div>
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
      total: 0,
      isPopup: false,
      isAdd: true,
      name: '',
      account: '',
      password: '',
      school: '',
      uid: ''
    }
  },
  mounted () {
    this.getAdminUserData()
  },
  methods: {
    getAdminUserData () {
      user.getAdminUserData({
        user_id: this.user_id,
        currentPage: this.currentPage,
      }).then(res => {
        this.total = res.data.totalNum
        this.tableData = res.data.results
      })
    },
    handleSearchUser () {
      this.currentPage = 1
      this.getAdminUserData()

    },
    handleClearUser () {
      this.currentPage = 1
      this.user_id = ''
      this.getAdminUserData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAdminUserData()
    },
    handleRelease (type, value) {
      console.log(type, value);
      if (type === 'edit')
      {
        this.isAdd = false
        this.account = value.user_id
        this.password = value.password
        this.name = value.user_name
        this.school = value.user_school
        this.uid = value.uid
      } else
      {
        this.account = ''
        this.password = ''
        this.name = ''
        this.school = ''
      }
      this.isPopup = true
    },
    handleRealseAdmin () {
      if (!this.account)
      {
        this.$message.warning('请输入账号')
        return
      }
      if (!this.name)
      {
        this.$message.warning('请输入用户名')
        return
      }
      if (!this.password)
      {
        this.$message.warning('请输入密码')
        return
      }
      if (!this.school)
      {
        this.$message.warning('请输入学校')
        return
      }
      if (this.isAdd)
      {
        console.log('增加管理员用户');
        user.addAdmin({
          user_id: this.account,
          user_name: this.name,
          user_school: this.school,
          password: this.password,
        }).then(res => {
          if (res.status === 0)
          {
            this.isPopup = false
            this.$message.success('新增管理员成功')
            this.getAdminUserData()
          }
        })
      } else
      {
        user.editAdmin({
          uid: this.uid,
          user_id: this.account,
          user_name: this.name,
          user_school: this.school,
          password: this.password,
        }).then(res => {
          if (res.status === 0)
          {
            this.isPopup = false
            this.$message.success('编辑管理员成功')
            this.getAdminUserData()
          }
        })
      }
    },
    cancelAdd () {
      this.isPopup = false
    },
    handleDelete (value) {
      this.$confirm('是否删除用户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        user.editAdmin({
          uid: value.uid,
        }).then(res => {
          if (res.status === 0)
          {
            this.isPopup = false
            this.$message.success('删除管理员成功')
            this.getAdminUserData()
          }
        })
      }).catch(err => {
        console.log(err);
      })

    }
  }
}
</script>
<style scoped lang="scss">
.admin-wrap {
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
  .popup {
    width: 600px;
    height: 430px;
    position: absolute;
    top: 56%;
    left: 56%;
    display: flex;
    opacity: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 30px;
    padding-top: 40px;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    font-size: 18px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    .item {
      display: flex;
      align-items: center;
    }
    .input {
      width: 260px;
      margin: 0 30px;
    }
  }
}
</style>
