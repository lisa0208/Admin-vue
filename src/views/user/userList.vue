<template>
  <div class="app-container">

    <div class="filter-container">
      
      <el-input :placeholder="'姓名'" v-model="listQuery.nameStr" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input :placeholder="'手机号'" v-model="listQuery.mobile" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-select v-model="listQuery.status" :placeholder="'用户状态'" clearable style="width: 220px" class="filter-item">
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

      <el-table-column :label="'ID'" prop="id" align="center" width="100">
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
          <span>{{ statusMap[scope.row.userStatus] }}</span>
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

      <el-table-column :label="'注册时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleShowPass(scope.row)" v-if="scope.row.userStatus==0">通过</el-button>
          <el-button type="danger" size="mini" @click="handleNoPass(scope.row, 2)" v-if="scope.row.userStatus==0">拒绝</el-button>
          <el-button type="primary" size="mini" @click="handlePass(scope.row, 3)" v-if="scope.row.userStatus==1">拉黑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="'用户信息查看'" :visible.sync="dialogShowOwnerInfo">
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

    <el-dialog :title="'用户信息审核补全'" :visible.sync="dialogShowFullUserInfo">
      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'姓名'" prop="type">
          <el-input v-model="userInfo.name"/>
        </el-form-item>
        <el-form-item :label="'手机号'" prop="type">
          <el-input v-model="userInfo.mobile" disabled/>
        </el-form-item>
        <el-form-item :label="'身份证'" prop="type">
          <el-input v-model="idcard"/>
        </el-form-item>

        <el-form-item :label="'身份证正面'" prop="type">
          <img :src="userInfo.idcardFront" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'身份证反面'" prop="type">
          <img :src="userInfo.idcardBack" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'驾照'" prop="type">
          <el-input v-model="userInfo.drivingNum"/>
        </el-form-item>

        <el-form-item :label="'驾照类型'" prop="type">
          <el-select v-model="drivingValue" :placeholder="'请选择驾照类型'" clearable style="width: 220px" class="filter-item">
        <el-option v-for="item in drivingOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
        </el-form-item>

        <el-form-item :label="'驾照正面'" prop="type">
          <img :src="userInfo.drivingFront" style='width:150px; height:150px'>
        </el-form-item>

        <el-form-item :label="'驾照反面'" prop="type">
          <img :src="userInfo.drivingBack" style='width:150px; height:150px'>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type='primary' @click="submitFullUserInfo">提交</el-button>
        <el-button @click="dialogShowOwnerInfo = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'请输入审核不通过原因'" :visible.sync="dialogShowInputNoPass">

      <el-form label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'拒绝原因'" prop="type">
          <el-input v-model="noPassReason" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitNoPass">提交</el-button>
        <el-button @click="dialogShowInputNoPass = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchUserList, updateUser } from "@/api/user";
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
        nameStr: undefined,
        mobile: undefined,
        status: undefined
      },

      cityOptions: [{ label: "上海", key: "上海" }],

      statusOptions: [
        { label: "未审核", key: "0" },
        { label: "已审核", key: "1" },
        { label: "未通过", key: "2" },
        { label: "已拉黑", key: "3" }
      ],

      statusMap: {
        "0": "未审核",
        "1": "已审核",
        "2": "未通过",
        "3": "已拉黑"
      },

      drivingMap: {
        "0": "A1驾照",
        "1": "A2驾照",
        "2": "A3驾照",
        "3": "B1驾照",
        "4": "B2驾照",
        "5": "C1驾照",
        "6": "C2驾照"
      },

      drivingOptions: [
        { label: "A1驾照", key: "0" },
        { label: "A2驾照", key: "1" },
        { label: "A3驾照", key: "2" },
        { label: "B1驾照", key: "3" },
        { label: "B2驾照", key: "4" },
        { label: "C1驾照", key: "5" },
        { label: "C2驾照", key: "6" }
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

      dialogShowFullUserInfo: false,

      drivingValue: undefined,
      idcard: undefined,
      userInfo: {
        balance: undefined,
        bankCardCount: undefined,
        createTime: undefined,
        drivingBack: undefined,
        drivingFront: undefined,
        drivingNum: undefined,
        drivingType: undefined,
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

      dialogShowInputNoPass: false,
      noPassUserId: undefined,
      noPassReason: undefined
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList(data) {
      this.listLoading = true;

      if (data && data.page) {
        this.listQuery.page = data.page;
      }

      let fd = new FormData();

      if (this.listQuery.page) {
        fd.append("pageInfo.pageNum", this.listQuery.page);
      }

      if (this.listQuery.nameStr) {
        fd.append("nameStr", this.listQuery.nameStr);
      }

      if (this.listQuery.mobile) {
        fd.append("mobile", this.listQuery.mobile);
      }

      if (this.listQuery.status) {
        fd.append("userStatus", this.listQuery.status);
      }

      fetchUserList(fd).then(response => {
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

    handleViewUserInfo(user) {
      this.dialogShowOwnerInfo = true;
      this.ownerInfo = user;
    },

    submitFullUserInfo() {
      if (this.drivingValue && this.idcard && this.userInfo.name) {
        let fd = new FormData();
        fd.append("id", this.userInfo.id);
        fd.append("userStatus", 1);
        fd.append("idcard", this.idcard);
        fd.append("drivingNum", this.drivingValue);
        fd.append("drivingType", this.drivingValue);
        fd.append("name", this.userInfo.name);

        updateUser(fd).then(response => {
          this.listLoading = false;
          this.getList();
          this.dialogShowFullUserInfo = false;
        });
      } else {
        this.$alert("请完善用户信息");
      }
    },

    handleShowPass(row, status) {
      console.log(row);

      this.dialogShowFullUserInfo = true;
      this.userInfo = row;
    },

    handlePass(row, status) {
      this.$confirm("确定拉黑用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("id", row.id);
          fd.append("userStatus", status);

          updateUser(fd).then(response => {
            this.listLoading = false;
            this.getList();
          });
        })
        .catch(() => {

        });
    },

    // 拒绝逻辑
    handleNoPass(row, status) {
      this.noPassUserId = row.id;

      this.dialogShowInputNoPass = true;
    },

    handleSubmitNoPass() {
      let fd = new FormData();
      fd.append("id", this.noPassUserId);
      fd.append("userStatus", 2);
      fd.append("failedReason", this.noPassReason);

      updateUser(fd).then(response => {
        this.listLoading = false;
        this.dialogShowInputNoPass = false;
        this.getList();
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

