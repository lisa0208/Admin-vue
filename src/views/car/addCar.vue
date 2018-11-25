<template>
  <div class="app-container">

     <el-row :gutter="5">

      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车主基本信息</span>
          </div>
          <div class="text">
          
          <el-form ref="form" label-width="100px">
            
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
        </el-card>
      </el-col>

      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车辆基本信息</span>
          </div>
          <div class="text">
                      <el-form ref="form" label-width="140px">
            
            <el-form-item label="车牌号">
              <el-input v-model="carInfo.plateNumber">
                <template slot="prepend">沪</template>
              </el-input>
            </el-form-item>

            <el-form-item label="车辆品牌">
              <el-select  placeholder="请选择车辆品牌" v-model="carInfo.brand" @change="getModelList">
                <el-option v-for="item in brandOption" :key="item.id" :label="item.brand" :value="item.id"/>
              </el-select>
            </el-form-item>

            <el-form-item label="型号">
              <el-select  placeholder="请选择车辆型号" v-model="carInfo.model">
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

            <el-form-item label="排量（L）">
              <!-- <el-input v-model="carInfo.output"></el-input> -->
              <el-input-number v-model="carInfo.output" :precision="1" :step="0.1"  :min="0.1" :max="100"></el-input-number>
            </el-form-item>

            <el-form-item label="变速箱">
              <el-input v-model="carInfo.gearbox"></el-input>
            </el-form-item>

            <el-form-item label="座位数">
              <!-- <el-input v-model="carInfo.seatNum"></el-input> -->
              <el-input-number v-model="carInfo.seatNum" :step="1"  :min="1" :max="100"></el-input-number>
            </el-form-item>

            <el-form-item label="发动机类型">
              <el-select  placeholder="请选择" v-model="carInfo.engineType">
                <el-option label="涡轮增压1" value="涡轮增压"></el-option>
                <el-option label="自然吸气" value="自然吸气"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发动机号">
              <el-input v-model="carInfo.engineNum"></el-input>
            </el-form-item>

            <el-form-item label="车架号">
              <el-input v-model="carInfo.frameNum"></el-input>
            </el-form-item>

            <el-form-item label="入驻模式">
              <el-select  placeholder="请选择" v-model="carInfo.enterModel">
                <el-option label="个人" value="0"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="预期租金（元/天）">
              <el-input v-model="carInfo.wantRent"></el-input>
            </el-form-item>


            <el-form-item label="车辆照片（前）">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadCarPic1"
                class="avatar-uploader">
                <img v-if="carPic['1']" :src="carPic['1']" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>           
            </el-form-item>
            <el-form-item label="车辆照片（左前）">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadCarPic2"
                class="avatar-uploader">
                <img v-if="carPic['2']" :src="carPic['2']" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>         
            </el-form-item>
            <el-form-item label="车辆照片（左）">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadCarPic3"
                class="avatar-uploader">
                <img v-if="carPic['3']" :src="carPic['3']" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>           
            </el-form-item>
            <el-form-item label="车辆照片（左后）">
                <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadCarPic4"
                class="avatar-uploader">
                <img v-if="carPic['4']" :src="carPic['4']" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>           
            </el-form-item>
            <el-form-item label="车辆照片（后）">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadCarPic5"
                class="avatar-uploader">
                <img v-if="carPic['5']" :src="carPic['5']" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>              
            </el-form-item>
            <el-form-item label="车辆照片（内）">
              <el-upload
                :action="uploadUrl"
                :show-file-list="false"
                :http-request = "beforeUploadCarPic6"
                class="avatar-uploader">
                <img v-if="carPic['6']" :src="carPic['6']" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>        
            </el-form-item>

            <!-- <el-form-item label="车辆照片">
             
              <el-upload
              action="uploadUrl"
              :limit="5"
              list-type="picture"
              :http-request = "beforeUploadCarPhoto"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :file-list="fileList"
              :on-change="handlecarPhotoListChange">
              <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item> -->

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
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车辆费用信息</span>
          </div>
          <div class="text">
            <el-form ref="form" label-width="120px">
            
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
        </el-card>
      </el-col>

    </el-row>


    <el-button class="filter-item" style="margin-top: 10px;" type="primary" icon="el-icon-upload" @click="handleSubmit">提交</el-button>
    <el-button class="filter-item" style="margin-top: 10px;" type="info" icon="el-icon-upload2" @click="handleSaveDruft">暂存</el-button>


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
import Cookies from "js-cookie";

export default {
  name: "CarList",
  components: { Pagination },

  data() {
    return {
      id: this.$route.params.id == ":id" ? false : this.$route.params.id,

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
        wantRent: undefined,
        engineType: undefined
      },

      feeInfo: {
        rent: undefined,
        safeMoney: undefined,
        deposit: undefined,
        peccancyDeposit: undefined,
        serviceMoney: undefined
      },
      carPhotoList: [],
      fileList: [],

      carPic: {
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": ""
      }
    };
  },

  created() {
    console.log("this.id", this.id);
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
        this.ownerInfo.drivingType = '' + response.data.body.jfUser.drivingType;

        this.carInfo.plateNumber = response.data.body.plateNumber.replace(
          "沪",
          ""
        );
        this.carInfo.brand = response.data.body.brand;
        this.carInfo.carDesc = response.data.body.carDesc;
        this.carInfo.city = response.data.body.city;
        this.carInfo.color = response.data.body.color;
        this.carInfo.engineNum = response.data.body.engineNum;
        this.carInfo.engineType = response.data.body.engineType;

        this.carInfo.frameNum = response.data.body.frameNum;
        this.carInfo.gearbox = response.data.body.gearbox;
        this.carInfo.model = response.data.body.model;
        this.carInfo.oilNumber = response.data.body.oilNumber;
        this.carInfo.wantRent = response.data.body.wantRent;
        this.carInfo.seatNum = response.data.body.seatNum;
        this.carInfo.output = response.data.body.output.replace("L", "");
        this.carInfo.enterModel = '' +response.data.body.enterModel;
        // this.carInfo.enterModel = '0';

        this.feeInfo.rent = response.data.body.rent;
        this.feeInfo.safeMoney = response.data.body.safeMoney;
        this.feeInfo.deposit = response.data.body.deposit;
        this.feeInfo.peccancyDeposit = response.data.body.peccancyDeposit;
        this.feeInfo.serviceMoney = response.data.body.serviceMoney;

        // 处理照片回显

        let arr = response.data.body.carPhoto.split(",");
        for (let i = 0; i < arr.length; i++) {
          this.carPic[i] = arr[i];
        }
      });
    }

    // 获取颜色列表
    fetchColorList().then(response => {
      this.colorOption = response.data.body;
      console.log("this.colorOption", this.colorOption);
    });

    // 获取品牌列表
    fetchBrandList().then(response => {
      this.brandOption = response.data.body;
      console.log("this.brandOption", this.brandOption);
    });

    this.getModelList(null);
  },

  methods: {
    beforeUploadCarPic1(data) {
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
          self.carPic["1"] = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });
      return false;
    },
    beforeUploadCarPic2(data) {
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
          self.carPic["2"] = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });
      return false;
    },
    beforeUploadCarPic3(data) {
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
          self.carPic["3"] = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });
      return false;
    },
    beforeUploadCarPic4(data) {
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
          self.carPic["4"] = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });
      return false;
    },
    beforeUploadCarPic5(data) {
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
          self.carPic["5"] = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });
      return false;
    },
    beforeUploadCarPic6(data) {
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
          self.carPic["6"] = response.data.body;
        })
        .catch(function(error) {
          console.log(error);
        });
      return false;
    },

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

    // 提交车辆信息，并且更新车辆的状态为3
    handleSubmit() {

      console.log(this.carInfo);
      for (let j in this.carInfo) {

        if (
          typeof this.carInfo[j] == "undefined" ||
          !this.carInfo[j]
        ) {
          console.log(this.carInfo[j]);
          alert("请完善车辆信息");
          return false;
        }
      }

      console.log(this.ownerInfo);
      for (let i in this.ownerInfo) {
        console.log(i);
        if (
          typeof this.ownerInfo[i] == "undefined" ||
          !this.ownerInfo[i]
        ) {
          console.log(this.ownerInfo[i]);
          alert("请完善车主信息");
          return false;
        }
      }

      console.log(this.feeInfo);
      for (let k in this.feeInfo) {
        if (
          typeof this.feeInfo[k] == "undefined" ||
          !this.feeInfo[k]
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

      fd.append("jfCar.city", this.carInfo.city);
      fd.append("jfCar.plateNumber", "沪" + this.carInfo.plateNumber);
      fd.append("jfCar.brand", this.carInfo.brand);
      fd.append("jfCar.model", this.carInfo.model);
      fd.append("jfCar.color", this.carInfo.color);
      fd.append("jfCar.output", this.carInfo.output + "L");
      fd.append("jfCar.gearbox", this.carInfo.gearbox);
      fd.append("jfCar.seatNum", this.carInfo.seatNum);
      fd.append("jfCar.engineNum", this.carInfo.engineNum);
      fd.append("jfCar.engineType", this.carInfo.engineType);

      fd.append("jfCar.frameNum", this.carInfo.frameNum);
      fd.append("jfCar.enterModel", this.carInfo.enterModel);
      fd.append("jfCar.wantRent", this.carInfo.wantRent);

      // 车辆照片
      let picArr = [];
      for (let i in this.carPic) {
        picArr.push(this.carPic[i]);
      }
      fd.append("jfCar.carPhoto", picArr.join(","));

      fd.append("jfCar.carDesc", this.carInfo.carDesc);
      fd.append("jfCar.oilNumber", this.carInfo.oilNumber);

      fd.append("jfCar.rent", this.feeInfo.rent);
      fd.append("jfCar.safeMoney", this.feeInfo.safeMoney);
      fd.append("jfCar.deposit", this.feeInfo.deposit);
      fd.append("jfCar.peccancyDeposit", this.feeInfo.peccancyDeposit);
      fd.append("jfCar.serviceMoney", this.feeInfo.serviceMoney);

      // 所有从后来来的车辆，无论是不全资料补填后的更新，还是直接主动新增，车辆状态都是2，下线状态
      // 来自端上的车辆状态，在点击通过按钮的时候，就已经变为审核通过了，就不会出现在车辆待审核列表了
      fd.append("jfCar.carStatus", 2);

      this.listLoading = true;

      // 如果有 id，则是更新。否则就是添加

      if (this.id) {
        fd.append("jfCar.id", this.id);
        updateCar(fd).then(response => {
          if (response.data.header.code == 200) {
            this.listLoading = false;
            window.location.href = "/#/car/car-list";
          } else {
            this.$alert(response.data.header.desc);
          }
        });
      } else {
        addCar(fd).then(response => {
          if (response.data.header.code == 200) {
            this.listLoading = false;
            window.location.href = "/#/car/car-list";
          } else {
            this.$alert(response.data.header.desc);
          }
        });
      }
    },

    // 不变更车辆状态
    handleSaveDruft() {
      console.log(this.carInfo);
      
      // for (let x in this.brandOption) {
      //   console.log(this.brandOption[x].id, this.carInfo.brand);
      //     if (this.brandOption[x].id == this.carInfo.brand) {
      //       this.carInfo.brandName = this.brandOption[x].brand;
      //       console.log("this.carInfo.brand", this.carInfo.brandName);
      //     }
      // }

      let fd = new FormData();

      if (this.ownerInfo.mobile) {
        fd.append("jfUser.mobile", this.ownerInfo.mobile);
      }

      if (this.ownerInfo.name) {
        fd.append("jfUser.name", this.ownerInfo.name);
      }

      if (this.ownerInfo.idcard) {
        fd.append("jfUser.idcard", this.ownerInfo.idcard);
      }

      if (this.ownerInfo.drivingNum) {
        fd.append("jfUser.drivingNum", this.ownerInfo.drivingNum);
      }

      if (this.ownerInfo.drivingType) {
        fd.append("jfUser.drivingType", this.ownerInfo.drivingType);
      }

      if (this.ownerInfo.idcardFront) {
        fd.append("jfUser.idcardFront", this.ownerInfo.idcardFront);
      }

      if (this.ownerInfo.idcardBack) {
        fd.append("jfUser.idcardBack", this.ownerInfo.idcardBack);
      }

      if (this.ownerInfo.drivingFront) {
        fd.append("jfUser.drivingFront", this.ownerInfo.drivingFront);
      }

      if (this.ownerInfo.drivingBack) {
        fd.append("jfUser.drivingBack", this.ownerInfo.drivingBack);
      }

      if (this.carInfo.city) {
        fd.append("jfCar.city", this.carInfo.city);
      }

      if (this.carInfo.plateNumbery) {
        fd.append("jfCar.plateNumber", "沪" + this.carInfo.plateNumber);
      }

      if (this.carInfo.brand) {
        fd.append("jfCar.brand", this.carInfo.brand);
      }

      if (this.carInfo.model) {
        fd.append("jfCar.model", this.carInfo.model);
      }

      if (this.carInfo.color) {
        fd.append("jfCar.color", this.carInfo.color);
      }

      if (this.carInfo.output) {
        fd.append("jfCar.output", this.carInfo.output + "L");
      }

      if (this.carInfo.gearbox) {
        fd.append("jfCar.gearbox", this.carInfo.gearbox);
      }

      if (this.carInfo.seatNum) {
        fd.append("jfCar.seatNum", this.carInfo.seatNum);
      }

      if (this.carInfo.engineNum) {
        fd.append("jfCar.engineNum", this.carInfo.engineNum);
      }

      if (this.carInfo.engineType) {
        fd.append("jfCar.engineType", this.carInfo.engineType);
      }

      if (this.carInfo.frameNum) {
        fd.append("jfCar.frameNum", this.carInfo.frameNum);
      }

      if (this.carInfo.enterModel) {
        fd.append("jfCar.enterModel", this.carInfo.enterModel);
      }

      if (this.carInfo.wantRent) {
        fd.append("jfCar.wantRent", this.carInfo.wantRent);
      }

      // 车辆照片
      let picArr = [];
      for (let i in this.carPic) {
        picArr.push(this.carPic[i]);
      }
      fd.append("jfCar.carPhoto", picArr.join(","));

      if (this.carInfo.carDesc) {
        fd.append("jfCar.carDesc", this.carInfo.carDesc);
      }

      if (this.carInfo.oilNumber) {
        fd.append("jfCar.oilNumber", this.carInfo.oilNumber);
      }

      if (this.feeInfo.rent) {
        fd.append("jfCar.rent", this.feeInfo.rent);
      }

      if (this.feeInfo.deposit) {
        fd.append("jfCar.deposit", this.feeInfo.deposit);
      }

      if (this.feeInfo.safeMoney) {
        fd.append("jfCar.safeMoney", this.feeInfo.safeMoney);
      }

      if (this.feeInfo.peccancyDeposit) {
        fd.append("jfCar.peccancyDeposit", this.feeInfo.peccancyDeposit);
      }

      if (this.feeInfo.serviceMoney) {
        fd.append("jfCar.serviceMoney", this.feeInfo.serviceMoney);
      }

      this.listLoading = true;

      // 如果有 id，则是更新。否则就是添加

      if (this.id) {
        fd.append("jfCar.id", this.id);
        updateCar(fd).then(response => {
          if (response.data.header.code == 200) {
            this.listLoading = false;
            window.location.href = "/#/car/car-list";
          } else {
            this.$alert(response.data.header.desc);
          }
        });
      } else {
        addCar(fd).then(response => {
          if (response.data.header.code == 200) {
            this.listLoading = false;
            window.location.href = "/#/car/car-list";
          } else {
            this.$alert(response.data.header.desc);
          }
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
            jf_token: Cookies.get("jf_token")
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
            jf_token: Cookies.get("jf_token")
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
            jf_token: Cookies.get("jf_token")
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
            jf_token: Cookies.get("jf_token")
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
            jf_token: Cookies.get("jf_token")
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

