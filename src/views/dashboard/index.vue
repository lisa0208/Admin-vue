<template>
  <div class="dashboard-container">

    <el-row :gutter="20" class='data-row'>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日 DAU</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" :status="text">Done</el-progress>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日新增用户数</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" :status="text">1000</el-progress>
          </div>
        </el-card>
      </el-col>

    </el-row>

   <el-row :gutter="20">

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日订单量</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" status="text">1000</el-progress>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>今日订单总额</span>
          </div>
          <div class="text">
            <el-progress type="circle" :percentage="100" status="text">1000</el-progress>
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

export default {
  name: "Dashboard",
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: "adminDashboard"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    if (!this.roles.includes("admin")) {
      this.currentRole = "editorDashboard";
    }
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
  margin-bottom: 20px;
}
</style>