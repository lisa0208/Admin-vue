<template>
  <div class="app-container">

     <el-row :gutter="5">

      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加 banner</span>
          </div>
          <div class="text">
          
          <el-form ref="form" label-width="100px">
            
            <el-form-item label="位置">
              <el-input-number v-model="position" :step="1" :min="1" :max="5">
                </el-input-number>
            </el-form-item>

            <!-- <el-form-item label="文案">
              <el-input v-model="bannerDesc"></el-input>
            </el-form-item> -->

            <!-- <el-form-item label="跳转链接">
              <el-input v-model="jumpUrl"></el-input>
            </el-form-item>

             <el-form-item label="绑定车辆 ID">
              <el-input-number v-model="carId" :step="1">
                </el-input-number>
            </el-form-item> -->

            <el-form-item label="图片">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadIdCardFront"
                class="avatar-uploader">
                <img v-if="carBannerImg" :src="carBannerImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>         
            </el-form-item>

          </el-form>
          </div>
        </el-card>
      </el-col>

    </el-row>


    <el-button class="filter-item" style="margin-top: 10px;" type="primary" icon="el-icon-upload2" @click="handleSubmit">提交</el-button>


  </div>
</template>

<script>
import {
  addCar,
  searchCarById,
  fetchColorList,
  fetchBrandList,
  fetchModelList,
  fetchModelByBrand,
  updateCar
} from "@/api/car";

import { addBanner } from "@/api/sys";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";
import env from "../../../config/sit.env";
import Cookies from "js-cookie";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      uploadUrl: "",

      position: 1,
      bannerDesc: undefined,
      jumpUrl: undefined,
      carBannerImg: undefined,
      carId: undefined
    };
  },

  created() {},

  methods: {
    handleSubmit() {
      let fd = new FormData();

      // fd.append("bannerDesc", this.bannerDesc);
      fd.append("carBannerImg", this.carBannerImg);
      fd.append("position", this.position);

      addBanner(fd).then(response => {
        this.listLoading = false;
        window.location.reload();
      });
    },

    beforeUploadIdCardFront(data) {
      let fd = new FormData();
      fd.append("uploadFile", data.file);

      let self = this;

      axios
        .post(env.BASE_API + "/file/upload", fd, {
          headers: {
            jf_token: Cookies.get("jf_token")
          }
        })
        .then(function(response) {
          self.carBannerImg = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });

      return false;
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
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>

