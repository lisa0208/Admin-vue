<template>
  <div class="app-container">

    <div class="filter-container">

      <el-date-picker
        v-model="listQuery.date"
        class="filter-item"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      
      <el-input :placeholder="'用户名'" v-model="listQuery.userName" style="width: 200px;" class="filter-item"/>
      <el-input :placeholder="'手机号'" v-model="listQuery.mobile" style="width: 200px;" class="filter-item"/>
      <el-input :placeholder="'充值单号'" v-model="listQuery.orderId" style="width: 200px;" class="filter-item"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

    </div>

    <div styele=''>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="充值总金额：">
          <el-input disabled="" v-model="sums.rechargeAmountSum"/>
        </el-form-item>
        <el-form-item label="充值总人数：">
          <el-input disabled="" v-model="sums.rechargeCountSum"/>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">

      <el-table-column :label="'充值单号'" prop="id" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'用户名'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jfUser.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'手机号'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jfUser.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单创建时间'" width="160px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'充值金额（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeAmount }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'充值流水号'" width="250px">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeNum }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'支付方式'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.payType }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import {
  getBussinessOrder,
  getBussinessInput,
  getBussinessOupt
} from "@/api/bussiness";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "OrderList",
  components: { Pagination },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,

      listQuery: {
        page: 1,
        limit: 10,

        userName: undefined,
        mobile: undefined,
        orderId: undefined
      },
      sums: {
        rechargeAmountSum: 0,
        rechargeCountSum: 0
      }
    };
  },

  created() {
    this.getList();
  },

  methods: {
    formatDate(time) {
      var date = new Date(time);

      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours(),
        min =
          date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
        sec =
          date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
      var newTime =
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
      return newTime;
    },

    getList(data) {
      this.listLoading = true;

      if (data && data.page) {
        this.listQuery.page = data.page;
      }

      let fd = new FormData();

      fd.append("isSplit", 1);

      if (this.listQuery.page) {
        fd.append("pageInfo.pageNum", this.listQuery.page);
      }

      if (this.listQuery.date) {
        fd.append("startTime", this.formatDate(this.listQuery.date[0]));
        fd.append("endTime", this.formatDate(this.listQuery.date[1]));
      }

      if (this.listQuery.mobile) {
        fd.append("userTel", this.listQuery.mobile);
      }

      if (this.listQuery.userName) {
        fd.append("userName", this.listQuery.userName);
      }

      if (this.listQuery.orderId) {
        fd.append("orderId", this.listQuery.orderId);
      }

      getBussinessInput(fd).then(response => {
        this.list = response.data.body ? response.data.body.pages.infos : [];
        this.total = response.data.body
          ? response.data.body.pages.pageInfo.total
          : this.total;
        this.sums = response.data.body.sums;
        this.listLoading = false;
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>

<style>
.el-range-input {
  font-size: 13px;
  position: relative;
  top: -8px;
}
.el-range-separator {
  line-height: 24px;
  font-size: 13px;
  position: relative;
  top: -8px;
}
.el-range-editor--medium .el-range-input {
  font-size: 13px;
  position: relative;
  top: -8px !important;
}
.el-range-editor--medium .el-range-separator {
  line-height: 24px;
  font-size: 13px;
  position: relative;
  top: -8px !important;
}
</style>

