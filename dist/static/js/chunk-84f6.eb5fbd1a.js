(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-84f6"],{"3VHu":function(t,e,n){},Mz3J:function(t,e,n){"use strict";Math.easeInOutQuad=function(t,e,n,o){return(t/=o/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e};var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function a(t,e,n){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,i=t-a,r=0;e=void 0===e?500:e;!function t(){r+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(r,a,i,e)),r<e?o(t):n&&"function"==typeof n&&n()}()}var i={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&a(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},r=(n("PelQ"),n("KHd+")),l=Object(r.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);l.options.__file="index.vue";e.a=l.exports},PelQ:function(t,e,n){"use strict";var o=n("X9ZH");n.n(o).a},X9ZH:function(t,e,n){},ZrS2:function(t,e,n){"use strict";n.d(e,"f",function(){return a}),n.d(e,"g",function(){return i}),n.d(e,"k",function(){return r}),n.d(e,"h",function(){return l}),n.d(e,"e",function(){return s}),n.d(e,"b",function(){return u}),n.d(e,"a",function(){return d}),n.d(e,"c",function(){return c}),n.d(e,"d",function(){return p}),n.d(e,"j",function(){return f}),n.d(e,"i",function(){return h});var o=n("t3Un");function a(t){return Object(o.a)({url:"/car/checkJoin",method:"post",data:t})}function i(t){return Object(o.a)({url:"/car/carList",method:"post",data:t})}function r(t){return Object(o.a)({url:"/car/updateCar",method:"post",data:t})}function l(t){return Object(o.a)({url:"/carColor/searchAll",method:"post",data:t})}function s(t){return Object(o.a)({url:"/carBrand/searchAll",method:"post",data:t})}function u(t){return Object(o.a)({url:"/car/add",method:"post",data:t})}function d(t){return Object(o.a)({url:"/carBrand/add",method:"post",data:t})}function c(t){return Object(o.a)({url:"/carColor/add",method:"post",data:t})}function p(t){return Object(o.a)({url:"/carModel/add",method:"post",data:t})}function f(t){return Object(o.a)({url:"/car/searchCarById",method:"post",data:t})}function h(t){return Object(o.a)({url:"/carModel/searchByBrand",method:"post",data:t})}},dIrF:function(t,e,n){"use strict";n.r(e);var o=n("ZrS2"),a={name:"CarAudit",components:{Pagination:n("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,date:void 0,city:void 0,plateNum:void 0,model:void 0,nickName:void 0,mobilePhone:void 0},cityOptions:[{label:"上海",key:"1"}],statusValue:void 0,statusOptions:[{label:"未审核",key:"0"},{label:"上线",key:"1"},{label:"下线",key:"2"},{label:"审核通过",key:"3"},{label:"未通过",key:"4"},{label:"已预定",key:"5"}],drivingMap:{0:"A1驾照",1:"A2驾照",2:"A3驾照",3:"B1驾照",4:"B2驾照",5:"C1驾照",6:"C2驾照"},carStatusMap:{0:"未审核",1:"上线",2:"下线",3:"审核通过",4:"未通过",5:"已预定"},dialogShowOwnerInfo:!1,ownerInfo:{balance:void 0,bankCardCount:void 0,createTime:void 0,drivingBack:void 0,drivingFront:void 0,drivingNum:void 0,drivingType:void 0,headImg:void 0,id:1,idcard:void 0,idcardBack:void 0,idcardFront:void 0,loginChannel:void 0,mobile:void 0,name:void 0,nickname:void 0,password:void 0,qualityType:void 0,updateTime:void 0,userOpenId:void 0,userStatus:void 0,userType:void 0},dialogShowCarPhoto:!1,carPhoto:[],showViewPhoto:!1,viewPhotoURL:void 0}},created:function(){this.getList()},methods:{getList:function(t){var e=this;this.listLoading=!0;var n=new FormData;t&&t.page&&(this.listQuery.page=t.page),this.listQuery.page&&n.append("pageInfo.pageNum",this.listQuery.page),this.listQuery.date&&n.append("date",this.listQuery.date),this.listQuery.plateNum&&n.append("plateNum",this.listQuery.plateNum),this.listQuery.model&&n.append("model",this.listQuery.model),this.listQuery.nickName&&n.append("nickName",this.listQuery.nickName),this.listQuery.mobilePhone&&n.append("mobile",this.listQuery.mobilePhone),this.statusValue&&n.append("carStatus",this.statusValue),Object(o.f)(n).then(function(t){t.data.body&&(e.list=t.data.body.infos?t.data.body.infos:[],e.total=t.data.body.pageInfo.total),e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},sortChange:function(t){var e=t.prop,n=t.order;"id"===e&&this.sortByID(n)},handleShowOwnerInfo:function(t){this.dialogShowOwnerInfo=!0,this.ownerInfo=t},handleShowCarPhoto:function(t){this.dialogShowCarPhoto=!0,this.carPhoto=t.split(","),console.log("this.carPhoto",this.carPhoto)},handleShowViewPhoto:function(t){this.showViewPhoto=!0,this.viewPhotoURL=t},handlePass:function(t,e){var n=this,a=new FormData;a.append("jfCar.carStatus",e),a.append("jfCar.id",t.id),a.append("jfUser.id",t.jfUser.id),Object(o.k)(a).then(function(o){n.getList(),3==e&&(window.location.hash="/car/car-add/"+t.id)})}}},i=(n("dNCV"),n("KHd+")),r=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"车牌号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.plateNum,callback:function(e){t.$set(t.listQuery,"plateNum",e)},expression:"listQuery.plateNum"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"型号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.model,callback:function(e){t.$set(t.listQuery,"model",e)},expression:"listQuery.model"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"用户名"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.nickName,callback:function(e){t.$set(t.listQuery,"nickName",e)},expression:"listQuery.nickName"}}),t._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"手机号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.mobilePhone,callback:function(e){t.$set(t.listQuery,"mobilePhone",e)},expression:"listQuery.mobilePhone"}}),t._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"车辆状态",clearable:""},model:{value:t.statusValue,callback:function(e){t.statusValue=e},expression:"statusValue"}},t._l(t.statusOptions,function(t){return n("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":t.sortChange}},[n("el-table-column",{attrs:{label:"ID",prop:"id",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"车主姓名",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.jfUser.name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"品牌",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.brand))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"型号",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.model))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"车牌号",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.plateNumber))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"车辆状态",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t.carStatusMap[e.row.carStatus]))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"申请时间",width:"160px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.createTime))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"车主信息",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){t.handleShowOwnerInfo(e.row.jfUser)}}},[t._v("查看")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.carStatus?n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){t.handlePass(e.row,3)}}},[t._v("通过")]):t._e(),t._v(" "),0==e.row.carStatus?n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){t.handlePass(e.row,4)}}},[t._v("不通过")]):t._e()]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),n("el-dialog",{attrs:{title:"车主信息查看",visible:t.dialogShowOwnerInfo},on:{"update:visible":function(e){t.dialogShowOwnerInfo=e}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[n("el-form-item",{attrs:{label:"姓名",prop:"type"}},[n("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.name,callback:function(e){t.$set(t.ownerInfo,"name",e)},expression:"ownerInfo.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"手机号",prop:"type"}},[n("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.mobile,callback:function(e){t.$set(t.ownerInfo,"mobile",e)},expression:"ownerInfo.mobile"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"身份证",prop:"type"}},[n("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.idcard,callback:function(e){t.$set(t.ownerInfo,"idcard",e)},expression:"ownerInfo.idcard"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"身份证正面",prop:"type"}},[n("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.idcardFront},on:{click:function(e){t.handleShowViewPhoto(t.ownerInfo.idcardFront)}}})]),t._v(" "),n("el-form-item",{attrs:{label:"身份证反面",prop:"type"}},[n("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.idcardBack},on:{click:function(e){t.handleShowViewPhoto(t.ownerInfo.idcardBack)}}})]),t._v(" "),n("el-form-item",{attrs:{label:"驾照",prop:"type"}},[n("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.drivingNum,callback:function(e){t.$set(t.ownerInfo,"drivingNum",e)},expression:"ownerInfo.drivingNum"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"驾照类型",prop:"type"}},[n("el-input",{attrs:{readonly:""},model:{value:t.drivingMap[t.ownerInfo.drivingType],callback:function(e){t.$set(t.drivingMap,t.ownerInfo.drivingType,e)},expression:"drivingMap[ownerInfo.drivingType]"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"驾照正面",prop:"type"}},[n("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.drivingFront},on:{click:function(e){t.handleShowViewPhoto(t.ownerInfo.drivingFront)}}})]),t._v(" "),n("el-form-item",{attrs:{label:"驾照反面",prop:"type"}},[n("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.drivingBack},on:{click:function(e){t.handleShowViewPhoto(t.ownerInfo.drivingBack)}}})])],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogShowOwnerInfo=!1}}},[t._v("关闭")])],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"车辆照片查看",visible:t.dialogShowCarPhoto},on:{"update:visible":function(e){t.dialogShowCarPhoto=e}}},[n("el-carousel",{attrs:{height:"300px","indicator-position":"outside"}},t._l(t.carPhoto,function(t){return n("el-carousel-item",{key:t},[n("img",{staticStyle:{height:"300px"},attrs:{src:t}})])})),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogShowOwnerInfo=!1}}},[t._v("关闭")])],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"预览照片",visible:t.showViewPhoto,fullscreen:"true"},on:{"update:visible":function(e){t.showViewPhoto=e}}},[n("img",{attrs:{src:t.viewPhotoURL}}),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.showViewPhoto=!1}}},[t._v("关闭")])],1)])],1)},[],!1,null,null,null);r.options.__file="carAudit.vue";e.default=r.exports},dNCV:function(t,e,n){"use strict";var o=n("3VHu");n.n(o).a}}]);