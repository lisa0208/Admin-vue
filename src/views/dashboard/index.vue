<template>
  <div class="dashboard-container">

   <el-row :gutter="20">

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日DAU</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" status="text">{{data.dau}}</el-progress>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日新增用户数</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" status="text">{{data.newUsersCount}}</el-progress>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-row :gutter="20" class="data-row">

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日订单量</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" status="text">{{data.todayOrdersCount}}</el-progress>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日订单总额</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" status="text">{{data.todayOrdersAmount}}</el-progress>
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import editorDashboard from "./editor";

import { getDaySummary } from "@/api/bussiness";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "Dashboard",
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: "adminDashboard",
      data: {
        dau: 0,
        newUsersCount: 0,
        todayOrdersAmount: 0,
        todayOrdersCount: 0
      }
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard";
    }

    this.getList();
  },

  methods: {
    
    getList() {

      getDaySummary().then(response => {
        console.log(response);
        if(response.data.body){
          this.data = response.data.body
        }
      });
    },
      
  }
};


</script>

<style>
.el-card__body {
  text-align: center !important;
}
.dashboard-container {
  padding: 20px;
}
.data-row {
  margin-top: 20px;
}
</style>