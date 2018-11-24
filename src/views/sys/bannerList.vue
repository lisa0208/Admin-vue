<template>

  <div class="app-container">
    
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

      <el-table-column :label="'位置'" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.position }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'文案'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bannerDesc }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="'跳转链接'" width="300px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jumpUrl }}</span>
        </template>
      </el-table-column> -->

      <el-table-column :label="'图片'" width="110px" align="center">
        <template slot-scope="scope">
          <img :src='scope.row.carBannerImg' style='width:100px; height:100px;'>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateBanner(scope.row, 1)" v-if="scope.row.status==0">上线</el-button>
          <el-button type="info" size="mini" @click="handleUpdateBanner(scope.row, 0)" v-if="scope.row.status==1">下线</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteBanner(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>

</template>

<script>
import { getBannerList, updateBanner, deleteBanner } from "@/api/sys";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import env from "../../../config/sit.env";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      uploadUrl: env.BASE_API + "/file/upload",

      list: null,
      total: 0,
      listLoading: true,

      listQuery: {
        page: 1,
        brannd: undefined
      },

      dialogShowAddBrand: false,
      brandInfo: {
        brand: undefined,
        hotBrand: undefined,
        brandImg: undefined
      }
    };
  },

  created() {
    this.getList();
  },

  methods: {
    getList(data) {
      this.listLoading = true;

      getBannerList().then(response => {
        this.list = response.data.body.infos;
        // this.total = response.data.body.length;
        this.listLoading = false;
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    sortChange(data) {
      const { prop, order } = data;
    },

    handleUpdateBanner(row, status) {
      let fd = new FormData();
      fd.append("id", row.id);
      fd.append("position", row.position);
      fd.append("status", status);

      updateBanner(fd).then(response => {
        this.getList();
        this.$message({
          type: "success",
          message: "更新 Banner 状态成功!"
        });
      });
    },

    handleDeleteBanner(row) {
      this.$confirm("确认删除该 Banner?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("bannerId", row.id);

          deleteBanner(fd).then(response => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除Banner成功!"
            });
          });
        })
        .catch(err => {
          console.log("取消", err);
        });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

