<template>
  <div class="app-container">



    <el-row :gutter="20">
      
      <el-col :span="10">

        <!-- 车主基本信息 -->
        <div class="grid-content bg-purple">
          
          <el-form ref="form" label-width="180px">
            
            <el-form-item label="真实姓名">
              <el-input v-model="ownerInfo.name"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="ownerInfo.mobile"></el-input>
            </el-form-item>

            <el-form-item label="身份证号码">
              <el-input v-model="ownerInfo.idcard"></el-input>
            </el-form-item>

            <el-form-item label="驾照号">
              <el-input v-model="ownerInfo.drivingNum"></el-input>
            </el-form-item>

            <el-form-item label="驾照类型" >
              <el-select  placeholder="请选择驾照类型" v-model="ownerInfo.drivingType">
                <el-option label="A1驾照" value="0"></el-option>
                <el-option label="A2驾照" value="1"></el-option>
                <el-option label="A3驾照" value="2"></el-option>
                <el-option label="B1驾照" value="3"></el-option>
                <el-option label="B2驾照" value="4"></el-option>
                <el-option label="C1驾照" value="5"></el-option>
                <el-option label="C2驾照" value="6"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="身份证正面">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadIdCardFront"
                class="avatar-uploader">
                <img v-if="ownerInfo.idcardFront" :src="ownerInfo.idcardFront" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>         
            </el-form-item>

            <el-form-item label="身份证背面">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadIdCardBack"
                class="avatar-uploader">
                <img v-if="ownerInfo.idcardBack" :src="ownerInfo.idcardBack" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>           
            </el-form-item>

            <el-form-item label="驾照正页">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadDrivingFront"
                class="avatar-uploader">
                <img v-if="ownerInfo.drivingFront" :src="ownerInfo.drivingFront" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>           
            </el-form-item>
            <el-form-item label="驾照副页">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadDrivingBack"
                class="avatar-uploader">
                <img v-if="ownerInfo.drivingBack" :src="ownerInfo.drivingBack" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>             
            </el-form-item>

          </el-form>
        </div>
      </el-col>

      <el-col :span="10">
        <!-- 车辆基本信息 -->
        <div class="grid-content bg-purple">

           <el-form ref="form" label-width="180px">
            
            <el-form-item label="车牌号">
              <el-input v-model="carInfo.plateNumber"></el-input>
            </el-form-item>

            <el-form-item label="车辆品牌">
              <el-select  placeholder="请选择车辆品牌" v-model="carInfo.brand">
                <el-option v-for="item in brandOption" :key="item.id" :label="item.brand" :value="item.brand"/>
              </el-select>
            </el-form-item>

            <el-form-item label="型号">
              <el-select  placeholder="请选择车辆品牌" v-model="carInfo.model">
                <el-option v-for="item in modelOption" :key="item.id" :label="item.model" :value="item.model"/>
              </el-select>
            </el-form-item>

            <el-form-item label="城市区域">
              <el-select  placeholder="请选择汽车城市" v-model="carInfo.city">
                <el-option label="上海" value="上海"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="颜色">
              <el-select  placeholder="请选择汽车颜色" v-model="carInfo.color">
                <el-option v-for="item in colorOption" :key="item.id" :label="item.color" :value="item.color"/>
              </el-select>
            </el-form-item>

            <el-form-item label="排量">
              <el-input v-model="carInfo.output"></el-input>
            </el-form-item>

            <el-form-item label="变速箱">
              <el-input v-model="carInfo.gearbox"></el-input>
            </el-form-item>

            <el-form-item label="座位数">
              <el-input v-model="carInfo.seatNum"></el-input>
            </el-form-item>

            <el-form-item label="发动机号">
              <el-input v-model="carInfo.engineNum"></el-input>
            </el-form-item>

            <el-form-item label="车架号">
              <el-input v-model="carInfo.frameNum"></el-input>
            </el-form-item>

            <el-form-item label="入驻模式">
              <el-input v-model="carInfo.enterModel"></el-input>
            </el-form-item>

            <el-form-item label="预期租金">
              <el-input v-model="carInfo.wantRent"></el-input>
            </el-form-item>

            <el-form-item label="车辆照片">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadCarPhoto"
                class="avatar-uploader">
                <img v-if="carInfo.carPhoto" :src="carInfo.carPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>        
            </el-form-item>

            <el-form-item label="车辆描述">
              <el-input v-model="carInfo.carDesc"></el-input>
            </el-form-item>

            <el-form-item label="油号">
              <el-select  placeholder="请选择车辆油号" v-model="carInfo.oilNumber">
                <el-option label="95" value="95"></el-option>
                <el-option label="97" value="97"></el-option>
                <el-option label="98" value="98"></el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
      </el-col>

    </el-row>

    <el-row :gutter="20">
      <el-col :span="10">
        <!-- 车辆费用信息 -->
        <div class="grid-content bg-purple">

           <el-form ref="form" label-width="180px">
            
            <el-form-item label="车辆租金(元/天)">
              <el-input v-model="feeInfo.rent"></el-input>
            </el-form-item>

            <el-form-item label="车辆保险费(元)">
              <el-input v-model="feeInfo.safeMoney"></el-input>
            </el-form-item>

            <el-form-item label="车辆押金(元)">
              <el-input v-model="feeInfo.deposit"></el-input>
            </el-form-item>

            <el-form-item label="违章押金(元)">
              <el-input v-model="feeInfo.peccancyDeposit"></el-input>
            </el-form-item>

            <el-form-item label="服务费(元)">
              <el-input v-model="feeInfo.serviceMoney"></el-input>
            </el-form-item>



          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="handleSubmit">提交</el-button>


  </div>
</template>

<script>
import { addCar, searchCarById, fetchColorList, fetchBrandList, fetchModelList} from "@/api/car";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import axios from 'axios';
import env from "../../../config/sit.env";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {

      id: this.$route.params.id ? this.$route.params.id : false,

      uploadUrl: '',

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
        carPhoto: undefined,
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
        serviceMoney: undefined,
      }


    };
  },

  created() {
    console.log(this.id);
    // 拉取车辆信息
    if(this.id){

      let fd = new FormData();

      fd.append('id', this.id);

      searchCarById(fd).then(response => {
        this.listLoading = false;

        console.log(response)

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
        this.carInfo.carPhoto = response.data.body.carPhoto;
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

      });

      // 获取颜色列表
      fetchColorList().then(response => {
        this.colorOption = response.data.body;
        console.log('this.colorOption', this.colorOption)
      });

    }

    // 获取品牌列表
      fetchBrandList().then(response => {
        this.brandOption = response.data.body;
        console.log('this.brandOption', this.brandOption)
      });

    // 获取型号列表
      fetchModelList().then(response => {
        this.modelOption = response.data.body;
        console.log('this.modelOption', this.modelOption)
      });

  },

  methods: {
  
    handleSubmit() {
      console.log(this.ownerInfo, this.carInfo);

      for(let i in this.ownerInfo){
        console.log(i);
        if(typeof(this.ownerInfo[i]) == "undefined" || this.ownerInfo[i] =='undefined'){
          console.log(this.ownerInfo[i])
          alert('请完善车主信息');
          return false;
        }
      }
      
      for(let j in this.carInfo){
        if(typeof(this.carInfo[j]) == "undefined" || this.carInfo[j] =='undefined'){
          console.log(this.carInfo[j])
          alert('请完善车辆信息');
          return false;
        }
      }

       for(let k in this.feeInfo){
        if(typeof(this.feeInfo[k]) == "undefined" || this.feeInfo[k] =='undefined'){
          alert('请完善费用信息');
          return false;
        }
      }

      let fd = new FormData();

      fd.append('jfUser.mobile', this.ownerInfo.mobile);
      fd.append('jfUser.name', this.ownerInfo.name);
      fd.append('jfUser.idcard', this.ownerInfo.idcard);
      fd.append('jfUser.drivingNum', this.ownerInfo.drivingNum);
      fd.append('jfUser.drivingType', this.ownerInfo.drivingType);
      fd.append('jfUser.idcardFront', this.ownerInfo.idcardFront);
      fd.append('jfUser.idcardBack', this.ownerInfo.idcardBack);
      fd.append('jfUser.drivingFront', this.ownerInfo.drivingFront);
      fd.append('jfUser.drivingBack', this.ownerInfo.drivingBack);

      fd.append('JfCar.city', this.carInfo.city);
      fd.append('JfCar.plateNumber', this.carInfo.plateNumber);
      fd.append('JfCar.brand', this.carInfo.brand);
      fd.append('JfCar.model', this.carInfo.model);
      fd.append('JfCar.color', this.carInfo.color);
      fd.append('JfCar.output', this.carInfo.output);
      fd.append('JfCar.gearbox', this.carInfo.gearbox);
      fd.append('JfCar.seatNum', this.carInfo.seatNum);
      fd.append('JfCar.engineNum', this.carInfo.engineNum);
      fd.append('JfCar.frameNum', this.carInfo.frameNum);
      fd.append('JfCar.enterModel', this.carInfo.enterModel);
      fd.append('JfCar.wantRent', this.carInfo.wantRent);
      fd.append('JfCar.carPhoto', this.carInfo.carPhoto);
      fd.append('JfCar.carDesc', this.carInfo.carDesc);
      fd.append('JfCar.oilNumber', this.carInfo.oilNumber);

      fd.append('JfCar.rent', this.feeInfo.rent);
      fd.append('JfCar.safeMoney', this.feeInfo.safeMoney);
      fd.append('JfCar.deposit', this.feeInfo.deposit);
      fd.append('JfCar.peccancyDeposit', this.feeInfo.peccancyDeposit);
      fd.append('JfCar.serviceMoney', this.feeInfo.serviceMoney);


      this.listLoading = true;
      addCar(fd).then(response => {
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
          self.carInfo.carPhoto = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });

      return false;
    },

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
    border-color: #409EFF;
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

