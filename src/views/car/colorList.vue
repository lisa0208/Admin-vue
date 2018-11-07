<template>

  <div class="app-container">

    <div class="filter-container">

      <el-input :placeholder="'颜色'" v-model="listQuery.plateNo" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleShowAddUser">{{ $t('table.add') }}</el-button>

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

      <el-table-column :label="'颜色'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.color }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'创建时间'" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'更新时间'" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
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
import { fetchColorList, addColor} from '@/api/car'
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
        brannd: undefined
      },

      dialogShowAddUser: false,
      color: undefined
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      this.listLoading = true
      fetchColorList(this.listQuery).then(response => {
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

