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

      <el-input :placeholder="'订单号'" v-model="listQuery.orderId" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'用户名'" v-model="listQuery.nickName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'车牌号'" v-model="listQuery.plateNum" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="statusValue" :placeholder="'状态'" clearable style="width: 220px" class="filter-item">
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

      <el-table-column :label="'订单号'" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'用户名'" width="160px" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车牌号'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carPlateNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'违章时间'" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'用户信息'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowUserInfo(scope.row.userId)" :disabled="!scope.row.orderId">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="'车辆信息'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowCarInfo(scope.row.carId)" :disabled="!scope.row.orderId">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="'状态'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ statusMap[scope.row.peccancyStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'违章押金'" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.peccancyDeposit }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'扣分'" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cutPoints }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleShowCutPeccancy(scope.row)" v-if="scope.row.peccancyStatus==0">设置本条违章金额</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="'用户信息查看'" :visible.sync="dialogShowUserInfo">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'姓名'" prop="type">
          <el-input v-model="userInfo.name" readonly/>
        </el-form-item>
        <el-form-item :label="'手机号'" prop="type">
          <el-input v-model="userInfo.mobile" readonly/>
        </el-form-item>
        <el-form-item :label="'身份证'" prop="type">
          <el-input v-model="userInfo.idcard" readonly/>
        </el-form-item>

        <el-form-item :label="'身份证正面'" prop="type">
          <img :src="userInfo.idcardFront" style="width:100px; height:100px;">
        </el-form-item>

        <el-form-item :label="'身份证反面'" prop="type">
          <img :src="userInfo.idcardBack" style="width:100px; height:100px;">
        </el-form-item>

        <el-form-item :label="'驾照'" prop="type">
          <el-input v-model="userInfo.drivingNum"/>
        </el-form-item>

        <el-form-item :label="'驾照类型'" prop="type">
          <el-input v-model="drivingMap[userInfo.drivingType]"/>
        </el-form-item>

        <el-form-item :label="'驾照正面'" prop="type">
          <img :src="userInfo.drivingFront" style="width:100px; height:100px;">
        </el-form-item>

        <el-form-item :label="'驾照反面'" prop="type">
          <img :src="userInfo.drivingBack" style="width:100px; height:100px;">
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowUserInfo = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'车辆信息查看'" :visible.sync="dialogShowCarInfo">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="'车辆 ID'" prop="type">
          <el-input v-model="carInfo.id" readonly/>
        </el-form-item>

        <el-form-item :label="'车牌号'" prop="type">
          <el-input v-model="carInfo.plateNumber" readonly/>
        </el-form-item>
        <el-form-item :label="'品牌'" prop="type">
          <el-input v-model="carInfo.brand" readonly/>
        </el-form-item>
        <el-form-item :label="'型号'" prop="type">
          <el-input v-model="carInfo.model" readonly/>
        </el-form-item>

        <el-form-item :label="'城市'" prop="type">
          <el-input v-model="carInfo.city" readonly/>
        </el-form-item>

        <el-form-item :label="'颜色'" prop="type">
          <el-input v-model="carInfo.color" readonly/>
        </el-form-item>

        <el-form-item :label="'齿轮箱'" prop="type">
          <el-input v-model="carInfo.gearbox" readonly/>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowUserInfo = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'扣除违章费用'" :visible.sync="dialogShowCutPeccancy">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="'请输入费用'" prop="type">
           <el-input-number v-model="cutPeccancy" :step="1" :min="1" :max="carInfo.peccancyDeposit"></el-input-number>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCutPeccancy">提交</el-button>
        <el-button @click="dialogShowCutPeccancy = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getEndorsementList, updateEndorsement} from "@/api/order";
import { getUserById } from "@/api/user";

import { getCarById } from "@/api/car";

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

      statusValue: undefined, // 全部
      statusOptions: [
        { label: "未处理", key: "0" },
        { label: "已处理", key: "1" }
      ],

      drivingMap: {
        "0": "A1驾照",
        "1": "A2驾照",
        "2": "A3驾照",
        "3": "B1驾照",
        "4": "B2驾照",
        "5": "C1驾照",
        "6": "C2驾照"
      },

      statusMap: {
        "0": "未处理",
        "1": "已处理"
      },

      orderStatusMap: {
        "0": "待付款",
        "1": "待接单",
        "2": "已接单",
        "3": "已取车",
        "4": "已还车",
        "5": "已完成",
        "6": "已取消",
        "7": "已拒单",
        "8": "已过期"
      },

      dialogShowUserInfo: false,
      userInfo: {
        address: undefined,
        balance: undefined,
        bankCardCount: undefined,
        couponCount: undefined,
        createTime: undefined,
        drivingBack: undefined,
        drivingFront: undefined,
        drivingNum: undefined,
        drivingType: undefined,
        email: undefined,
        endorsementCount: undefined,
        hasNewMessage: undefined,
        headImg: undefined,
        id: undefined,
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
      },

      dialogShowCarInfo: false,

      carInfo: {
        brand: undefined,
        carDesc: undefined,
        carPhoto: undefined,
        carStatus: undefined,
        city: undefined,
        color: undefined,
        createTime: undefined,
        deposit: undefined,
        engineNum: undefined,
        enterModel: undefined,
        frameNum: undefined,
        gearbox: undefined,
        id: undefined,
        jfUser: undefined,
        model: undefined,
        oilNumber: undefined,
        output: undefined,
        ownerId: undefined,
        peccancyDeposit: 0,
        plateNumber: undefined,
        rent: undefined,
        safeMoney: undefined,
        seatNum: undefined,
        serviceMoney: undefined,
        unavailableTimeStart: undefined,
        unavailableTimeStop: undefined,
        updateTime: undefined,
        wantRent: undefined
      },

      dialogShowCutPeccancy: false,

      cutPeccancy: undefined,
      peccancyId: undefined
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

      let fd = new FormData();

      if (this.listQuery.page) {
        fd.append("pageInfo.pageNum", this.listQuery.page);
      }

      if (this.listQuery.date) {
        fd.append("startTime", this.formatDate(this.listQuery.date[0]));
        fd.append("endTime", this.formatDate(this.listQuery.date[1]));
      }

      if (this.listQuery.plateNum) {
        fd.append("plateNum", this.listQuery.plateNum);
      }

      if (this.listQuery.model) {
        fd.append("model", this.listQuery.model);
      }

      if (this.listQuery.nickName) {
        fd.append("nameStr", this.listQuery.nickName);
      }

      if (this.listQuery.mobile) {
        fd.append("mobile", this.listQuery.mobile);
      }

      if (this.listQuery.orderId) {
        fd.append("orderId", this.listQuery.orderId);
      }

      if (this.statusValue) {
        fd.append("peccancyStatus", this.statusValue);
      }

      if (this.listQuery.sortKey) {
        fd.append("sortKey", this.listQuery.sortKey);
      }

      getEndorsementList(fd).then(response => {
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

    handleShowUserInfo(userId) {
      let fd = new FormData();
      fd.append("userId", userId);

      getUserById(fd).then(response => {
        this.userInfo = response.data.body
        console.log("response", response);
      });

      this.dialogShowUserInfo = true;
    },

    handleShowCarInfo(carId) {

      console.log('show car id', carId);
      
      let fd = new FormData();
      fd.append("id", carId);

      getCarById(fd).then(response => {
        if(response.data.body){
          this.carInfo = response.data.body
        }
        console.log("response", response);
      });

      this.dialogShowCarInfo = true;
    },

    handleShowCutPeccancy(row) {
      // 扣除违章费用
      this.dialogShowCutPeccancy = true;
      this.peccancyId = row.id;
    },

    handleCutPeccancy() {
      // 扣除违章费用
      let fd = new FormData();
      fd.append("id", this.peccancyId);
      fd.append("actFine", this.cutPeccancy);

      updateEndorsement(fd).then(response => {
         console.log("response", response);
        if(response.data.header.code == 200){
          this.$alert('扣除违章押金成功！');
          this.dialogShowCutPeccancy = false;
        } else {
          this.$alert(response.data.heade.desc);
        }
       
      });
    }

    // 
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

