<template>
  <div class="report-wrap">
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
                v-model="input"
                placeholder="审核状态请输入：已审核，未审核"></el-input>
      <el-button type="primary"
                 @click="handleSearch"
                 class="btn">搜索</el-button>
      <el-button type="primary"
                 @click="clearSearch"
                 class="btn">清除</el-button>
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
                       width="60">
      </el-table-column>
      <el-table-column prop="commodity_id"
                       label="商品id"
                       width="74">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="120">
        <template slot-scope="scope">
          <span>{{(scope.row.title.length>17)?(scope.row.title.slice(0, 16) + '...'):scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content"
                       label="内容"
                       width="120">
        <template slot-scope="scope">
          <span>{{(scope.row.content.length>17)?(scope.row.content.slice(0, 16) + '...'):scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reason"
                       label="原因"
                       width="170">
      </el-table-column>
      <el-table-column prop="classify"
                       label="分类"
                       width="80">
      </el-table-column>
      <el-table-column prop="be_report_id"
                       label="卖家id"
                       width="160">
      </el-table-column>

      <el-table-column prop="report_id"
                       label="举报人id"
                       width="160">
      </el-table-column>
      <el-table-column prop="address"
                       label="编辑">
        <template slot-scope="scope">
          <el-button @click="handleReport(scope.row)"
                     type="danger"
                     v-if="scope.row.report == '0'"
                     size="mini">去审核</el-button>
          <el-button type="danger"
                     disabled
                     v-else
                     size="mini">已审核</el-button>

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
import SideBar from '@/components/Sidebar/index'
import { report } from '../../axios/api'
export default {
  components: {
    SideBar
  },
  data () {
    return {
      options: [
        {
          value: 'report',
          label: '审核状态'
        }, {
          value: 'report_id',
          label: '举报用户id'
        }, {
          value: 'be_report_id',
          label: '被举报用户id'
        }],
      value: '',
      input: '',
      tableData: [],
      total: 1,
      currentPage: 1
    }
  },
  mounted () {
    this.getReportData()
  },
  methods: {
    getReportData () {
      if (!(this.value === '' && this.input === '' || this.value !== '' && this.input !== ''))
      {
        this.$message.warning('请输入搜索数据')
        return
      }
      report.getReportData({
        type: this.value,
        content: this.input,
        currentPage: this.currentPage
      }).then(res => {
        this.total = res.data.totalNum
        this.tableData = res.data.results
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getReportData()

    },
    handleReport (value) {
      this.$router.push({
        path: '/',
        query: {
          id: value.commodity_id
        }
      })
      report.editReportData({
        id: value.id
      }).then(res => {
      })
    },
    handleSearch () {
      this.getReportData()
    },
    clearSearch () {
      this.value = ''
      this.input = ''
      this.currentPage = 1
      this.getReportData()
    }
  }
}
</script>
<style scoped lang="scss">
.report-wrap {
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
}
</style>
