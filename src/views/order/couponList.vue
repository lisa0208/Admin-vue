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

      

      <el-select v-model="couponTypeValue" :placeholder="'优惠券类型'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in couponOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">

      <el-table-column :label="'ID'" align="center" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'优惠券类型'" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ couponTypeMap[scope.row.couponType] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'优惠券车辆类型'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.modelNameLst  ? scope.row.modelNameLst : '全部车型' }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'优惠券用户类型'" width="240px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userScopeType == 0 ? userScopeTypeMap[scope.row.userScopeType] : '特定用户手机号：' + scope.row.mobileLst}}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'优惠额度（元）'" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fastMinusAccount ? scope.row.fastMinusAccount : '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'折扣'" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.discount ? scope.row.discount : '-' }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'优惠券文案'" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.couponDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'发布时间'" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'有效期'" width="300px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startdueTime }} - {{scope.row.overdueTime}}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />


  </div>
</template>

<script>
import { getCouponList} from "@/api/order";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "CouponList",
  components: { Pagination },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,

      listQuery: {
        orderId: undefined,
        orderType: undefined,

        page: 1,
        limit: 10,

        date: undefined,

        plateNum: undefined,

        nickName: undefined,
        mobile: undefined,
        sortKey: undefined
      },

      couponTypeValue: undefined, // 全部
      couponOptions: [
        { label: "立减券", key: "0" },
        { label: "折扣券", key: "1" },
         { label: "新用户优惠券", key: "2" }
      ],

      couponTypeMap: {
        '0': '立减券',
        '1': '折扣券',
        '2': '新用户优惠券'
      },

      userScopeTypeMap: {
        '0': '全部用户',
        '1': '特定用户'
      },

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
        hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
        min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
        sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      var newTime =
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
      return newTime;
    },

    getList(data) {
      this.listLoading = true;

      let fd = new FormData();

      if (this.listQuery.page) {
        fd.append("pageInfo.pageNum", this.listQuery.page);
      }

      if (this.listQuery.date) {
        fd.append("startTime", this.formatDate(this.listQuery.date[0]));
        fd.append("endTime", this.formatDate(this.listQuery.date[1]));
      }

      if (this.couponTypeValue) {
        fd.append("couponType", this.couponTypeValue);
      }

      getCouponList(fd).then(response => {
        this.list = response.data.body.infos;
        this.total = response.data.body.pageInfo.total;
        this.listLoading = false;
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    sortChange(data) {
      // console.log(data)
      const { prop, order } = data;
      this.listQuery.sortKey = order == "descending" ? 2 : 1;
      this.list.page = 1;
      this.getList();
    },

    handleShowOwnerInfo(user) {
      this.dialogShowOwnerInfo = true;
      this.ownerInfo = user;
    },

    handleShowCarInfo(car) {
      this.dialogShowCarInfo = true;
      this.carInfo = car;
    },

  }
};
</script>

<style>
.el-range-editor--medium .el-range-input {
  font-size: 13px;
  position: relative;
  top: -8px;
}

.el-range-editor--medium .el-range-separator {
  line-height: 24px;
  font-size: 13px;
  position: relative;
  top: -8px;
}
.fixed-width .el-button--mini {
  width: auto;
}
</style>

