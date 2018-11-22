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

              <el-input v-model="mobile" :disabled="userScopeType==0" placeholder="请输入特定用户手机号"></el-input>

            </el-form-item>

            <el-form-item label="车型选择">
              
              <el-radio-group v-model="modelType">
                <el-radio :label="0">全部车型</el-radio>
                <el-radio :label="1">特定车型</el-radio>
              </el-radio-group>

              
              <el-select  placeholder="请选择车辆型号" v-model="model" :disabled="modelType==0">
                <el-option v-for="item in modelOption" :key="item.id" :label="item.model" :value="item.model"/>
              </el-select>

            </el-form-item>

            <el-form-item label="优惠券类型">
              
              <el-select  placeholder="请选择类型" v-model="couponType">
                <el-option :label="'立减券'" :value="1"/>
                <el-option :label="'新用户券'" :value="2"/>
                <el-option :label="'折扣券'" :value="3"/>
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
                  end-placeholder="结束日期"/>

              </el-form-item>

              <el-form-item label="优惠券立减金额">
                <el-input v-model="fastMinusAccount"></el-input>
              </el-form-item>

              <el-form-item label="新用户券立减金额">
                <el-input v-model="fastMinusAccount"></el-input>
              </el-form-item>

              <el-form-item label="折扣券折扣比例（%）">
                <el-input-number v-model="discount"  :min="1" :max="100" label="1%-100%的折扣比例"></el-input-number>
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
      modelIdLst: undefined, // 用户手机号
      mobileLst: undefined,
      coupon_desc: undefined,
      startdueTime: undefined,
      overdueTime: undefined,
      discount: undefined,
      fastMinusAccount: undefined
    };
  },

  created() {
    console.log(this.id);
    // 拉取车辆信息

    this.getModelList(null);
  },

  methods: {

    getModelList() {

      fetchModelList().then(response => {
        this.modelOption = response.data.body;
        console.log("this.modelOption", this.modelOption);
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

