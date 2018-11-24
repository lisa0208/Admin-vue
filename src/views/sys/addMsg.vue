<template>
  <div class="app-container">

     <el-row :gutter="5">

      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发送消息</span>
          </div>
          <div class="text">
          
          <el-form ref="form" label-width="100px">
            
            <el-form-item label="用户选择">
              
              <el-radio-group v-model="userScopeType">
                <el-radio :label="0">全部用户</el-radio>
                <el-radio :label="1">特定用户</el-radio>
              </el-radio-group>

              <el-input v-model="mobileLst" :disabled="userScopeType==0" placeholder="请输入特定用户手机号"></el-input>

            </el-form-item>

            <el-form-item label="发布使劲">
              
              <el-radio-group v-model="msgType">
                <el-radio :label="0">立即发布</el-radio>
                <el-radio :label="1">定时发布</el-radio>
              </el-radio-group>

              <el-date-picker
                class="filter-item"
                type="datetime"
                :disabled="msgType==0"
                v-model="msgTime"
                @change="checkTime"
                />

            </el-form-item>

            <el-form-item label="消息标题">
              <el-input v-model="title"></el-input>
            </el-form-item>

            <el-form-item label="消息内容">
              <el-input v-model="sendContent" type='textarea' ></el-input>
            </el-form-item>

          </el-form>
          </div>
        </el-card>
      </el-col>

    </el-row>


    <el-button class="filter-item" style="margin-top: 10px;" type="primary" icon="el-icon-upload2" @click="sendMsg">发送</el-button>


  </div>
</template>

<script>
import { addMsg } from "@/api/sys";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";
import env from "../../../config/sit.env";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      userScopeType: 0, // 0所有用户，1特定用户
      mobileLst: undefined,

      msgType: 0, // 0立即发布，1定时发布
      msgTime: undefined,
      title: undefined,
      sendContent: undefined
    };
  },

  created() {},

  methods: {
    
    checkTime(date){
      console.log(date);

      if(date < new Date()){
        this.$alert('消息发送时间不能早于当前时间！');
        this.msgTime = undefined;
      }
    },

    sendMsg() {
      if (!this.title || !this.sendContent) {
        this.$alert("请完整填写内容");
        return;
      }

      let fd = new FormData();

      if (this.userScopeType == 1) {
        fd.append("tel", this.mobileLst);
      }

      fd.append("adminId", 1);

      fd.append("title", this.title);

      fd.append("author", "管理员");
      fd.append("sendContent", this.sendContent);

      addMsg(fd).then(response => {
        if (response.data.header.code == 200) {
          this.$alert("消息发送成功");

          this.title = undefined;
          this.sendContent = undefined;

        } else {
          this.$alert(response.data.header.desc);
        }
      });
    }
  }
};
</script>

<style>
</style>

