(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c5b4"],{"7n/k":function(t,e,a){"use strict";var n=a("sPAK");a.n(n).a},Mz3J:function(t,e,a){"use strict";Math.easeInOutQuad=function(t,e,a,n){return(t/=n/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function i(t,e,a){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=t-i,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,i,o,e)),l<e?n(t):a&&"function"==typeof a&&a()}()}var o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&i(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&i(0,800)}}},l=(a("PelQ"),a("KHd+")),r=Object(l.a)(o,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);r.options.__file="index.vue";e.a=r.exports},PelQ:function(t,e,a){"use strict";var n=a("X9ZH");a.n(n).a},X9ZH:function(t,e,a){},ZrS2:function(t,e,a){"use strict";a.d(e,"f",function(){return i}),a.d(e,"g",function(){return o}),a.d(e,"k",function(){return l}),a.d(e,"h",function(){return r}),a.d(e,"e",function(){return s}),a.d(e,"b",function(){return u}),a.d(e,"a",function(){return d}),a.d(e,"c",function(){return c}),a.d(e,"d",function(){return p}),a.d(e,"j",function(){return f}),a.d(e,"i",function(){return h});var n=a("t3Un");function i(t){return Object(n.a)({url:"/car/checkJoin",method:"post",data:t})}function o(t){return Object(n.a)({url:"/car/carList",method:"post",data:t})}function l(t){return Object(n.a)({url:"/car/updateCar",method:"post",data:t})}function r(t){return Object(n.a)({url:"/carColor/searchAll",method:"post",data:t})}function s(t){return Object(n.a)({url:"/carBrand/searchAll",method:"post",data:t})}function u(t){return Object(n.a)({url:"/car/add",method:"post",data:t})}function d(t){return Object(n.a)({url:"/carBrand/add",method:"post",data:t})}function c(t){return Object(n.a)({url:"/carColor/add",method:"post",data:t})}function p(t){return Object(n.a)({url:"/carModel/add",method:"post",data:t})}function f(t){return Object(n.a)({url:"/car/searchCarById",method:"post",data:t})}function h(t){return Object(n.a)({url:"/carModel/searchByBrand",method:"post",data:t})}},r1XO:function(t,e,a){"use strict";a.r(e);var n=a("ZrS2"),i={name:"CarList",components:{Pagination:a("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,date:void 0,plateNo:void 0,model:void 0,nickName:void 0,mobile:void 0},cityOptions:[{label:"上海",key:"1"}],statusValue:void 0,statusOptions:[{label:"未审核",key:"0"},{label:"上线",key:"1"},{label:"下线",key:"2"},{label:"审核通过",key:"3"},{label:"未通过",key:"4"},{label:"已预定",key:"5"}],drivingMap:{0:"A1驾照",1:"A2驾照",2:"A3驾照",3:"B1驾照",4:"B2驾照",5:"C1驾照",6:"C2驾照"},carStatusMap:{0:"未审核",1:"上线",2:"下线",3:"审核通过",4:"未通过",5:"已预定"},dialogShowOwnerInfo:!1,ownerInfo:{balance:void 0,bankCardCount:void 0,createTime:void 0,drivingBack:void 0,drivingFront:void 0,drivingNum:void 0,drivingType:void 0,headImg:void 0,id:1,idcard:void 0,idcardBack:void 0,idcardFront:void 0,loginChannel:void 0,mobile:void 0,name:void 0,nickname:void 0,password:void 0,qualityType:void 0,updateTime:void 0,userOpenId:void 0,userStatus:void 0,userType:void 0},dialogShowUnavailableDays:!1,unavailableDays:void 0,rowCarId:void 0,rowUserId:void 0,dialogShowCarPhoto:!1,carPhoto:[]}},created:function(){this.getList()},methods:{getList:function(t){var e=this;this.listLoading=!0;var a=new FormData;t&&t.page&&(this.listQuery.page=t.page),this.listQuery.page&&a.append("pageInfo.pageNum",this.listQuery.page),this.listQuery.date&&a.append("date",this.listQuery.date),this.listQuery.plateNum&&a.append("plateNum",this.listQuery.plateNum),this.listQuery.model&&a.append("model",this.listQuery.model),this.listQuery.nickName&&a.append("nickName",this.listQuery.nickName),this.listQuery.mobile&&a.append("mobile",this.listQuery.mobile),this.statusValue&&a.append("carStatus",this.statusValue),Object(n.g)(a).then(function(t){e.list=t.data.body.infos,e.total=t.data.body.pageInfo.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},sortChange:function(t){var e=t.prop,a=t.order;"id"===e&&this.sortByID(a)},handleShowOwnerInfo:function(t){this.dialogShowOwnerInfo=!0,this.ownerInfo=t},handleShowCarPhoto:function(t){this.dialogShowCarPhoto=!0,this.carPhoto=t.split(","),console.log("this.carPhoto",this.carPhoto)},handlePass:function(t,e){var a=this,i=new FormData;i.append("jfCar.id",t.id),i.append("jfUser.id",t.jfUser.id),i.append("jfCar.carStatus",e),Object(n.k)(i).then(function(t){a.getList()})},setUnavaluableDays:function(t){this.rowCarId=t.id,this.rowUserId=t.jfUser.id,this.dialogShowUnavailableDays=!0},formatDate:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+(e.getHours()>9?e.getHours():"0"+e.getHours())+":"+(e.getMinutes()>9?e.getMinutes():"0"+e.getMinutes())+":"+(e.getSeconds()>9?e.getSeconds():"0"+e.getSeconds())},handleSetUnavailableDays:function(){var t=this;if(this.unavailableDays){var e=this.unavailableDays[0],a=this.unavailableDays[1],i=new FormData;i.append("jfCar.id",this.rowCarId),i.append("jfUser.id",this.rowUserId),i.append("jfCar.unavailableTimeStart",this.formatDate(e)),i.append("jfCar.unavailableTimeStop",this.formatDate(a)),Object(n.k)(i).then(function(e){t.dialogShowUnavailableDays=!1,t.getList()})}else this.$alert("请选择起止时间")},goToAddCar:function(){window.location.href="/#/car/car-add/:id"}}},o=(a("7n/k"),a("KHd+")),l=Object(o.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-date-picker",{staticClass:"filter-item",attrs:{type:"datetime","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.listQuery.date,callback:function(e){t.$set(t.listQuery,"date",e)},expression:"listQuery.date"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"车牌号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.plateNum,callback:function(e){t.$set(t.listQuery,"plateNum",e)},expression:"listQuery.plateNum"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"型号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.model,callback:function(e){t.$set(t.listQuery,"model",e)},expression:"listQuery.model"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"用户名"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.nickName,callback:function(e){t.$set(t.listQuery,"nickName",e)},expression:"listQuery.nickName"}}),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"手机号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.mobile,callback:function(e){t.$set(t.listQuery,"mobile",e)},expression:"listQuery.mobile"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"车辆状态",clearable:""},model:{value:t.statusValue,callback:function(e){t.statusValue=e},expression:"statusValue"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")]),t._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.goToAddCar}},[t._v("添加")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":t.sortChange}},[a("el-table-column",{attrs:{label:"ID",prop:"id",sortable:"custom",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"车主姓名",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.jfUser.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"品牌",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.brand))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"型号",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.model))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"车牌号",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.plateNumber))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"车辆状态",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t.carStatusMap[e.row.carStatus]))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"颜色",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.color))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"不可用开始时间",width:"160px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.unavailableTimeStart))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"不可用结束时间",width:"160px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.unavailableTimeStop))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"申请时间",width:"160px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.createTime))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"车主信息",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleShowOwnerInfo(e.row.jfUser)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"车辆照片",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleShowCarPhoto(e.row.carPhoto)}}},[t._v("查看")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[3==e.row.carStatus?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handlePass(e.row,1)}}},[t._v("上线")]):t._e(),t._v(" "),1==e.row.carStatus?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handlePass(e.row,0)}}},[t._v("下线")]):t._e(),t._v(" "),1==e.row.carStatus?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.setUnavaluableDays(e.row)}}},[t._v("设置不可用日期")]):t._e()]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),a("el-dialog",{attrs:{title:"车主信息查看",visible:t.dialogShowOwnerInfo},on:{"update:visible":function(e){t.dialogShowOwnerInfo=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{label:"姓名",prop:"type"}},[a("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.name,callback:function(e){t.$set(t.ownerInfo,"name",e)},expression:"ownerInfo.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"type"}},[a("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.mobile,callback:function(e){t.$set(t.ownerInfo,"mobile",e)},expression:"ownerInfo.mobile"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"身份证",prop:"type"}},[a("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.idcard,callback:function(e){t.$set(t.ownerInfo,"idcard",e)},expression:"ownerInfo.idcard"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"身份证正面",prop:"type"}},[a("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.idcardFront}})]),t._v(" "),a("el-form-item",{attrs:{label:"身份证反面",prop:"type"}},[a("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.idcardBack}})]),t._v(" "),a("el-form-item",{attrs:{label:"驾照",prop:"type"}},[a("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.drivingNum,callback:function(e){t.$set(t.ownerInfo,"drivingNum",e)},expression:"ownerInfo.drivingNum"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"驾照类型",prop:"type"}},[a("el-input",{attrs:{readonly:""},model:{value:t.drivingMap[t.ownerInfo.drivingType],callback:function(e){t.$set(t.drivingMap,t.ownerInfo.drivingType,e)},expression:"drivingMap[ownerInfo.drivingType]"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"驾照正面",prop:"type"}},[a("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.drivingFront}})]),t._v(" "),a("el-form-item",{attrs:{label:"驾照反面",prop:"type"}},[a("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.drivingBack}})])],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogShowOwnerInfo=!1}}},[t._v("关闭")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"车辆照片查看",visible:t.dialogShowCarPhoto},on:{"update:visible":function(e){t.dialogShowCarPhoto=e}}},[a("el-carousel",{attrs:{height:"150px"}},t._l(t.carPhoto,function(t){return a("el-carousel-item",{key:t},[a("img",{attrs:{src:t}})])})),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogShowOwnerInfo=!1}}},[t._v("关闭")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"设置不可用日期",visible:t.dialogShowUnavailableDays},on:{"update:visible":function(e){t.dialogShowUnavailableDays=e}}},[a("el-form",{staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{label:"请选择日期范围",prop:"type"}},[a("el-date-picker",{staticClass:"filter-item",attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期时间","end-placeholder":"结束日期时间"},model:{value:t.unavailableDays,callback:function(e){t.unavailableDays=e},expression:"unavailableDays"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.handleSetUnavailableDays}},[t._v("设置")]),t._v(" "),a("el-button",{on:{click:function(e){t.dialogShowUnavailableDays=!1}}},[t._v("关闭")])],1)],1)],1)},[],!1,null,null,null);l.options.__file="carList.vue";e.default=l.exports},sPAK:function(t,e,a){}}]);