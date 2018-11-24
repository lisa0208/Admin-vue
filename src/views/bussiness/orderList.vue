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
      <el-input :placeholder="'订单号'" v-model="listQuery.orderId" style="width: 200px;" class="filter-item"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

    </div>

    <div styele=''>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="订单应付总额：">
        <el-input disabled="" v-model="sums.shouldFeeSum"/>
        </el-form-item>

        <el-form-item label="优惠券减免总额：">
        <el-input disabled="" v-model="sums.couponCutFeeSum"/>
        </el-form-item>

        <el-form-item label="车辆押金总额：">
        <el-input disabled="" v-model="sums.carDepositSum"/>
        </el-form-item>
        <el-form-item label="违章押金总额：">
        <el-input disabled="" v-model="sums.peccancyDepositSum"/>
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

      <el-table-column :label="'订单号'" prop="id" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'用户名'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jfUser.nickname }}</span>
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

      <el-table-column :label="'订单实际金额（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.shouldFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单时长'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.orderDays }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车辆租金（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.rentFee }}</span>
        </template>
      </el-table-column>


      <el-table-column :label="'车辆押金（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.carDeposit }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'违章押金（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.peccancyDeposit }}</span>
        </template>
      </el-table-column>


      <el-table-column :label="'车辆扣费（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.cutCarFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'保险费（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.saveFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'服务费（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.serviceFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'违章扣费（元）'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.cutPeccancyFee }}</span>
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
        carDepositSum: 0,
        couponCutFeeSum: 0.14,
        cutCarFeeSum: 126,
        cutFeeSum: 0,
        cutPeccancyFeeSum: 0,
        peccancyDepositSum: 0,
        rechargeAmountSum: 0,
        shouldFeeSum: 0.36
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

      getBussinessOrder(fd).then(response => {
        this.list = response.data.body ? response.data.body.pages.infos : [];
        this.total = response.data.body
          ? response.data.body.pages.pageInfo.total
          : this.total;
        this.listLoading = false;
        this.sums = response.data.body.sums
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

