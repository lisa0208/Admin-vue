<template>
  <div class="app-container">

    <div class="filter-container">
      
      <el-input :placeholder="'用户 ID'" v-model="listQuery.userId" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'提现手机号'" v-model="listQuery.putForwardTel" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'提现账户名'" v-model="listQuery.putForwardUserName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="bankValue" :placeholder="'提现银行'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in bankList" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-input :placeholder="'提现卡号'" v-model="listQuery.putForwardCardNum" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'提现流水号'" v-model="listQuery.putForwardSerialNum" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="takecashValue" :placeholder="'提现状态'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in takechasStatusOptions" :key="item.key" :label="item.label" :value="item.key"/>
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

      <el-table-column :label="'ID'" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'用户ID'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现手机号'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.putForwardTel }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现状态'" width="150px">
        <template slot-scope="scope">
          <span>{{ takeCashMap[scope.row.status] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现金额(元)'" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.putForwardAmount }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现账户名'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.putForwardUserName }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现银行'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.putForwardBankName }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现卡号'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.putForwardCardNum }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现流水号'" width="260px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.putForwardSerialNum }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'提现时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleStatus(scope.row, 2)" v-if="scope.row.status==1 || scope.row.status==4">通过</el-button>
          <el-button type="danger" size="mini" @click="handleStatus(scope.row, 3)" v-if="scope.row.status==1  || scope.row.status==4">驳回</el-button>
          <el-button type="warning" size="mini" @click="handleStatus(scope.row, 4)" v-if="scope.row.status==1 || scope.row.status==4">暂存</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchTakeCashList, fetchBankList, updateTakeCash } from "@/api/bussiness";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,

      listQuery: {
        page: 1,
        limit: 10,
        userId: undefined,
        putForwardTel: undefined,
        putForwardUserName: undefined,
        putForwardCardNum: undefined,
        putForwardSerialNum: undefined
      },

      takecashValue: undefined, // 全部
      takechasStatusOptions: [
        { label: "提现待审核", key: "1" },
        { label: "已提现", key: "2" },
        { label: "已驳回", key: "3" },
        { label: "暂存", key: "4" }
      ],

      takeCashMap: {
        "1": "提现待审核",
        "2": "已提现",
        "3": "已驳回",
        "4": "暂存"
      },

      bankValue: undefined,
      bankList: []

    };
  },

  created() {
    this.getList();
    this.getBankList();
  },

  methods: {

    getBankList(){
      fetchBankList().then(response => {
        console.log(response)
        
        for(let i in response.data.body){
          let json = {};
          json.key = i;
          json.label = response.data.body[i];
          this.bankList.push(json);
        }
      });
    },

    getList(data) {
      this.listLoading = true;

      if (data && data.page) {
        this.listQuery.page = data.page;
      }

      let fd = new FormData();

      if (this.listQuery.page) {
        fd.append("pageInfo.pageNum", this.listQuery.page);
      }

      if (this.listQuery.userId) {
        fd.append("userId", this.listQuery.userId);
      }

      if (this.listQuery.putForwardTel) {
        fd.append("putForwardTel", this.listQuery.putForwardTel);
      }

      if (this.listQuery.putForwardUserName) {
        fd.append("putForwardUserName", this.listQuery.putForwardUserName);
      }

      if (this.listQuery.putForwardCardNum) {
        fd.append("putForwardCardNum", this.listQuery.putForwardCardNum);
      }

      if (this.bankValue) {
        fd.append("putForwardBankName", this.bankValue);
      }

      if (this.listQuery.putForwardSerialNum) {
        fd.append("putForwardSerialNum", this.listQuery.putForwardSerialNum);
      }
      
      if (this.takecashValue) {
        fd.append("putForwardStatus", this.takecashValue);
      }

      fetchTakeCashList(fd).then(response => {
        this.list = response.data.body ? response.data.body.infos : [];
        this.total = response.data.body ? response.data.body.pageInfo.total: this.total;
        this.listLoading = false;
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },

    handleViewUserInfo(user) {
      this.dialogShowOwnerInfo = true;
      this.ownerInfo = user;
    },

    handleStatus(row, status) {
      let fd = new FormData();
      fd.append("id", row.id);
      fd.append("status", status);

      updateTakeCash(fd).then(response => {
        if(response.data.header.code != 200){
          this.$alert(response.data.header.desc);
        } else {
          this.listLoading = false;
          this.getList();
        }
      });
    }
  }
};
</script>

<style scoped>
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
</style>

