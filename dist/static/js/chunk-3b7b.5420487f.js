(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3b7b"],{Mz3J:function(e,t,n){"use strict";Math.easeInOutQuad=function(e,t,n,o){return(e/=o/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function i(e,t,n){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,l=e-i,a=0;t=void 0===t?500:t;!function e(){a+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(a,i,l,t)),a<t?o(e):n&&"function"==typeof n&&n()}()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&i(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&i(0,800)}}},a=(n("PelQ"),n("KHd+")),r=Object(a.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);r.options.__file="index.vue";t.a=r.exports},OxvE:function(e,t,n){"use strict";n.r(t);var o=n("t3Un");var i={name:"CarList",components:{Pagination:n("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,date:void 0,city:"1",plateNo:"",model:"",username:"",mobilePhone:""},cityOptions:[{label:"上海",key:"1"}],chekcValue:void 0,checkOptions:[{label:"未审核",key:"0"},{label:"已审核",key:"1"}],passValue:void 0,passOptions:[{label:"审核通过",key:"1"},{label:"审核不通过",key:"0"}],dialogShowOwnerInfo:!1,ownerInfo:{balance:void 0,bankCardCount:void 0,createTime:void 0,drivingBack:void 0,drivingFront:void 0,drivingNum:void 0,drivingType:void 0,headImg:void 0,id:1,idcard:void 0,idcardBack:void 0,idcardFront:void 0,loginChannel:void 0,mobile:void 0,name:void 0,nickname:void 0,password:void 0,qualityType:void 0,updateTime:void 0,userOpenId:void 0,userStatus:void 0,userType:void 0},dialogShowCarInfo:!1,carInfo:{brand:void 0,carDesc:void 0,carPhoto:void 0,carStatus:void 0,city:void 0,color:void 0,createTime:void 0,deposit:void 0,engineNum:void 0,enterModel:void 0,frameNum:void 0,gearbox:void 0,id:void 0,jfUser:void 0,model:void 0,oilNumber:void 0,output:void 0,ownerId:void 0,peccancyDeposit:void 0,plateNumber:void 0,rent:void 0,safeMoney:void 0,seatNum:void 0,serviceMoney:void 0,unavailableTimeStart:void 0,unavailableTimeStop:void 0,updateTime:void 0,wantRent:void 0}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,function(e){return Object(o.a)({url:"/order/orderManageSearch",method:"post",data:e})}(this.listQuery).then(function(t){e.list=t.data.body.infos,e.total=t.data.body.pageInfo.size,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},sortChange:function(e){var t=e.prop,n=e.order;"id"===t&&this.sortByID(n)},handleShowOwnerInfo:function(e){this.dialogShowOwnerInfo=!0,this.ownerInfo=e},handleShowCarInfo:function(e){this.dialogShowCarInfo=!0,this.carInfo=e},handlePass:function(){}}},l=(n("z6ft"),n("KHd+")),a=Object(l.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.listQuery.date,callback:function(t){e.$set(e.listQuery,"date",t)},expression:"listQuery.date"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"订单号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.plateNo,callback:function(t){e.$set(e.listQuery,"plateNo",t)},expression:"listQuery.plateNo"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"用户名"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.username,callback:function(t){e.$set(e.listQuery,"username",t)},expression:"listQuery.username"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"车牌号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.plateNo,callback:function(t){e.$set(e.listQuery,"plateNo",t)},expression:"listQuery.plateNo"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"手机号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.mobilePhone,callback:function(t){e.$set(e.listQuery,"mobilePhone",t)},expression:"listQuery.mobilePhone"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"型号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.model,callback:function(t){e.$set(e.listQuery,"model",t)},expression:"listQuery.model"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"颜色"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.model,callback:function(t){e.$set(e.listQuery,"model",t)},expression:"listQuery.model"}}),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"状态(全部/未审核/已审核)",clearable:""},model:{value:e.chekcValue,callback:function(t){e.chekcValue=t},expression:"chekcValue"}},e._l(e.checkOptions,function(e){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("table.search")))]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"}},[e._v(e._s(e.$t("table.add")))])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[n("el-table-column",{attrs:{label:"订单ID",align:"center",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.orderId))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车辆ID",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.carId))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"优惠券ID","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.couponId))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"订单类型",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.orderType))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"应付费用",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.shouldFee))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"实际费用",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.actualFee))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"扣除费用",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.cutFee))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"违章扣费",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.cutPeccancyFee))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车辆扣费",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.cutCarFee))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"支付时间",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.orderPayTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"订单开始时间",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.orderStartTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"订单结束时间",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.orderStopTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车主信息",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handleShowOwnerInfo(t.row.jfUser)}}},[e._v("查看")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车辆信息",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handleShowCarInfo(t.row.jfCar)}}},[e._v("查看")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("table.actions"),align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handlePass(t.row,1)}}},[e._v("上线")]),e._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){e.handlePass(t.row,0)}}},[e._v("下线")])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){e.$set(e.listQuery,"page",t)},"update:limit":function(t){e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),n("el-dialog",{attrs:{title:"车主信息查看",visible:e.dialogShowOwnerInfo},on:{"update:visible":function(t){e.dialogShowOwnerInfo=t}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[n("el-form-item",{attrs:{label:"姓名",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.name,callback:function(t){e.$set(e.ownerInfo,"name",t)},expression:"ownerInfo.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"手机号",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.mobile,callback:function(t){e.$set(e.ownerInfo,"mobile",t)},expression:"ownerInfo.mobile"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"身份证",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.idcard,callback:function(t){e.$set(e.ownerInfo,"idcard",t)},expression:"ownerInfo.idcard"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"身份证正面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.idcardFront}})]),e._v(" "),n("el-form-item",{attrs:{label:"身份证反面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.idcardBack}})]),e._v(" "),n("el-form-item",{attrs:{label:"驾照",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.drivingNum,callback:function(t){e.$set(e.ownerInfo,"drivingNum",t)},expression:"ownerInfo.drivingNum"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"驾照类型",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.drivingType,callback:function(t){e.$set(e.ownerInfo,"drivingType",t)},expression:"ownerInfo.drivingType"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"驾照正面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.drivingFront}})]),e._v(" "),n("el-form-item",{attrs:{label:"驾照反面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.drivingBack}})])],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogShowOwnerInfo=!1}}},[e._v("关闭")])],1)],1),e._v(" "),n("el-dialog",{attrs:{title:"车辆信息查看",visible:e.dialogShowCarInfo},on:{"update:visible":function(t){e.dialogShowCarInfo=t}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[n("el-form-item",{attrs:{label:"车辆 ID",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.plateNumber,callback:function(t){e.$set(e.ownerInfo,"plateNumber",t)},expression:"ownerInfo.plateNumber"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"车牌号",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.plateNumber,callback:function(t){e.$set(e.ownerInfo,"plateNumber",t)},expression:"ownerInfo.plateNumber"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"品牌",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.brand,callback:function(t){e.$set(e.ownerInfo,"brand",t)},expression:"ownerInfo.brand"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"型号",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.model,callback:function(t){e.$set(e.ownerInfo,"model",t)},expression:"ownerInfo.model"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"城市",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.city}})]),e._v(" "),n("el-form-item",{attrs:{label:"颜色",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.color}})]),e._v(" "),n("el-form-item",{attrs:{label:"齿轮箱",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.gearbox,callback:function(t){e.$set(e.ownerInfo,"gearbox",t)},expression:"ownerInfo.gearbox"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogShowOwnerInfo=!1}}},[e._v("关闭")])],1)],1)],1)},[],!1,null,null,null);a.options.__file="orderList.vue";t.default=a.exports},PelQ:function(e,t,n){"use strict";var o=n("X9ZH");n.n(o).a},X9ZH:function(e,t,n){},iE2N:function(e,t,n){},z6ft:function(e,t,n){"use strict";var o=n("iE2N");n.n(o).a}}]);