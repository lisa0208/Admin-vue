<template>
  <div class="app-container">

     <el-row :gutter="5">

      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>修改密码</span>
          </div>
          <div class="text">
          
          <el-form ref="form" label-width="150px">

            <el-form-item label="姓名">
              <el-input v-model="username" disabled></el-input>
            </el-form-item>
            
            <el-form-item label="手机号">
              <el-input placeholder="请输入手机号" v-model="mobile">
                <el-button slot="append" @click="sendCode">发送验证码</el-button>
              </el-input>
            </el-form-item>

            <el-form-item label="验证码">
              <el-input v-model="code"></el-input>
            </el-form-item>

            <el-form-item label="新密码">
              <el-input v-model="pwd"></el-input>
            </el-form-item>

            <el-form-item label="再次输入新密码">
              <el-input v-model="rePwd"></el-input>
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

import { updatePassw, sendCode } from "@/api/sys";

import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";
import env from "../../../config/sit.env";
import Cookies from "js-cookie";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      username: Cookies.get("userName"),
      mobile: undefined,
      code: undefined,
      pwd: undefined,
      rePwd: undefined
    };
  },

  created() {},

  methods: {
    sendCode() {
      let fd = new FormData();
      fd.append("tel", this.mobile);

      this.listLoading = true;

      sendCode(fd).then(response => {
        console.log(response);
        if (response.data.header.code == 200) {
          this.$alert("验证码发送成功");
        } else {
          this.$alert(response.data.header.desc);
        }
      });
    },

    handleSubmit() {

      let fd = new FormData();

      fd.append("adminId", 1);
      fd.append("tel", this.mobile);
      fd.append("code", this.code);
      fd.append("newPassw", this.pwd);
      fd.append("newPasswRetry", this.rePwd);

      this.listLoading = true;

      updatePassw(fd).then(response => {
       if (response.data.header.code == 200) {
          this.$alert("修改密码成功");
          window.location.reload();
        } else {
          this.$alert(response.data.header.desc);
        }
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

