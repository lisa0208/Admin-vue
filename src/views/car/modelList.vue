<template>

  <div class="app-container">

    <div class="filter-container">

      <!-- <el-select v-model="carBrand" :placeholder="'品牌'" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in brandList" :key="item.id" :label="item.brand" :value="item.id"/>
      </el-select> -->

      <!-- <el-input :placeholder="'型号'" v-model="carModel" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/> -->

      <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleShowBrand">添加</el-button>

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

      <el-table-column :label="'品牌'" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.brandName }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'型号'" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.model }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'创建时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="'更新时间'" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column> -->

      <el-table-column :label="'操作'" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="HandleDeleteCarModel(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog :title="'添加车辆型号'" :visible.sync="dialogShowAddBrand">

      <el-form ref="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="'请选择品牌'" prop="type">
          
          <el-select v-model="selectedCarBrand" :placeholder="'品牌'" clearable style="width: 90px" class="filter-item">
            <el-option v-for="item in brandList" :key="item.id" :label="item.brand" :value="item.id"/>
          </el-select>
          
        </el-form-item>
        <el-form-item :label="'请输入型号'" prop="type">
          <el-input v-model="addedCarModel"/>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddModel">新增</el-button>
      </div>

    </el-dialog>

  </div>

</template>

<script>
import { fetchModelList, fetchBrandList, addModel, fetchModelByBrand, deleteCarModel} from '@/api/car'
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

      dialogShowAddBrand: false,
      brandInfo: {
        brand: undefined,
        hotBrand: undefined,
        brandImg: undefined
      },

      selectedCarBrand: undefined,
      addedCarModel: undefined,

      carModel: undefined,
      carBrand: undefined,
      brandList: []
    }
  },

  created() {
    this.getBrandList();
    this.getList();
  },

  methods: {

    getList() {
      this.listLoading = true;

      // let fd = new FormData();
      // if(this.carBrand){
      //   fd.append('id', this.carBrand);
      // }

      fetchModelList().then(response => {
        this.list = response.data.body
        this.listLoading = false
      })
    },

    getBrandList() {
      fetchBrandList(this.listQuery).then(response => {
        this.brandList = response.data.body;
        console.log(this.brandList)
      })
    },



    handleFilter() {
      this.listQuery.page = 1
      this.getList();
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },

    handleShowBrand(user) {
      this.dialogShowAddBrand = true
    },

    handleAddBrand(user) {
      this.dialogShowAddBrand = true
    },

    handleUploadSuccess() {},
    handleUploadSuccess() {},
    beforeUpload(data, a, b, c) {
      console.log(data, a, b, c)
    },

    handleAddModel(){

      let fd = new FormData();
      fd.append('brandId', this.selectedCarBrand);
      fd.append('model', this.addedCarModel);

      addModel(fd).then(response => {
        this.list = response.data.body
        // this.total = response.data.body.length
        this.listLoading = false;
        window.location.reload();
      })
    },

    HandleDeleteCarModel(row) {
      this.$confirm("确认删除型号?请确保该品牌下无车辆", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let fd = new FormData();
          fd.append("id", row.id);

          deleteCarModel(fd).then(response => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除车型成功!"
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

