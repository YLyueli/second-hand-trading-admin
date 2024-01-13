<template>
  <div class="notice-wrap">
    <div class="search">
      <el-select v-model="value"
                 class="select"
                 placeholder="搜索类型">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-input class="input"
                v-model="content"
                placeholder="请输入搜索内容"></el-input>
      <el-button type="primary"
                 @click="handleSearch"
                 class="btn">搜索</el-button>
      <el-button type="primary"
                 @click="clearSearch"
                 class="btn">清除</el-button>
      <el-button type="primary"
                 @click="handleRelease('add')"
                 class="btn">发布公告</el-button>
    </div>

    <el-table :data="tableData"
              height="450"
              stripe
              border
              class="my-table"
              :cell-style="{'padding': '3px 0'}"
              :header-cell-style="{'padding': '8px 0'}"
              style="width: 95%">
      <el-table-column prop="id"
                       label="索引"
                       width="85">
      </el-table-column>
      <el-table-column prop="title"
                       label="公告标题"
                       width="180">
      </el-table-column>
      <el-table-column prop="content"
                       label="公告内容"
                       width="320">
      </el-table-column>
      <el-table-column prop="admin"
                       label="管理员账号"
                       width="120">
      </el-table-column>
      <el-table-column prop="time"
                       label="发布时间"
                       width="160">
      </el-table-column>
      <el-table-column prop="limit"
                       label="面向用户"
                       width="80">
        <template slot-scope="scope">
          <span>{{scope.row.limitt!=='0'?'全体':scope.row.user_id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address"
                       label="编辑">
        <template slot-scope="scope">
          <el-button @click="handleRelease('edit', scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="handleDeleteRelease(scope.row)"
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
      <div class="title">
        <div style="width: 50px;">标题</div>
        <el-input class="input"
                  v-model="noticeTitle"
                  placeholder="请输入标题"></el-input>
      </div>
      <div class="content">
        <div style="width: 50px;">内容</div>
        <el-input class="input"
                  type="textarea"
                  rows="6"
                  v-model="noticeContent"
                  placeholder="请输入内容"></el-input>

      </div>
      <div class="user">
        <div class="aa">
          <div style="width: 50px;">用户</div>
          <el-select v-model="value1"
                     class="select"
                     placeholder="搜索类型">
            <el-option v-for="item in options1"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="aa">
          <div style="width: 50px;"
               v-if="value1==='0'">用户id</div>
          <el-input class="input"
                    v-model="noticeUserId"
                    v-if="value1==='0'"
                    placeholder="请输入用户id"></el-input>
        </div>

      </div>
      <div>
        <el-button type="primary"
                   @click="handleRealseNotice"
                   class="btn">发布</el-button>
        <el-button type="primary"
                   @click="cancelRelease"
                   class="btn">取消</el-button>
      </div>

    </div>
  </div>
</template>
<script>
import SideBar from '@/components/Sidebar/index'
import { notice } from '../../axios/api'
export default {
  components: {
    SideBar
  },
  data () {
    return {
      options: [{
        value: 'title',
        label: '标题'
      }, {
        value: 'admin',
        label: '发布者'
      }, {
        value: 'user_id',
        label: '面向对象'
      }],
      value: '',
      options1: [{
        value: '1',
        label: '全体用户'
      }, {
        value: '0',
        label: '单一用户'
      }],
      value1: '',
      limitt: '',
      tableData: [],
      currentPage: 1,
      total: 0,
      content: '',
      isPopup: false,
      noticeTitle: '',
      noticeContent: '',
      limit: '',
      noticeUserId: '',
      isAdd: true, //编辑还是新增
      editId: 0
    }
  },
  mounted () {
    this.getNoticeData()
  },
  methods: {
    getNoticeData () {
      notice.getNoticeData({
        type: this.value,
        content: this.content,
        currentPage: this.currentPage
      }).then(res => {
        this.total = res.data.totalNum
        this.tableData = res.data.results
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getNoticeData()
    },
    handleSearch () {
      this.currentPage = 1
      this.getNoticeData()

    },
    clearSearch () {
      this.currentPage = 1
      this.value = ''
      this.content = ''
      this.getNoticeData()

    },
    handleRelease (type, value) {
      console.log(type, value);
      if (type === 'edit')
      {
        this.isAdd = false
        this.editId = value.id
        this.noticeTitle = value.title
        this.noticeContent = value.content
        this.limitt = value.limitt
        this.value1 = value.limitt === '0' ? '0' : '1'
        this.noticeUserId = value.user_id
      } else
      {
        this.noticeTitle = ''
        this.noticeContent = ''
        this.value1 = '1'
      }
      this.isPopup = true
    },
    cancelRelease () {
      this.isPopup = false

    },
    handleEditNotice () {
      this.isPopup = true
    },

    handleRealseNotice () {
      if (!this.noticeTitle)
      {
        this.$message.warning('请输入标题')
        return
      }
      if (!this.noticeContent)
      {
        this.$message.warning('请输入内容')
        return
      }
      if (!this.value1)
      {
        this.$message.warning('请选择面向用户')
        return
      }
      if (this.value1 === '0' && !this.noticeUserId)
      {
        this.$message.warning('请输入用户id')
        return
      }
      if (this.isAdd)
      {
        console.log('增加公告', this.value1);
        if (this.value1 === '1')
        {
          this.value1 = Math.random()
        }
        notice.addNotice({
          title: this.noticeTitle,
          content: this.noticeContent,
          user_id: this.noticeUserId,
          limit: this.value1,
          time: new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " "),
          admin: localStorage.getItem('account')
        }).then(res => {
          if (res.status === 0)
          {
            this.isPopup = false
            this.$message.success('发布成功')
            this.getNoticeData()
          }
        })
      } else
      {
        notice.editNotice({
          id: this.editId,
          title: this.noticeTitle,
          content: this.noticeContent,
          user_id: this.noticeUserId,
          limit: this.limitt,
          time: new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " "),
          admin: localStorage.getItem('account')
        }).then(res => {
          if (res.status === 0)
          {
            this.isPopup = false
            this.$message.success('编辑成功')

            this.getNoticeData()
          }
        })
      }
    },
    handleDeleteRelease (value) {
      this.$confirm('是否删除该公告', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        notice.deleteNotice({
          id: value.id
        }).then(res => {
          this.$message.success('删除成功')
          this.getNoticeData()
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped lang="scss">
.notice-wrap {
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
      margin-left: 30px;
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
    // justify-content: space-around;
    align-items: center;
    padding: 30px;
    padding-top: 40px;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    font-size: 18px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    .title {
      display: flex;
      align-items: center;
    }
    .content {
      display: flex;
    }
    .user {
      display: flex;
      flex-direction: column;
      .aa {
        display: flex;
        align-items: center;
      }
    }
    .select {
      width: 360px;

      margin: 15px 30px;
    }
    .btn {
      width: 100px;
      height: 36px;
      margin: 20px;
    }
    .input {
      width: 360px;
      margin: 15px 30px;
    }
  }
  .el-table::before {
    height: 0px;
  }
}
</style>
