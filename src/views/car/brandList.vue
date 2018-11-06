<template>

  <div class="app-container">

    <div class="filter-container">

      <el-input :placeholder="'品牌'" v-model="listQuery.plateNum" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleShowBrand">{{ $t('table.add') }}</el-button>

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

      <el-table-column :label="'品牌'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brand }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleStatus(scope.row, 1)">上线</el-button>
          <el-button type="danger" size="mini" @click="handleStatus(scope.row, 0)">下线</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="'车主信息查看'" :visible.sync="dialogShowAddBrand">

      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'品牌'" prop="type">
          <el-input v-model="brandInfo.brand"/>
        </el-form-item>
        <el-form-item :label="'是否热门品牌'" prop="type">
          
          <el-select v-model="brandInfo.hotBrand" :placeholder="'请选择'" clearable style="width: 220px" class="filter-item">
            <el-option  :label="'是'" :value="1"/>
            <el-option  :label="'否'" :value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="'品牌图片'" prop="type">
          <el-upload
            :action="uploadUrl"
            :show-file-list="false"
            :http-request = "beforeUpload"
            class="avatar-uploader">
            <img v-if="brandInfo.brandImg" :src="brandInfo.brandImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddBrand">新增</el-button>
      </div>

    </el-dialog>

  </div>

</template>

<script>
import { fetchBrandList, addBrand } from "@/api/car";
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
        plateNum: undefined,
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
    getList() {
      this.listLoading = true;
      fetchBrandList(this.listQuery).then(response => {
        this.list = response.data.body;
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
      fd.append('brand', this.brandInfo.brand);
      fd.append('hotBrand', this.brandInfo.hotBrand);
      fd.append('brandImg', this.brandInfo.brandImg);
      addBrand(fd).then(response => {
       this.dialogShowAddBrand = false;
      });
    },

    handleUploadSuccess() {},

    

    beforeUpload(data) {
      console.log(data);

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
    }
  }
};
</script>

<style scoped>
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

