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
      <el-input :placeholder="'手机号'" v-model="listQuery.mobile" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="statusValue" :placeholder="'订单状态'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">添加</el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">

      <el-table-column :label="'订单ID'" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'支付时间'" width="160px" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.orderPayTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单状态'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ orderStatusMap[scope.row.orderType] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单天数'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.orderDays}}</span>
        </template>
      </el-table-column>

      

      <el-table-column :label="'车辆ID'" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'实际费用(元)'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.actualFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'应付费用(元)'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shouldFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'优惠券ID'" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.couponId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车辆押金扣费(元)'" width="250px" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.cutCarFee" :precision="2" :step="100"  :min="0" :disabled="scope.row.orderType!=3"></el-input-number>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="'违章押金扣费(元)'" width="110px" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cutPeccancyFee"/>
        </template>
      </el-table-column> -->

      <el-table-column :label="'订单开始时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderStartTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单结束时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderStopTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车主信息'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowOwnerInfo(scope.row.jfUser)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="'车辆信息'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowCarInfo(scope.row.jfCar)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleOrder1(scope.row)" v-if="scope.row.orderType==1">接单</el-button>
          <el-button type="danger" size="mini" @click="handleOrder2(scope.row)" v-if="scope.row.orderType==1">拒单</el-button>
          <el-button type="danger" size="mini" @click="handleOrder3(scope.row)" v-if="scope.row.orderType==2">确认已送车</el-button>
          <el-button type="danger" size="mini" @click="handleOrder4(scope.row)" v-if="scope.row.orderType==3">扣车辆押金</el-button>
          <el-button type="danger" size="mini" @click="handleOrder5(scope.row)" v-if="scope.row.orderType==4">扣违章押金</el-button>
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
          <img :src="ownerInfo.idcardFront" style="width:100px; height:100px;">
        </el-form-item>

        <el-form-item :label="'身份证反面'" prop="type">
          <img :src="ownerInfo.idcardBack" style="width:100px; height:100px;">
        </el-form-item>

        <el-form-item :label="'驾照'" prop="type">
          <el-input v-model="ownerInfo.drivingNum"/>
        </el-form-item>

        <el-form-item :label="'驾照类型'" prop="type">
          <el-input v-model="drivingMap[ownerInfo.drivingType]"/>
        </el-form-item>

        <el-form-item :label="'驾照正面'" prop="type">
          <img :src="ownerInfo.drivingFront" style="width:100px; height:100px;">
        </el-form-item>

        <el-form-item :label="'驾照反面'" prop="type">
          <img :src="ownerInfo.drivingBack" style="width:100px; height:100px;">
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowOwnerInfo = false">关闭</el-button>
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
        <el-button @click="dialogShowCarInfo = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchOrderList, updateOrderStatus, updateOrder } from "@/api/order";
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
        { label: "待付款", key: "0" },
        { label: "待接单", key: "1" },
        { label: "已接单", key: "2" },
        { label: "已取车", key: "3" },
        { label: "已还车", key: "4" },
        { label: "已完成", key: "5" },
        { label: "已取消", key: "6" },
        { label: "已拒单", key: "7" },
        { label: "已过期", key: "8" }
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
        peccancyDeposit: undefined,
        plateNumber: undefined,
        rent: undefined,
        safeMoney: undefined,
        seatNum: undefined,
        serviceMoney: undefined,
        unavailableTimeStart: undefined,
        unavailableTimeStop: undefined,
        updateTime: undefined,
        wantRent: undefined
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

      if (this.listQuery.mobile) {
        fd.append("mobile", this.listQuery.mobile);
      }

      if (this.listQuery.orderId) {
        fd.append("orderId", this.listQuery.orderId);
      }

      if (this.statusValue) {
        fd.append("orderType", this.statusValue);
      }

      if (this.listQuery.sortKey) {
        fd.append("sortKey", this.listQuery.sortKey);
      }

      fetchOrderList(fd).then(response => {
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

    // 接单
    handleOrder1(row) {
      this.$confirm("确认要接单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("orderId", row.orderId);
          fd.append("event", 0);
          fd.append("oprateUserId", 0);

          updateOrderStatus(fd).then(response => {
            console.log(response);

            this.$message({
              type: "success",
              message: "接单成功，请按照客户填写的时间、地点准确送车!"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },

    // 拒单
    handleOrder2(row) {
      this.$confirm("确认要拒单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("orderId", row.orderId);
          fd.append("event", 1);
          fd.append("oprateUserId", 0);

          updateOrderStatus(fd).then(response => {
            console.log(response);

            this.$message({
              type: "success",
              message: "拒单成功!"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },

    // 已送车
    handleOrder3(row) {
      this.$confirm("确认已经将车送给客户了?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("orderId", row.orderId);
          fd.append("event", 2);
          fd.append("oprateUserId", 0);

          updateOrderStatus(fd).then(response => {
            console.log(response);

            this.$message({
              type: "success",
              message: "确认送车成功，请留意后续客户还车动态!"
            });
            this.getList();
          });
        })
        .catch(() => {});
    },

    // 退还车辆押金
    handleOrder4(row) {
      let cutCarFee = row.cutCarFee;

      let fd = new FormData();
      fd.append("orderId", row.orderId);
      fd.append("cutCarFee", cutCarFee);
      fd.append("oprateUserId", 1);

      // 先存入车辆押金的数字
      updateOrder(fd).then(response => {
        if (response.data.header.code != 200) {
          this.$alert(response.data.header.desc);
        } else {
          this.$confirm(
            "确认扣除车辆押金" + cutCarFee + "元?请确保车已归还！",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              let fd = new FormData();
              fd.append("orderId", row.orderId);
              fd.append("event", 3);
              fd.append("oprateUserId", 1);

              updateOrderStatus(fd).then(response => {
                console.log(response);

                this.$message({
                  type: "success",
                  message: "退还车辆押金成功，请留意后续步骤!"
                });
                this.getList();
              });
            })
            .catch(() => {});
        }
      });
    },

    // 退还违章押金
    handleOrder5(row) {
      let cutPeccancyFee = row.cutPeccancyFee;

      let fd = new FormData();
      fd.append("orderId", row.orderId);
      fd.append("cutPeccancyFee", cutPeccancyFee);
      fd.append("oprateUserId", 1);

      // 先存入应扣除的违章押金的数字
      updateOrder(fd).then(response => {
        if (response.data.header.code != 200) {
          this.$alert(response.data.header.desc);
        } else {
          this.$confirm(
            "确认扣除违章押金?请确保车已归还、违章结果已审核！",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              let fd = new FormData();
              fd.append("orderId", row.orderId);
              fd.append("event", 4);
              fd.append("oprateUserId", 1);

              updateOrderStatus(fd).then(response => {
                console.log(response);

                this.$message({
                  type: "success",
                  message: "退还违章押金成功，本订单已经关闭!"
                });
                this.getList();
              });
            })
            .catch(() => {});
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

