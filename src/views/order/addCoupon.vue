<template>
  <div class="app-container">

     <el-row :gutter="5">

      <el-col :span="24">
        <el-card class="box-card">

          <div slot="header" class="clearfix">
            <span>添加优惠券</span>
          </div>

          <div class="text">
          
          <el-form ref="form" label-width="200px">
            
            <el-form-item label="用户选择">
              
              <el-radio-group v-model="userScopeType">
                <el-radio :label="0">全部用户</el-radio>
                <el-radio :label="1">特定用户</el-radio>
              </el-radio-group>

              <el-input v-model="mobileLst" :disabled="userScopeType==0" placeholder="请输入特定用户手机号"></el-input>

            </el-form-item>

            <el-form-item label="车型选择">
              
              <el-radio-group v-model="modelType">
                <el-radio :label="0">全部车型</el-radio>
                <el-radio :label="1">特定车型</el-radio>
              </el-radio-group>

              
              <el-select  placeholder="请选择车辆型号" v-model="modelIdLst" :disabled="modelType==0">
                <el-option v-for="item in modelOption" :key="item.id" :label="item.model" :value="item.id"/>
              </el-select>

            </el-form-item>

            <el-form-item label="优惠券类型">
              
              <el-select  placeholder="请选择类型" v-model="couponType">
                <el-option :label="'立减券'" :value="0"/>
                <el-option :label="'新用户优惠券'" :value="2" v-if="userScopeType==0"/>
                <el-option :label="'折扣券'" :value="1"/>
              </el-select>

            </el-form-item>
            
             <el-form-item label="优惠券文案">
              <el-input v-model="coupon_desc"  placeholder="请输入优惠券下发文案"></el-input>
             </el-form-item>

             <el-form-item label="优惠券有效期">
               
               <el-date-picker
                  v-model="date"
                  class="filter-item"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  @change="checkTime"
                  end-placeholder="结束日期"/>

              </el-form-item>

              <el-form-item label="优惠券立减金额" v-if="couponType==0">
                <el-input-number v-model="fastMinusAccount" :step="1"  :min="1" :max="9999"></el-input-number>
              </el-form-item>

              <el-form-item label="新用户立减金额" v-if="couponType==2">
                <el-input-number v-model="fastMinusAccount" :step="1"  :min="1" :max="9999"></el-input-number>
              </el-form-item>

              <el-form-item label="折扣券折扣比例（%）" v-if="couponType==1">
                <el-input-number v-model="discount" :step="1" :min="1" :max="99">
                </el-input-number>
              </el-form-item>

          </el-form>
          </div>
        </el-card>
      </el-col>

    </el-row>


    <el-button  style="margin-top: 10px;" type="primary" icon="el-icon-upload2" @click="handleSubmit">提交</el-button>


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
import { addCoupon } from "@/api/order";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";
import env from "../../../config/sit.env";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      modelOption: [],
      date: undefined,

      couponType: undefined,
      userScopeType: 0, // 0所有用户，1特定用户
      modelType: 0, // 0所有车型，1特定车型
      modelIdLst: null, // 车型列表
      mobileLst: undefined, // 用户手机号
      coupon_desc: undefined,
      startdueTime: undefined,
      overdueTime: undefined,
      discount: undefined,
      fastMinusAccount: undefined
    };
  },

  created() {
    this.getModelList();
  },

  methods: {

    checkTime(date){
      console.log(date);

      if(date[0] < new Date()){
        this.$alert('优惠券有效期开始时间不能早于当前时间！');
        this.date = undefined;
      }
    },


    formatDate(time) {
      var date = new Date(time);

      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours(),
        min =
          date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
        sec =
          date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
      var newTime =
        year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
      return newTime;
    },

    getModelList() {
      fetchModelList().then(response => {
        this.modelOption = response.data.body;
        console.log("this.modelOption", this.modelOption);
      });
    },

    handleSubmit() {
      let fd = new FormData();

      // 根据两种scope类型的不同，配置参数
      if (this.userScopeType == 1) {
        fd.append("mobileLst", this.mobileLst);
      }

      if (this.modelType == 1) {
        fd.append("modelIdLst", this.modelIdLst);
        // fd.append("modelNameLst", this.ownerInfo.mobile);
      }

      fd.append("couponType", this.couponType);
      fd.append("userScopeType", this.userScopeType);

      fd.append("couponDesc", this.coupon_desc);

      if (this.date) {
        fd.append("startdueTime", this.formatDate(this.date[0]));
        fd.append("overdueTime", this.formatDate(this.date[1]));
      }

      if (this.couponType == 1) {
        fd.append("discount", this.discount / 100);
      } else {
        fd.append("fastMinusAccount", this.fastMinusAccount);
      }

      addCoupon(fd).then(response => {
        console.log(response);
        if (response.data.header.code == 200) {
          this.$alert("优惠券添加成功");
        } else {
          this.$alert(response.data.header.desc);
        }
      });
    }
  }
};
</script>

<style scoped>
.el-range-editor--medium .el-range-input {
  font-size: 13px;
  position: relative;
  top: -8px !important;
}
.el-range-editor--medium .el-range-separator {
  line-height: 24px;
  font-size: 13px;
  position: relative;
  top: -8px;
}
</style>

