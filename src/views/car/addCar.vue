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
                <el-option label="C1" value="C1"></el-option>
                <el-option label="C2" value="C2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="身份证正面">
              <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                           <img v-if="imageUrl" :src="imageUrl" class="avatar">
                           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                           </el-upload>          
            </el-form-item>

            <el-form-item label="身份证背面">
              <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                           <img v-if="imageUrl" :src="imageUrl" class="avatar">
                           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                           </el-upload>          
            </el-form-item>

            <el-form-item label="驾照正页">
              <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                           <img v-if="imageUrl" :src="imageUrl" class="avatar">
                           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                           </el-upload>          
            </el-form-item>
            <el-form-item label="驾照副页">
              <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                           <img v-if="imageUrl" :src="imageUrl" class="avatar">
                           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
              <el-input v-model="ownerInfo.plateNumber"></el-input>
            </el-form-item>

            <el-form-item label="车辆品牌">
              <el-input v-model="ownerInfo.brand"></el-input>
            </el-form-item>

            <el-form-item label="型号">
              <el-input v-model="ownerInfo.model"></el-input>
            </el-form-item>

            <el-form-item label="城市区域">
              <el-select  placeholder="请选择汽车城市" v-model="ownerInfo.city">
                <el-option label="上海" value="shanghai"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="颜色">
              <el-select  placeholder="请选择汽车颜色" v-model="ownerInfo.color">
                <el-option label="红色" value=" red"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="排量">
              <el-select  placeholder="请选择汽车排量" v-model="ownerInfo.output">
                <el-option label="1.2L" value="1.2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="变速箱">
              <el-select  placeholder="请选择变速箱类型" v-model="ownerInfo.gearbox">
                <el-option label="DST" value="DST"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="座位数">
              <el-input v-model="ownerInfo.seatNum"></el-input>
            </el-form-item>

            <el-form-item label="发动机号">
              <el-input v-model="ownerInfo.engineNum"></el-input>
            </el-form-item>

            <el-form-item label="车架号">
              <el-input v-model="ownerInfo.frameNum"></el-input>
            </el-form-item>

            <el-form-item label="入驻模式">
              <el-input v-model="ownerInfo.enterModel"></el-input>
            </el-form-item>

            <el-form-item label="预期租金">
              <el-input v-model="ownerInfo.wantRent"></el-input>
            </el-form-item>

            <el-form-item label="车辆照片">
              <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                           :before-upload="beforeAvatarUpload">
                           <img v-if="imageUrl" :src="imageUrl" class="avatar">
                           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                           </el-upload>          
            </el-form-item>

            <el-form-item label="车辆描述">
              <el-input v-model="ownerInfo.carDesc"></el-input>
            </el-form-item>

            <el-form-item label="油号">
              <el-select  placeholder="请选择车辆油号" v-model="ownerInfo.oilNumber">
                <el-option label="95" value="95"></el-option>
                <el-option label="98" value="98"></el-option>
              </el-select>
            </el-form-item>




          </el-form>
        </div>
      </el-col>

    </el-row>


    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleSubmit">保存</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-upload2" @click="handleSubmit">提交</el-button>


  </div>
</template>

<script>
import { addCar } from "@/api/car";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {

      cityOptions: [{ label: "上海", key: "1" }],

      ownerInfo: {
        balance: undefined,
        bankCardCount: undefined,
        createTime: undefined,
        drivingBack: undefined,
        drivingFront: undefined,
        drivingNum: undefined,
        drivingType: undefined,
        headImg: undefined,
        id: 1,
        idcard: undefined,
        idcardBack: undefined,
        idcardFront: undefined,
        loginChannel: undefined,
        mobile: undefined,
        name: undefined,
        nickname: undefined,
        password: undefined,
        qualityType: undefined,
        updateTime: undefined,
        userOpenId: undefined,
        userStatus: undefined,
        userType: undefined
      },

      carInfo: {
        brand: undefined,
        carDesc: undefined,
        carPhoto: undefined,
        carStatus: undefined,
        city: undefined,
        color: undefined,
        createTime: undefined,
        deposit: undefined,
        engineNum: undefined,
        enterModel: undefined,
        frameNum: undefined,
        gearbox: undefined,
        id: undefined,
        jfUser: undefined,
        model: undefined,
        oilNumber: undefined,
        output: undefined,
        ownerId: undefined,
        peccancyDeposit: undefined,
        plateNumber: undefined,
        rent: undefined,
        safeMoney: undefined,
        seatNum: undefined,
        serviceMoney: undefined,
        unavailableTimeStart: undefined,
        unavailableTimeStop: undefined,
        updateTime: undefined,
        wantRent: undefined
      }


    };
  },

  created() {
    
  },

  methods: {
  
    handleSubmit() {
      console.log(this.ownerInfo, this.carInfo);

      for(let i in this.ownerInfo){
        console.log(i);
        if(typeof(this.ownerInfo[i]) == "undefined" || this.ownerInfo[i] =='undefined'){
          alert('请完善车主信息');
          return false;
        }
      }
      
      for(let j in this.carInfo){
        if(typeof(this.ownerInfo[j]) == "undefined" || this.ownerInfo[j] =='undefined'){
          alert('请完善车辆信息');
          return false;
        }
      }

      let fd = new FormData();

      fd.append('jfUser.mobile', this.ownerInfo.mobile);
      fd.append('jfUser.idcard', this.ownerInfo.idcard);
      fd.append('jfUser.name', this.ownerInfo.name);
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


      this.listLoading = true;
      addCar(fd).then(response => {
        this.listLoading = false
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

