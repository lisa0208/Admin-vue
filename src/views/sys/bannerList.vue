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

      <el-table-column :label="'跳转链接'" width="300px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jumpUrl }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'图片'" width="110px" align="center">
        <template slot-scope="scope">
          <img :src='scope.row.carBannerImg' style='width:100px; height:100px;'>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDeleteBrand(scope.row)">上线</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteBrand(scope.row)">下线</el-button>
          <el-button type="danger" size="mini" @click="handleDeleteBrand(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>

</template>

<script>
import { getBannerList } from "@/api/sys";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import env from "../../../config/sit.env";
import axios from "axios";

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
        this.total = response.data.body.length;
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

    handleShowBrand(user) {
      this.dialogShowAddBrand = true;
    },

    handleAddBrand(user) {
      this.dialogShowbrandInfo = true;

      let fd = new FormData();
      fd.append("brand", this.brandInfo.brand);
      fd.append("hotBrand", this.brandInfo.hotBrand);
      fd.append("brandImg", this.brandInfo.brandImg);
      addBrand(fd).then(response => {
        this.dialogShowAddBrand = false;
        this.getList();
      });
    },

    handleUploadSuccess() {},

    beforeUpload(data) {
      let fd = new FormData();
      fd.append("uploadFile", data.file);

      let self = this;

      // 自己上传文件 想加什么都可以
      axios
        .post(env.BASE_API + "/file/upload", fd, {
          // 加这里
          headers: {
            jf_token:
              "r3IIy2il3mhaOgXvnsN4P2vunUNbgZIWEltP1RBuvz9n5ue2mMgyx/NavsDhw6WE2nQFoIss63nQJtWAwtrTWg=="
          }
        })
        .then(function(response) {
          console.log(response.data.body);
          self.brandInfo.brandImg = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });

      return false; // 返回false不会自动上传
    },

    handleDeleteBrand(row) {
      this.$confirm("确认删除品牌?请确保该品牌下无型号和车辆", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("id", row.id);

          deleteCarBrand(fd).then(response => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除品牌成功!"
            });
          });
        })
        .catch((err) => {
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

