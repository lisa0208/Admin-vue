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
              <el-input v-model="username"></el-input>
            </el-form-item>
            
            <el-form-item label="手机号">
              <el-input placeholder="请输入手机号" v-model="input4">
                <el-button slot="append">发送验证码</el-button>
              </el-input>
            </el-form-item>

            <el-form-item label="验证码">
              <el-input v-model="ownerInfo.mobile"></el-input>
            </el-form-item>

            <el-form-item label="新密码">
              <el-input v-model="ownerInfo.idcard"></el-input>
            </el-form-item>

            <el-form-item label="再次输入新密码">
              <el-input v-model="ownerInfo.idcard"></el-input>
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
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from "axios";
import env from "../../../config/sit.env";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      id: this.$route.params.id ? this.$route.params.id : false,

      uploadUrl: "",

      cityOptions: [{ label: "上海", key: "上海" }],

      colorOption: [],
      brandOption: [],
      modelOption: [],

      ownerInfo: {
        drivingBack: undefined,
        drivingFront: undefined,
        drivingNum: undefined,
        drivingType: undefined,
        idcardBack: undefined,
        idcardFront: undefined,
        mobile: undefined,
        idcard: undefined,
        name: undefined
      },

      carInfo: {
        brand: undefined,
        carDesc: undefined,
        city: undefined,
        color: undefined,
        engineNum: undefined,
        enterModel: undefined,
        frameNum: undefined,
        gearbox: undefined,
        model: undefined,
        oilNumber: undefined,
        output: undefined,
        plateNumber: undefined,
        seatNum: undefined,
        wantRent: undefined
      },

      feeInfo: {
        rent: undefined,
        safeMoney: undefined,
        deposit: undefined,
        peccancyDeposit: undefined,
        serviceMoney: undefined
      },
      carPhotoList: [],
      fileList: []
    };
  },

  created() {
    console.log(this.id);
    // 拉取车辆信息
    if (this.id) {
      let fd = new FormData();

      fd.append("id", this.id);

      searchCarById(fd).then(response => {
        this.listLoading = false;

        console.log(response);

        this.ownerInfo.name = response.data.body.jfUser.name;
        this.ownerInfo.mobile = response.data.body.jfUser.mobile;
        this.ownerInfo.idcard = response.data.body.jfUser.idcard;
        this.ownerInfo.idcardBack = response.data.body.jfUser.idcardBack;
        this.ownerInfo.idcardFront = response.data.body.jfUser.idcardFront;
        this.ownerInfo.drivingBack = response.data.body.jfUser.drivingBack;
        this.ownerInfo.drivingFront = response.data.body.jfUser.drivingFront;
        this.ownerInfo.drivingNum = response.data.body.jfUser.drivingNum;
        this.ownerInfo.drivingType = response.data.body.jfUser.drivingType;
        this.ownerInfo.headImg = response.data.body.jfUser.headImg;

        this.carInfo.plateNumber = response.data.body.plateNumber;
        this.carInfo.brand = response.data.body.brand;
        this.carInfo.carDesc = response.data.body.carDesc;
        this.carInfo.city = response.data.body.city;
        this.carInfo.color = response.data.body.color;
        this.carInfo.engineNum = response.data.body.engineNum;
        this.carInfo.frameNum = response.data.body.frameNum;
        this.carInfo.gearbox = response.data.body.gearbox;
        this.carInfo.model = response.data.body.model;
        this.carInfo.oilNumber = response.data.body.oilNumber;
        this.carInfo.wantRent = response.data.body.wantRent;
        this.carInfo.seatNum = response.data.body.seatNum;
        this.carInfo.output = response.data.body.output;
        this.carInfo.enterModel = response.data.body.enterModel;

        this.feeInfo.rent = response.data.body.rent;
        this.feeInfo.safeMoney = response.data.body.safeMoney;
        this.feeInfo.deposit = response.data.body.deposit;
        this.feeInfo.peccancyDeposit = response.data.body.peccancyDeposit;
        this.feeInfo.serviceMoney = response.data.body.serviceMoney;

        // 处理照片回显

        let arr = response.data.body.carPhoto.split(",");
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
          let json = {};
          json.url = arr[i];
          json.name = arr[i];

          tempArr.push(json);
          console.log("tempArr", tempArr);
        }
        this.fileList = tempArr;
      });

      // 获取颜色列表
      fetchColorList().then(response => {
        this.colorOption = response.data.body;
        console.log("this.colorOption", this.colorOption);
      });
    }

    // 获取品牌列表
    fetchBrandList().then(response => {
      this.brandOption = response.data.body;
      console.log("this.brandOption", this.brandOption);
    });

    this.getModelList(null);
  },

  methods: {
    handlecarPhotoListChange(file, fileList) {
      // this.carPhotoList.push(file);
      console.log(file, fileList);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid == file.uid) {
          this.fileList.splice(i, 1);
        }
      }
    },

    handleExceed() {
      this.$alert("最多上传5张车辆照片");
    },
    getModelList(res) {
      if (res) {
        console.log(res, "res");
        this.carInfo.brand = res;
      }

      // 获取型号列表
      let fd = new FormData();
      if (this.carInfo.brand) {
        fd.append("id", this.carInfo.brand);
      }

      fetchModelByBrand(fd).then(response => {
        this.modelOption = response.data.body;
        console.log("this.modelOption", this.modelOption);
      });
    },

    handleSubmit() {
      for (let j in this.carInfo) {
        console.log(this.carInfo);

        for (let x in this.brandOption) {
          if (this.brandOption[x].id == this.carInfo.brand) {
            this.carInfo.brandName = this.brandOption[x].brand;
            console.log("this.carInfo.brand", this.carInfo.brandName);
          }
        }

        if (
          typeof this.carInfo[j] == "undefined" ||
          this.carInfo[j] == "undefined"
        ) {
          console.log(this.carInfo[j]);
          alert("请完善车辆信息");
          return false;
        }
      }

      for (let i in this.ownerInfo) {
        console.log(i);
        if (
          typeof this.ownerInfo[i] == "undefined" ||
          this.ownerInfo[i] == "undefined"
        ) {
          console.log(this.ownerInfo[i]);
          alert("请完善车主信息");
          return false;
        }
      }

      for (let k in this.feeInfo) {
        if (
          typeof this.feeInfo[k] == "undefined" ||
          this.feeInfo[k] == "undefined"
        ) {
          alert("请完善费用信息");
          return false;
        }
      }

      let fd = new FormData();

      fd.append("jfUser.mobile", this.ownerInfo.mobile);
      fd.append("jfUser.name", this.ownerInfo.name);
      fd.append("jfUser.idcard", this.ownerInfo.idcard);
      fd.append("jfUser.drivingNum", this.ownerInfo.drivingNum);
      fd.append("jfUser.drivingType", this.ownerInfo.drivingType);
      fd.append("jfUser.idcardFront", this.ownerInfo.idcardFront);
      fd.append("jfUser.idcardBack", this.ownerInfo.idcardBack);
      fd.append("jfUser.drivingFront", this.ownerInfo.drivingFront);
      fd.append("jfUser.drivingBack", this.ownerInfo.drivingBack);

      fd.append("JfCar.city", this.carInfo.city);
      fd.append("JfCar.plateNumber", this.carInfo.plateNumber);
      fd.append("JfCar.brand", this.carInfo.brandName);
      fd.append("JfCar.model", this.carInfo.model);
      fd.append("JfCar.color", this.carInfo.color);
      fd.append("JfCar.output", this.carInfo.output);
      fd.append("JfCar.gearbox", this.carInfo.gearbox);
      fd.append("JfCar.seatNum", this.carInfo.seatNum);
      fd.append("JfCar.engineNum", this.carInfo.engineNum);
      fd.append("JfCar.frameNum", this.carInfo.frameNum);
      fd.append("JfCar.enterModel", this.carInfo.enterModel);
      fd.append("JfCar.wantRent", this.carInfo.wantRent);

      let tempArr = new Array();
      for (let i = 0; i < this.fileList.length; i++) {
        tempArr.push(this.fileList[i].url);
      }
      fd.append("JfCar.carPhoto", tempArr.join(","));

      fd.append("JfCar.carDesc", this.carInfo.carDesc);
      fd.append("JfCar.oilNumber", this.carInfo.oilNumber);

      fd.append("JfCar.rent", this.feeInfo.rent);
      fd.append("JfCar.safeMoney", this.feeInfo.safeMoney);
      fd.append("JfCar.deposit", this.feeInfo.deposit);
      fd.append("JfCar.peccancyDeposit", this.feeInfo.peccancyDeposit);
      fd.append("JfCar.serviceMoney", this.feeInfo.serviceMoney);

      this.listLoading = true;

      // 如果有 id，则是更新。否则就是添加

      if (this.id) {
        fd.append("jfCar.id", this.id);
        updateCar(fd).then(response => {
          this.listLoading = false;
          window.location.reload();
        });
      } else {
        addCar(fd).then(response => {
          this.listLoading = false;
          window.location.reload();
        });
      }
    },

    beforeUploadIdCardFront(data) {
      let fd = new FormData();
      fd.append("uploadFile", data.file);

      let self = this;

      axios
        .post(env.BASE_API + "/file/upload", fd, {
          headers: {
            jf_token:
              "r3IIy2il3mhaOgXvnsN4P2vunUNbgZIWEltP1RBuvz9n5ue2mMgyx/NavsDhw6WE2nQFoIss63nQJtWAwtrTWg=="
          }
        })
        .then(function(response) {
          self.ownerInfo.idcardFront = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });

      return false;
    },

    beforeUploadIdCardBack(data) {
      let fd = new FormData();
      fd.append("uploadFile", data.file);

      let self = this;

      axios
        .post(env.BASE_API + "/file/upload", fd, {
          headers: {
            jf_token:
              "r3IIy2il3mhaOgXvnsN4P2vunUNbgZIWEltP1RBuvz9n5ue2mMgyx/NavsDhw6WE2nQFoIss63nQJtWAwtrTWg=="
          }
        })
        .then(function(response) {
          self.ownerInfo.idcardBack = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });

      return false;
    },

    beforeUploadDrivingFront(data) {
      let fd = new FormData();
      fd.append("uploadFile", data.file);

      let self = this;

      axios
        .post(env.BASE_API + "/file/upload", fd, {
          headers: {
            jf_token:
              "r3IIy2il3mhaOgXvnsN4P2vunUNbgZIWEltP1RBuvz9n5ue2mMgyx/NavsDhw6WE2nQFoIss63nQJtWAwtrTWg=="
          }
        })
        .then(function(response) {
          self.ownerInfo.drivingFront = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });

      return false;
    },

    beforeUploadDrivingBack(data) {
      let fd = new FormData();
      fd.append("uploadFile", data.file);

      let self = this;

      axios
        .post(env.BASE_API + "/file/upload", fd, {
          headers: {
            jf_token:
              "r3IIy2il3mhaOgXvnsN4P2vunUNbgZIWEltP1RBuvz9n5ue2mMgyx/NavsDhw6WE2nQFoIss63nQJtWAwtrTWg=="
          }
        })
        .then(function(response) {
          self.ownerInfo.drivingBack = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });

      return false;
    },

    beforeUploadCarPhoto(data) {
      let fd = new FormData();
      fd.append("uploadFile", data.file);

      let self = this;

      axios
        .post(env.BASE_API + "/file/upload", fd, {
          headers: {
            jf_token:
              "r3IIy2il3mhaOgXvnsN4P2vunUNbgZIWEltP1RBuvz9n5ue2mMgyx/NavsDhw6WE2nQFoIss63nQJtWAwtrTWg=="
          }
        })
        .then(function(response) {
          let json = {};
          json.name = response.data.body;
          json.url = response.data.body;

          self.fileList.push(json);

          console.log("这里的 file list", self.fileList);
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

