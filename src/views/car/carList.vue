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
      <el-input :placeholder="'手机号'" v-model="listQuery.mobile" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="statusValue" :placeholder="'车辆状态'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="goToAddCar">{{ $t('table.add') }}</el-button>

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

      <el-table-column :label="'申请时间'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'车主信息'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowOwnerInfo(scope.row.jfUser)">查看</el-button>
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
          <img :src="ownerInfo.idcardFront" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'身份证反面'" prop="type">
          <img :src="ownerInfo.idcardBack" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'驾照'" prop="type">
          <el-input v-model="ownerInfo.drivingNum"/>
        </el-form-item>

        <el-form-item :label="'驾照类型'" prop="type">
          <el-input v-model="ownerInfo.drivingType"/>
        </el-form-item>

        <el-form-item :label="'驾照正面'" prop="type">
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
import { fetchCarList } from '@/api/car'
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
        plateNo: undefined,
        model: undefined,
        nickName: undefined,
        mobile: undefined
      },

      cityOptions: [{ label: '上海', key: '1' }],

      statusValue: undefined, // 全部
      statusOptions: [
        { label: "未审核", key: "0" },
        { label: "上线", key: "1" },
        { label: "下线", key: "2" },
        { label: "审核通过", key: "3" },
        { label: "未通过", key: "4" },
        { label: "已预定", key: "5" }
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

    }
  },

  created() {
    this.getList()
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

      if (this.listQuery.mobile) {
        fd.append("mobile", this.listQuery.mobile);
      }

      if (this.statusValue) {
        fd.append("carStatus", this.statusValue);
      }

      


      fetchCarList(fd).then(response => {
        this.list = response.data.body.infos
        this.total = response.data.body.pageInfo.total
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

    handlePass() {},
    goToAddCar(){
      window.location.href = '/#/car/car-add/:id'
    }
  }
}
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
</style>

