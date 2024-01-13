<template>
  <div class="home-wrap">
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
      <el-input v-model="input"
                class="input"
                placeholder="请输入搜索内容"></el-input>
      <el-button type="primary"
                 class="btn"
                 @click="searchCommodity">搜索</el-button>
      <el-button type="primary"
                 class="btn"
                 @click="clearCommodity">清除</el-button>
    </div>

    <el-table :data="tableData"
              height="450"
              stripe
              border
              class="my-table"
              :cell-style="{'padding': '3px 0'}"
              :header-cell-style="{'padding': '8px 0'}"
              style="width: 95%">
      <el-table-column prop="commodity_id"
                       label="商品id"
                       width="80">
      </el-table-column>
      <el-table-column prop="user_id"
                       label="发布者"
                       width="260">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="180">
        <template slot-scope="scope">
          <span>{{(scope.row.title.length>12)?(scope.row.title.slice(0, 12) + '...'):scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content"
                       label="内容"
                       width="230">
        <template slot-scope="scope">
          <span>{{(scope.row.content.length>17)?(scope.row.content.slice(0, 16) + '...'):scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="classify"
                       label="分类"
                       width="80">
      </el-table-column>
      <el-table-column prop="price"
                       label="价格"
                       width="80">
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row, scope.$index)"
                     type="text"
                     size="small">详情</el-button>
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
      <div>
        <div class="tt">标题</div>
        <div class="title">{{tableData[index].title}}</div>
      </div>
      <div>
        <div class="tt">内容</div>
        <div class="content">{{tableData[index].content}}</div>
      </div>
      <div>
        <div class="imgs">
          <div class="img"
               v-for="(item, index) in imgs"
               :key="index">
            <img :src="item"
                 alt="">
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary"
                   class="close-btn"
                   size="small"
                   @click="closePopup">关闭</el-button>
        <el-button type="primary"
                   class="close-btn"
                   size="small"
                   @click="banUser(tableData[index].user_id)">去封禁</el-button>
      </div>

    </div>
  </div>
</template>
<script>
import SideBar from '@/components/Sidebar/index'
import { commodity } from "../../axios/api.js";
import { Message } from 'element-ui';

export default {
  components: {
    SideBar
  },
  data () {
    return {
      imgs: [],
      input: '',
      total: 0,
      isPopup: false,
      currentPage: 1,
      options: [{
        value: 'commodity_id',
        label: '商品id'
      }, {
        value: 'user_id',
        label: '用户id'
      }, {
        value: 'title',
        label: '商品标题'
      }, {
        value: 'classify',
        label: '商品分类'
      }],
      value: '',
      tableData: [],
      index: 0
    }
  },
  mounted () {
    console.log(this.$route.query.id);
    if (this.$route.query.id)
    {
      this.value = 'commodity_id'
      this.input = this.$route.query.id
    }
    this.getCommodityData(this.value, this.input)
  },
  methods: {
    getCommodityData (type, content) {
      if (!(type === '' && content === '' || type !== '' && content !== ''))
      {
        Message.warning('请输入搜索数据')
        return
      }
      if (type === 'commodity_id')
      {
        content = parseInt(content)
      }
      commodity.getCommodity({
        type: type,
        content: content,
        currentPage: this.currentPage
      }).then(res => {
        this.total = res.data.totalNum
        this.tableData = res.data.results
      })
    },
    searchCommodity () {
      console.log('获取商品数据', this.value, this.input, this.currentPage);
      this.currentPage = 1
      this.getCommodityData(this.value, this.input)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCommodityData(this.value, this.input)
    },
    clearCommodity () {
      this.currentPage = 1
      this.value = ''
      this.input = ''
      this.getCommodityData(this.value, this.input)
    },
    handleDetail (value, index) {
      this.isPopup = true
      this.index = index
      this.imgs = value.imgs.split(']')
      console.log(value, index, this.imgs);
    },
    closePopup () {
      this.isPopup = false
    },
    handleDelete (value) {
      const that = this
      this.$confirm('是否删除该商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commodity.deleteCommodity({
          commodity_id: value.commodity_id
        }).then(res => {
          this.$message.success('删除成功')
          that.getCommodityData(that.value, that.input)
        })
      }).catch(err => {
        console.log(err);
      })
    },
    banUser (id) {
      this.$router.push({
        path: '/common',
        query: {
          id: id
        }

      })
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
    height: 420px;
    position: absolute;
    top: 56%;
    left: 56%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 30px;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    .tt {
      margin: 20px;
      text-align: left;
      font-weight: 700;
    }
    .title {
      margin: 20px;
      text-align: left;
      text-indent: 2em;
    }
    .content {
      margin: 20px;
      text-align: left;
      text-indent: 2em;
    }
    .close-btn {
      width: 100px;
      height: 36px;
      margin: 0 10px;
    }
  }
  .imgs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .img img {
      width: 100px;
      //   height: 100px;
      padding: 0 6px;
    }
  }
}
</style>
