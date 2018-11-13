<template>
  <div class="app-container">

    <div class="filter-container">

      <el-input clearable :placeholder="'车牌号'" v-model="listQuery.plateNum" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input clearable :placeholder="'型号'" v-model="listQuery.model" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input clearable :placeholder="'用户名'" v-model="listQuery.nameStr" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input clearable :placeholder="'手机号'" v-model="listQuery.mobile" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="statusValue" :placeholder="'车辆状态'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="goToAddCar">添加</el-button> -->

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

      <el-table-column :label="'车主姓名'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jfUser.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'手机号'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jfUser.mobile }}</span>
        </template>
      </el-table-column>

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

      <el-table-column :label="'车辆状态'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ carStatusMap[scope.row.carStatus] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'颜色'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'不可用开始时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unavailableTimeStart }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'不可用结束时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unavailableTimeStop }}</span>
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

      <el-table-column :label="'车辆照片'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowCarPhoto(scope.row.carPhoto)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePass(scope.row, 1)" v-if="scope.row.carStatus==2">上线</el-button>
          <el-button type="danger" size="mini" @click="handlePass(scope.row, 2)" v-if="scope.row.carStatus==1">下线</el-button>
          <el-button type="danger" size="mini" @click="setUnavaluableDays(scope.row)" v-if="scope.row.carStatus==1">设置不可用日期</el-button>
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
          <img :src="ownerInfo.idcardFront" style='width:150px; height:150px' @click='handleShowViewPhoto(ownerInfo.idcardFront)'>
        </el-form-item>

        <el-form-item :label="'身份证反面'" prop="type">
          <img :src="ownerInfo.idcardBack" style='width:150px; height:150px' @click='handleShowViewPhoto(ownerInfo.idcardBack)'>
        </el-form-item>

        <el-form-item :label="'驾照'" prop="type">
          <el-input v-model="ownerInfo.drivingNum" readonly/>
        </el-form-item>

        <el-form-item :label="'驾照类型'" prop="type">
          <el-input v-model="drivingMap[ownerInfo.drivingType]" readonly/>
        </el-form-item>

        <el-form-item :label="'驾照正面'" prop="type">
          <img :src="ownerInfo.drivingFront" style='width:150px; height:150px' @click='handleShowViewPhoto(ownerInfo.drivingFront)'>
        </el-form-item>

        <el-form-item :label="'驾照反面'" prop="type">
          <img :src="ownerInfo.drivingBack" style='width:150px; height:150px' @click='handleShowViewPhoto(ownerInfo.drivingBack)'>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowOwnerInfo = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'车辆照片查看'" :visible.sync="dialogShowCarPhoto">

      <el-carousel height="300px" width="400px" indicator-position="outside">
      <el-carousel-item v-for="item in carPhoto" :key="item">
        <img :src="item" style='width:400px;height:300px'>
      </el-carousel-item>
      </el-carousel>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowOwnerInfo = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'预览照片'" :visible.sync="showViewPhoto" fullscreen> 

      <img :src='viewPhotoURL'>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showViewPhoto = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'设置不可用日期'" :visible.sync="dialogShowUnavailableDays">
      
      <el-form label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        
        <el-form-item :label="'请选择日期范围'" prop="type">
          <el-date-picker
            v-model="unavailableDays"
            class="filter-item"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期时间"
            end-placeholder="结束日期时间"/>
          </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSetUnavailableDays">设置</el-button>
        <el-button @click="dialogShowUnavailableDays = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchCarList, updateCar } from "@/api/car";
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
        plateNo: undefined,
        model: undefined,
        nameStr: undefined,
        mobile: undefined
      },

      cityOptions: [{ label: "上海", key: "1" }],

      statusValue: undefined, // 全部
      statusOptions: [
        // { label: "未审核", key: "0" },
        { label: "上线", key: "1" },
        { label: "下线", key: "2" },
        // { label: "审核通过", key: "3" },
        // { label: "未通过", key: "4" },
        // { label: "已预定", key: "5" }
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

      carStatusMap: {
        "0": "未审核",
        "1": "上线",
        "2": "下线",
        "3": "审核通过",
        "4": "未通过",
        "5": "已预定"
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
        nameStr: undefined,
        password: undefined,
        qualityType: undefined,
        updateTime: undefined,
        userOpenId: undefined,
        userStatus: undefined,
        userType: undefined
      },

      dialogShowUnavailableDays: false,
      unavailableDays: undefined,

      rowCarId: undefined,
      rowUserId: undefined,

      dialogShowCarPhoto: false,
      carPhoto: [],

      showViewPhoto: false,
      viewPhotoURL: undefined
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList(data) {
      this.listLoading = true;

      let fd = new FormData();

      if (data && data.page) {
        this.listQuery.page = data.page;
      }

      if (this.listQuery.page) {
        fd.append("pageInfo.pageNum", this.listQuery.page);
      }

      if (this.listQuery.plateNum) {
        fd.append("plateNum", this.listQuery.plateNum);
      }

      if (this.listQuery.model) {
        fd.append("model", this.listQuery.model);
      }

      if (this.listQuery.nameStr) {
        fd.append("nameStr", this.listQuery.nameStr);
      }

      if (this.listQuery.mobile) {
        fd.append("mobile", this.listQuery.mobile);
      }

      if (this.statusValue) {
        fd.append("carStatus", this.statusValue);
      }

      fetchCarList(fd).then(response => {
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
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },

    handleShowOwnerInfo(user) {
      this.dialogShowOwnerInfo = true;
      this.ownerInfo = user;
    },

    

    handleShowCarPhoto(carPhoto) {
      this.dialogShowCarPhoto = true;
      this.carPhoto = carPhoto.split(",");
      console.log('this.carPhoto', this.carPhoto)
    },

    handlePass(row, status) {
      let fd = new FormData();
      fd.append("jfCar.id", row.id);
      fd.append("jfUser.id", row.jfUser.id);
      fd.append("jfCar.carStatus", status);

      updateCar(fd).then(response => {
        this.getList();
      });
    },

    setUnavaluableDays(row) {
      this.rowCarId = row.id;
      this.rowUserId = row.jfUser.id;
      this.dialogShowUnavailableDays = true;
    },

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

    handleSetUnavailableDays() {
      if (this.unavailableDays) {

        let startTime = this.unavailableDays[0];
        let endTime = this.unavailableDays[1];

        let fd = new FormData();
        fd.append("jfCar.id", this.rowCarId);
        fd.append("jfUser.id", this.rowUserId);
        fd.append("jfCar.unavailableTimeStart", this.formatDate(startTime));
        fd.append("jfCar.unavailableTimeStop", this.formatDate(endTime));

        updateCar(fd).then(response => {
          this.dialogShowUnavailableDays = false;
          this.getList();
        });
      } else {
        this.$alert("请选择起止时间");
      }
    },

    handleShowViewPhoto(URL) {
      this.showViewPhoto = true;
      this.viewPhotoURL = URL;
    },

    goToAddCar() {
      window.location.href = "/#/car/car-add/:id";
    }
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
.el-dialog__body .el-range-editor--medium .el-range-input,
.el-dialog__body .el-range-editor--medium .el-range-separator {
  top: 0px !important;
}

</style>

