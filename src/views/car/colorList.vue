<template>

  <div class="app-container">

    <div class="filter-container">

      <el-input :placeholder="'颜色'" v-model="listQuery.color" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleShowAddUser">添加</el-button>

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

      <el-table-column :label="'颜色'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'创建时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'更新时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
         <el-button type="danger" size="mini" @click="handleDeleteColor(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="'添加颜色'" :visible.sync="dialogShowAddUser">

      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'颜色'" prop="type">
          <el-input v-model="color"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddBrand">新增</el-button>
      </div>

    </el-dialog>

  </div>

</template>

<script>
import { fetchColorList, addColor, deleteCarColor} from '@/api/car'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import env from '../../../config/sit.env'

export default {
  name: 'CarList',
  components: { Pagination },

  data() {
    return {
      uploadUrl: env.BASE_API + '/file/upload',

      list: null,
      total: 0,
      listLoading: true,

      listQuery: {
        page: 1,
        color: undefined
      },

      dialogShowAddUser: false,
      color: undefined
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

      if (this.listQuery.color) {
        fd.append("color", this.listQuery.color);
      }

      fetchColorList(fd).then(response => {
        this.list = response.data.body
        this.total = response.data.body.length
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

    handleShowAddUser(user) {
      this.dialogShowAddUser = true
    },

    handleAddBrand(user) {
      this.dialogShowAddUser = true;
      let fd = new FormData();
      fd.append('color', this.color);
      let self = this;

      addColor(fd).then(response => {
        this.dialogShowAddUser = false;
        self.getList();
      })
    },

    handleUploadSuccess() {},
    handleUploadSuccess() {},
    beforeUpload(data, a, b, c) {
      console.log(data, a, b, c)
    },

    handleDeleteColor(row) {
      this.$confirm("确认删除颜色?请确保该颜色下无车辆", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("id", row.id);

          deleteCarColor(fd).then(response => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除颜色成功!"
            });
          });
        })
        .catch((err) => {
          console.log("取消", err);
        });
    }

  }
}
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
    border-color: #409EFF;
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

