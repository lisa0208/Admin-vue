<template>
  <div class="app-container">

    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.date"
        class="filter-item"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>

      <el-input :placeholder="'车牌号'" v-model="listQuery.plateNum" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'型号'" v-model="listQuery.model" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'用户名'" v-model="listQuery.nickName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'手机号'" v-model="listQuery.mobilePhone" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <!-- <el-select v-model="listQuery.city" :placeholder="'城市'" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in cityOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select> -->

      <el-select v-model="statusValue" :placeholder="'车辆状态'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key"/>
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

      <el-table-column :label="'ID'" prop="id" sortable="custom" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车主姓名'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jfUser.name }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="'城市'" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column> -->

      <el-table-column :label="'品牌'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brand }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'型号'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.model }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车牌号'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'颜色'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车辆状态'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ carStatusMap[scope.row.carStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'申请时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车主信息'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowOwnerInfo(scope.row.jfUser)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePass(scope.row, 3)" v-if="scope.row.carStatus==0">通过</el-button>
          <el-button type="danger" size="mini" @click="handlePass(scope.row, 4)" v-if="scope.row.carStatus==0">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="'车主信息查看'" :visible.sync="dialogShowOwnerInfo">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'姓名'" prop="type">
          <el-input v-model="ownerInfo.name" readonly/>
        </el-form-item>
        <el-form-item :label="'手机号'" prop="type">
          <el-input v-model="ownerInfo.mobile" readonly/>
        </el-form-item>
        <el-form-item :label="'身份证'" prop="type">
          <el-input v-model="ownerInfo.idcard" readonly/>
        </el-form-item>

        <el-form-item :label="'身份证正面'" prop="type">
          <img :src="ownerInfo.idcardFront" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'身份证反面'" prop="type">
          <img :src="ownerInfo.idcardBack" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'驾照'" prop="type">
          <el-input v-model="ownerInfo.drivingNum" readonly/>
        </el-form-item>

        <el-form-item :label="'驾照类型'" prop="type">
          <el-input v-model="drivingMap[ownerInfo.drivingType]" readonly/>
        </el-form-item>

        <el-form-item :label="'驾照正面'" prop="type" >
          <img :src="ownerInfo.drivingFront" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'驾照反面'" prop="type">
          <img :src="ownerInfo.drivingBack" style='width:150px; height:150px'>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowOwnerInfo = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCarAudit, updateCar } from "@/api/car";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "CarAudit",
  components: { Pagination },

  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,

      listQuery: {
        page: 1,
        limit: 10,
        date: undefined,
        city: undefined,
        plateNum: undefined,
        model: undefined,
        nickName: undefined,
        mobilePhone: undefined
      },

      cityOptions: [{ label: "上海", key: "1" }],

      statusValue: undefined, // 全部
      statusOptions: [
        { label: "未审核", key: "0" },
        { label: "上线", key: "1" },
        { label: "下线", key: "2" },
        { label: "审核通过", key: "3" },
        { label: "未通过", key: "4" },
        { label: "已预定", key: "5" }
      ],

      drivingMap: {
        '0': 'A1驾照',
        '1': 'A2驾照',
        '2': 'A3驾照',
        '3': 'B1驾照',
        '4': 'B2驾照',
        '5': 'C1驾照',
        '6': 'C2驾照'
      },

      carStatusMap: {
        '0': '未审核',
        '1': '上线',
        '2': '下线',
        '3': '审核通过',
        '4': '未通过',
        '5': '已预定'
      },

      dialogShowOwnerInfo: false,
      ownerInfo: {
        balance: undefined,
        bankCardCount: undefined,
        createTime: undefined,
        drivingBack: undefined,
        drivingFront: undefined,
        drivingNum: undefined,
        drivingType: undefined,
        headImg: undefined,
        id: 1,
        idcard: undefined,
        idcardBack: undefined,
        idcardFront: undefined,
        loginChannel: undefined,
        mobile: undefined,
        name: undefined,
        nickname: undefined,
        password: undefined,
        qualityType: undefined,
        updateTime: undefined,
        userOpenId: undefined,
        userStatus: undefined,
        userType: undefined
      }
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList(data) {
      this.listLoading = true;
      
      let fd = new FormData();

      if(data && data.page){
        this.listQuery.page = data.page;
      }

      if (this.listQuery.page) {
        fd.append("pageInfo.pageNum", this.listQuery.page);
      }

      if (this.listQuery.date) {
        fd.append("date", this.listQuery.date);
      }

      if (this.listQuery.plateNum) {
        fd.append("plateNum", this.listQuery.plateNum);
      }

      if (this.listQuery.model) {
        fd.append("model", this.listQuery.model);
      }

      if (this.listQuery.nickName) {
        fd.append("nickName", this.listQuery.nickName);
      }

      if (this.listQuery.mobilePhone) {
        fd.append("mobile", this.listQuery.mobilePhone);
      }

      if (this.statusValue) {
        fd.append("carStatus", this.statusValue);
      }

      fetchCarAudit(fd).then(response => {
        if (response.data.body) {
          this.list = response.data.body.infos ? response.data.body.infos : [];
          this.total = response.data.body.pageInfo.total;
        }
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

    handleShowOwnerInfo(user) {
      this.dialogShowOwnerInfo = true;
      this.ownerInfo = user;
    },

    handlePass(row, status) {
      let fd = new FormData();
      fd.append("jfCar.carStatus", status);
      fd.append("jfCar.id", row.id);
      fd.append("jfUser.id", row.jfUser.id);

      updateCar(fd).then(response => {
        this.getList();
        if (status == 3) {
          window.location.hash = "/car/car-add/" + row.id;
        }
      });
    }
  }
};
</script>

<style>
.el-range-editor--medium .el-range-input {
  font-size: 13px;
  position: relative;
  top: -8px !important;
}
.el-range-editor--medium .el-range-separator {
  line-height: 24px;
  font-size: 13px;
  position: relative;
  top: -8px;
}
</style>

