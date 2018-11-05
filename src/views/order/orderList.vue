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

      <el-input :placeholder="'订单号'" v-model="listQuery.plateNo" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'用户名'" v-model="listQuery.username" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'车牌号'" v-model="listQuery.plateNo" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'手机号'" v-model="listQuery.mobilePhone" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'型号'" v-model="listQuery.model" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'颜色'" v-model="listQuery.model" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="chekcValue" :placeholder="'状态(全部/未审核/已审核)'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in checkOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">{{ $t('table.add') }}</el-button>

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

      <el-table-column :label="'车辆ID'" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.carId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'优惠券ID'" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.couponId }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单类型'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderType }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'应付费用'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shouldFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'实际费用'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.actualFee }}</span>
        </template>
      </el-table-column>

      

      <el-table-column :label="'扣除费用'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cutFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'违章扣费'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cutPeccancyFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车辆扣费'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cutCarFee }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'支付时间'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderPayTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单开始时间'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderStartTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'订单结束时间'" width="110px" align="center">
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

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePass(scope.row, 1)">上线</el-button>
          <el-button type="danger" size="mini" @click="handlePass(scope.row, 0)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="'车主信息查看'" :visible.sync="dialogShowOwnerInfo">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'姓名'" prop="type">
          <el-input v-model="ownerInfo.name"/>
        </el-form-item>
        <el-form-item :label="'手机号'" prop="type">
          <el-input v-model="ownerInfo.mobile"/>
        </el-form-item>
        <el-form-item :label="'身份证'" prop="type">
          <el-input v-model="ownerInfo.idcard"/>
        </el-form-item>

        <el-form-item :label="'身份证正面'" prop="type">
          <img :src="ownerInfo.idcardFront">
        </el-form-item>

        <el-form-item :label="'身份证反面'" prop="type">
          <img :src="ownerInfo.idcardBack">
        </el-form-item>

        <el-form-item :label="'驾照'" prop="type">
          <el-input v-model="ownerInfo.drivingNum"/>
        </el-form-item>

        <el-form-item :label="'驾照类型'" prop="type">
          <el-input v-model="ownerInfo.drivingType"/>
        </el-form-item>

        <el-form-item :label="'驾照正面'" prop="type">
          <img :src="ownerInfo.drivingFront">
        </el-form-item>

        <el-form-item :label="'驾照反面'" prop="type">
          <img :src="ownerInfo.drivingBack">
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowOwnerInfo = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'车辆信息查看'" :visible.sync="dialogShowCarInfo">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item :label="'车辆 ID'" prop="type">
          <el-input v-model="ownerInfo.plateNumber"/>
        </el-form-item>

        <el-form-item :label="'车牌号'" prop="type">
          <el-input v-model="ownerInfo.plateNumber"/>
        </el-form-item>
        <el-form-item :label="'品牌'" prop="type">
          <el-input v-model="ownerInfo.brand"/>
        </el-form-item>
        <el-form-item :label="'型号'" prop="type">
          <el-input v-model="ownerInfo.model"/>
        </el-form-item>

        <el-form-item :label="'城市'" prop="type">
          <img :src="ownerInfo.city">
        </el-form-item>

        <el-form-item :label="'颜色'" prop="type">
          <img :src="ownerInfo.color">
        </el-form-item>

        <el-form-item :label="'齿轮箱'" prop="type">
          <el-input v-model="ownerInfo.gearbox"/>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShowOwnerInfo = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchOrderList } from '@/api/order'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CarList',
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
        city: '1',
        plateNo: '',
        model: '',
        username: '',
        mobilePhone: ''
      },

      cityOptions: [{ label: '上海', key: '1' }],

      chekcValue: undefined, // 全部
      checkOptions: [
        { label: '未审核', key: '0' },
        { label: '已审核', key: '1' }
      ],

      passValue: undefined, // 全部
      passOptions: [
        { label: '审核通过', key: '1' },
        { label: '审核不通过', key: '0' }
      ],

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
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true
      fetchOrderList(this.listQuery).then(response => {
        this.list = response.data.body.infos
        this.total = response.data.body.pageInfo.size
        this.listLoading = false
      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },

    handleShowOwnerInfo(user) {
      this.dialogShowOwnerInfo = true
      this.ownerInfo = user
    },

    handleShowCarInfo(car) {
      this.dialogShowCarInfo = true
      this.carInfo = car
    },

    handlePass() {}
  }
}
</script>

<style>
.el-range-editor--small .el-range-input {
  font-size: 13px;
  position: relative;
  top: -8px;
}
.el-range-editor--small .el-range-separator {
  line-height: 24px;
  font-size: 13px;
  position: relative;
  top: -8px;
}
</style>

