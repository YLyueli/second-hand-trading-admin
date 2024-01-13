<template>
  <div class="order-wrap">
    <div class="search">
      <el-input class="input"
                v-model="orderId"
                placeholder="请输入订单号"></el-input>
      <el-button type="primary"
                 @click="handleSearchOrder"
                 class="btn">搜索</el-button>
      <el-button type="primary"
                 @click="handleClearOrder"
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
                       label="订单编号"
                       width="100">
      </el-table-column>
      <el-table-column prop="commodity_id"
                       label="商品编号"
                       width="100">
      </el-table-column>
      <el-table-column prop="title"
                       label="商品标题"
                       width="185">
      </el-table-column>
      <el-table-column prop="sell_name"
                       label="卖家"
                       width="140">
      </el-table-column>
      <el-table-column prop="sell_school"
                       label="卖家学校"
                       width="120">
      </el-table-column>
      <el-table-column prop="buy_name"
                       label="买家"
                       width="140">
      </el-table-column>
      <el-table-column prop="price"
                       label="价格"
                       width="80">
      </el-table-column>
      <el-table-column label="状态"
                       width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status === 1 ? '成功' : '失败'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
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
  </div>
</template>
<script>
import SideBar from '@/components/Sidebar/index'
import { order } from '../../axios/api'

export default {
  components: {
    SideBar
  },
  data () {
    return {
      orderId: '',
      tableData: [],
      total: 4,
      currentPage: 1
    }
  },
  mounted () {
    this.getOrderData(this.orderId, this.currentPage)
  },
  methods: {
    getOrderData (order_id, currentPage) {
      order.getOrderData({
        order_id: order_id,
        currentPage: currentPage
      }).then(res => {
        console.log(res.data);
        this.total = res.data.totalNum
        this.tableData = res.data.result
      })
    },
    handleSearchOrder () {
      this.currentPage = 1
      this.getOrderData(this.orderId, this.currentPage)
    },
    handleClearOrder () {
      this.orderId = ''
      this.currentPage = 1

      this.getOrderData(this.orderId, this.currentPage)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getOrderData(this.orderId, this.currentPage)

    },
    handleDelete (value) {
      console.log(value, value.id);
      this.$confirm('是否删除该订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        order.deleteOrder({
          order_id: value.id
        }).then(res => {
          this.$message.success('删除成功')
          this.getOrderData(this.orderId, this.currentPage)
        })
      }).catch(err => {
        console.log(err);
      })

    }
  }
}
</script>
<style scoped lang="scss">
.order-wrap {
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
