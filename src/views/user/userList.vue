<template>
  <div class="app-container">

    <div class="filter-container">
      
      <el-input :placeholder="'姓名'" v-model="listQuery.username" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'手机号'" v-model="listQuery.mobilePhone" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="chekcValue" :placeholder="'状态(全部/未审核/已审核)'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in checkOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-select v-model="passValue" :placeholder="'审核(全部/通过/未通过)'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in passOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>

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

      <el-table-column :label="'用户姓名'" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'用户状态'" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.userStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'手机号'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'用户信息'" width="110px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleViewUserInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column :label="'注册时间'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePass(scope.row, 1)">通过</el-button>
          <el-button type="danger" size="mini" @click="handlePass(scope.row, 2)">拒绝</el-button>
          <el-button type="primary" size="mini" @click="handlePass(scope.row, 3)">拉黑</el-button>
          <el-button type="danger" size="mini" @click="handlePass(scope.row, 0)">解禁</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="'用户信息查看'" :visible.sync="dialogShowOwnerInfo">
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

  </div>
</template>

<script>
import { fetchUserList, updateUser } from '@/api/user'
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
        city: undefined,
        plateNo: undefined,
        model: undefined,
        username: undefined,
        mobilePhone: undefined
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
      }
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
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

    handleViewUserInfo(user) {
      this.dialogShowOwnerInfo = true
      this.ownerInfo = user
    },

    handlePass(row, status) {

      let fd = new FormData();
      fd.append('id', row.id);
      fd.append('userStatus', status);

      updateUser(fd).then(response => {
        this.listLoading = false;
        this.getList();
      })
    }
  }
}
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

