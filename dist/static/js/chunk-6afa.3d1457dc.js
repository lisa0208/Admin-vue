(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6afa"],{"584e":function(e,n,t){"use strict";t.r(n);var o=t("ZrS2"),a=t("Mz3J"),r=t("vDqi"),i=t.n(r),d=t("KjxJ"),c=t.n(d),l=t("p46w"),f=t.n(l),s={name:"CarList",components:{Pagination:a.a},data:function(){return{id:!!this.$route.params.id&&this.$route.params.id,uploadUrl:"",cityOptions:[{label:"上海",key:"上海"}],colorOption:[],brandOption:[],modelOption:[],ownerInfo:{drivingBack:void 0,drivingFront:void 0,drivingNum:void 0,drivingType:void 0,idcardBack:void 0,idcardFront:void 0,mobile:void 0,idcard:void 0,name:void 0},carInfo:{brand:void 0,carDesc:void 0,city:void 0,color:void 0,engineNum:void 0,enterModel:void 0,frameNum:void 0,gearbox:void 0,model:void 0,oilNumber:void 0,output:void 0,plateNumber:void 0,seatNum:void 0,wantRent:void 0},feeInfo:{rent:void 0,safeMoney:void 0,deposit:void 0,peccancyDeposit:void 0,serviceMoney:void 0},carPhotoList:[],fileList:[]}},created:function(){var e=this;if(console.log(this.id),this.id){var n=new FormData;n.append("id",this.id),Object(o.n)(n).then(function(n){e.listLoading=!1,console.log(n),e.ownerInfo.name=n.data.body.jfUser.name,e.ownerInfo.mobile=n.data.body.jfUser.mobile,e.ownerInfo.idcard=n.data.body.jfUser.idcard,e.ownerInfo.idcardBack=n.data.body.jfUser.idcardBack,e.ownerInfo.idcardFront=n.data.body.jfUser.idcardFront,e.ownerInfo.drivingBack=n.data.body.jfUser.drivingBack,e.ownerInfo.drivingFront=n.data.body.jfUser.drivingFront,e.ownerInfo.drivingNum=n.data.body.jfUser.drivingNum,e.ownerInfo.drivingType=n.data.body.jfUser.drivingType,e.ownerInfo.headImg=n.data.body.jfUser.headImg,e.carInfo.plateNumber=n.data.body.plateNumber,e.carInfo.brand=n.data.body.brand,e.carInfo.carDesc=n.data.body.carDesc,e.carInfo.city=n.data.body.city,e.carInfo.color=n.data.body.color,e.carInfo.engineNum=n.data.body.engineNum,e.carInfo.frameNum=n.data.body.frameNum,e.carInfo.gearbox=n.data.body.gearbox,e.carInfo.model=n.data.body.model,e.carInfo.oilNumber=n.data.body.oilNumber,e.carInfo.wantRent=n.data.body.wantRent,e.carInfo.seatNum=n.data.body.seatNum,e.carInfo.output=n.data.body.output,e.carInfo.enterModel=n.data.body.enterModel,e.feeInfo.rent=n.data.body.rent,e.feeInfo.safeMoney=n.data.body.safeMoney,e.feeInfo.deposit=n.data.body.deposit,e.feeInfo.peccancyDeposit=n.data.body.peccancyDeposit,e.feeInfo.serviceMoney=n.data.body.serviceMoney;for(var t=n.data.body.carPhoto.split(","),o=[],a=0;a<t.length;a++){var r={};r.url=t[a],r.name=t[a],o.push(r),console.log("tempArr",o)}e.fileList=o}),Object(o.k)().then(function(n){e.colorOption=n.data.body,console.log("this.colorOption",e.colorOption)})}Object(o.h)().then(function(n){e.brandOption=n.data.body,console.log("this.brandOption",e.brandOption)}),this.getModelList(null)},methods:{handlecarPhotoListChange:function(e,n){console.log(e,n)},handleRemove:function(e,n){console.log(e,n);for(var t=0;t<this.fileList.length;t++)this.fileList[t].uid==e.uid&&this.fileList.splice(t,1)},handleExceed:function(){this.$alert("最多上传5张车辆照片")},getModelList:function(e){var n=this;e&&(console.log(e,"res"),this.carInfo.brand=e);var t=new FormData;this.carInfo.brand&&t.append("id",this.carInfo.brand),Object(o.l)(t).then(function(e){n.modelOption=e.data.body,console.log("this.modelOption",n.modelOption)})},handleSubmit:function(){var e=this;for(var n in this.carInfo){for(var t in console.log(this.carInfo),this.brandOption)this.brandOption[t].id==this.carInfo.brand&&(this.carInfo.brandName=this.brandOption[t].brand,console.log("this.carInfo.brand",this.carInfo.brandName));if(void 0===this.carInfo[n]||"undefined"==this.carInfo[n])return console.log(this.carInfo[n]),alert("请完善车辆信息"),!1}for(var a in this.ownerInfo)if(console.log(a),void 0===this.ownerInfo[a]||"undefined"==this.ownerInfo[a])return console.log(this.ownerInfo[a]),alert("请完善车主信息"),!1;for(var r in this.feeInfo)if(void 0===this.feeInfo[r]||"undefined"==this.feeInfo[r])return alert("请完善费用信息"),!1;var i=new FormData;i.append("jfUser.mobile",this.ownerInfo.mobile),i.append("jfUser.name",this.ownerInfo.name),i.append("jfUser.idcard",this.ownerInfo.idcard),i.append("jfUser.drivingNum",this.ownerInfo.drivingNum),i.append("jfUser.drivingType",this.ownerInfo.drivingType),i.append("jfUser.idcardFront",this.ownerInfo.idcardFront),i.append("jfUser.idcardBack",this.ownerInfo.idcardBack),i.append("jfUser.drivingFront",this.ownerInfo.drivingFront),i.append("jfUser.drivingBack",this.ownerInfo.drivingBack),i.append("JfCar.city",this.carInfo.city),i.append("JfCar.plateNumber",this.carInfo.plateNumber),i.append("JfCar.brand",this.carInfo.brandName),i.append("JfCar.model",this.carInfo.model),i.append("JfCar.color",this.carInfo.color),i.append("JfCar.output",this.carInfo.output),i.append("JfCar.gearbox",this.carInfo.gearbox),i.append("JfCar.seatNum",this.carInfo.seatNum),i.append("JfCar.engineNum",this.carInfo.engineNum),i.append("JfCar.frameNum",this.carInfo.frameNum),i.append("JfCar.enterModel",this.carInfo.enterModel),i.append("JfCar.wantRent",this.carInfo.wantRent);for(var d=new Array,c=0;c<this.fileList.length;c++)d.push(this.fileList[c].url);i.append("JfCar.carPhoto",d.join(",")),i.append("JfCar.carDesc",this.carInfo.carDesc),i.append("JfCar.oilNumber",this.carInfo.oilNumber),i.append("JfCar.rent",this.feeInfo.rent),i.append("JfCar.safeMoney",this.feeInfo.safeMoney),i.append("JfCar.deposit",this.feeInfo.deposit),i.append("JfCar.peccancyDeposit",this.feeInfo.peccancyDeposit),i.append("JfCar.serviceMoney",this.feeInfo.serviceMoney),this.listLoading=!0,this.id?(i.append("jfCar.id",this.id),Object(o.o)(i).then(function(n){e.listLoading=!1,window.location.reload()})):Object(o.b)(i).then(function(n){e.listLoading=!1,window.location.reload()})},beforeUploadIdCardFront:function(e){var n=new FormData;n.append("uploadFile",e.file);var t=this;return i.a.post(c.a.BASE_API+"/file/upload",n,{headers:{jf_token:f.a.get("jf_token")}}).then(function(e){t.ownerInfo.idcardFront=e.data.body}).catch(function(e){console.log(e)}),!1},beforeUploadIdCardBack:function(e){var n=new FormData;n.append("uploadFile",e.file);var t=this;return i.a.post(c.a.BASE_API+"/file/upload",n,{headers:{jf_token:f.a.get("jf_token")}}).then(function(e){t.ownerInfo.idcardBack=e.data.body}).catch(function(e){console.log(e)}),!1},beforeUploadDrivingFront:function(e){var n=new FormData;n.append("uploadFile",e.file);var t=this;return i.a.post(c.a.BASE_API+"/file/upload",n,{headers:{jf_token:f.a.get("jf_token")}}).then(function(e){t.ownerInfo.drivingFront=e.data.body}).catch(function(e){console.log(e)}),!1},beforeUploadDrivingBack:function(e){var n=new FormData;n.append("uploadFile",e.file);var t=this;return i.a.post(c.a.BASE_API+"/file/upload",n,{headers:{jf_token:f.a.get("jf_token")}}).then(function(e){t.ownerInfo.drivingBack=e.data.body}).catch(function(e){console.log(e)}),!1},beforeUploadCarPhoto:function(e){var n=new FormData;n.append("uploadFile",e.file);var t=this;return i.a.post(c.a.BASE_API+"/file/upload",n,{headers:{jf_token:f.a.get("jf_token")}}).then(function(e){var n={};n.name=e.data.body,n.url=e.data.body,t.fileList.push(n),console.log("这里的 file list",t.fileList)}).catch(function(e){console.log(e)}),!1}}},u=(t("Y3tO"),t("KHd+")),p=Object(u.a)(s,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"app-container"},[t("el-row",{attrs:{gutter:5}},[t("el-col",{attrs:{span:24}},[t("el-card",{staticClass:"box-card"},[t("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t("span",[e._v("修改密码")])]),e._v(" "),t("div",{staticClass:"text"},[t("el-form",{ref:"form",attrs:{"label-width":"150px"}},[t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{model:{value:e.username,callback:function(n){e.username=n},expression:"username"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"手机号"}},[t("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.input4,callback:function(n){e.input4=n},expression:"input4"}},[t("el-button",{attrs:{slot:"append"},slot:"append"},[e._v("发送验证码")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"验证码"}},[t("el-input",{model:{value:e.ownerInfo.mobile,callback:function(n){e.$set(e.ownerInfo,"mobile",n)},expression:"ownerInfo.mobile"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"新密码"}},[t("el-input",{model:{value:e.ownerInfo.idcard,callback:function(n){e.$set(e.ownerInfo,"idcard",n)},expression:"ownerInfo.idcard"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"再次输入新密码"}},[t("el-input",{model:{value:e.ownerInfo.idcard,callback:function(n){e.$set(e.ownerInfo,"idcard",n)},expression:"ownerInfo.idcard"}})],1)],1)],1)])],1)],1),e._v(" "),t("el-button",{staticClass:"filter-item",staticStyle:{"margin-top":"10px"},attrs:{type:"primary",icon:"el-icon-upload2"},on:{click:e.handleSubmit}},[e._v("提交")])],1)},[],!1,null,null,null);p.options.__file="modPwd.vue";n.default=p.exports},Mz3J:function(e,n,t){"use strict";Math.easeInOutQuad=function(e,n,t,o){return(e/=o/2)<1?t/2*e*e+n:-t/2*(--e*(e-2)-1)+n};var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function a(e,n,t){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,r=e-a,i=0;n=void 0===n?500:n;!function e(){i+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(i,a,r,n)),i<n?o(e):t&&"function"==typeof t&&t()}()}var r={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&a(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},i=(t("PelQ"),t("KHd+")),d=Object(i.a)(r,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[t("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(n){e.currentPage=n},"update:pageSize":function(n){e.pageSize=n},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);d.options.__file="index.vue";n.a=d.exports},OtKt:function(e,n,t){},PelQ:function(e,n,t){"use strict";var o=t("X9ZH");t.n(o).a},X9ZH:function(e,n,t){},Y3tO:function(e,n,t){"use strict";var o=t("OtKt");t.n(o).a},ZrS2:function(e,n,t){"use strict";t.d(n,"i",function(){return a}),t.d(n,"j",function(){return r}),t.d(n,"o",function(){return i}),t.d(n,"k",function(){return d}),t.d(n,"m",function(){return c}),t.d(n,"h",function(){return l}),t.d(n,"b",function(){return f}),t.d(n,"a",function(){return s}),t.d(n,"c",function(){return u}),t.d(n,"d",function(){return p}),t.d(n,"n",function(){return h}),t.d(n,"l",function(){return m}),t.d(n,"e",function(){return b}),t.d(n,"f",function(){return v}),t.d(n,"g",function(){return g});var o=t("t3Un");function a(e){return Object(o.a)({url:"/car/checkJoin",method:"post",data:e})}function r(e){return Object(o.a)({url:"/car/carList",method:"post",data:e})}function i(e){return Object(o.a)({url:"/car/updateCar",method:"post",data:e})}function d(e){return Object(o.a)({url:"/carColor/searchAll",method:"post",data:e})}function c(e){return Object(o.a)({url:"/carModel/searchAll",method:"post",data:e})}function l(e){return Object(o.a)({url:"/carBrand/searchAll",method:"post",data:e})}function f(e){return Object(o.a)({url:"/car/add",method:"post",data:e})}function s(e){return Object(o.a)({url:"/carBrand/add",method:"post",data:e})}function u(e){return Object(o.a)({url:"/carColor/add",method:"post",data:e})}function p(e){return Object(o.a)({url:"/carModel/add",method:"post",data:e})}function h(e){return Object(o.a)({url:"/car/searchCarById",method:"post",data:e})}function m(e){return Object(o.a)({url:"/carModel/searchByBrand",method:"post",data:e})}function b(e){return Object(o.a)({url:"/carBrand/delete",method:"post",data:e})}function v(e){return Object(o.a)({url:"/carColor/delete",method:"post",data:e})}function g(e){return Object(o.a)({url:"/carModel/delete",method:"post",data:e})}}}]);