(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-332f"],{"3VHu":function(e,t,n){},Mz3J:function(e,t,n){"use strict";Math.easeInOutQuad=function(e,t,n,a){return(e/=a/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};function i(e,t,n){var i=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,l=e-i,o=0;t=void 0===t?500:t;!function e(){o+=20,function(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}(Math.easeInOutQuad(o,i,l,t)),o<t?a(e):n&&"function"==typeof n&&n()}()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&i(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&i(0,800)}}},o=(n("PelQ"),n("KHd+")),r=Object(o.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[n("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);r.options.__file="index.vue";t.a=r.exports},PelQ:function(e,t,n){"use strict";var a=n("X9ZH");n.n(a).a},X9ZH:function(e,t,n){},ZrS2:function(e,t,n){"use strict";n.d(t,"f",function(){return i}),n.d(t,"g",function(){return l}),n.d(t,"k",function(){return o}),n.d(t,"h",function(){return r}),n.d(t,"i",function(){return s}),n.d(t,"e",function(){return u}),n.d(t,"b",function(){return c}),n.d(t,"a",function(){return d}),n.d(t,"c",function(){return p}),n.d(t,"d",function(){return f}),n.d(t,"j",function(){return m});var a=n("t3Un");function i(e){return Object(a.a)({url:"/car/checkJoin",method:"post",data:e})}function l(e){return Object(a.a)({url:"/car/carList",method:"post",data:e})}function o(e){return Object(a.a)({url:"/car/updateCar",method:"post",data:e})}function r(e){return Object(a.a)({url:"/carColor/searchAll",method:"post",data:e})}function s(e){return Object(a.a)({url:"/carModel/searchAll",method:"post",data:e})}function u(e){return Object(a.a)({url:"/carBrand/searchAll",method:"post",data:e})}function c(e){return Object(a.a)({url:"/car/add",method:"post",data:e})}function d(e){return Object(a.a)({url:"/carBrand/add",method:"post",data:e})}function p(e){return Object(a.a)({url:"/carColor/add",method:"post",data:e})}function f(e){return Object(a.a)({url:"/carModel/add",method:"post",data:e})}function m(e){return Object(a.a)({url:"/car/searchCarById",method:"post",data:e})}},dIrF:function(e,t,n){"use strict";n.r(t);var a=n("ZrS2"),i={name:"CarAudit",components:{Pagination:n("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,date:void 0,city:void 0,plateNum:void 0,model:void 0,nickName:void 0,mobilePhone:void 0},cityOptions:[{label:"上海",key:"1"}],chekcValue:void 0,checkOptions:[{label:"未审核",key:"0"},{label:"已审核",key:"1"}],passValue:void 0,passOptions:[{label:"审核通过",key:"1"},{label:"审核不通过",key:"0"}],dialogShowOwnerInfo:!1,ownerInfo:{balance:void 0,bankCardCount:void 0,createTime:void 0,drivingBack:void 0,drivingFront:void 0,drivingNum:void 0,drivingType:void 0,headImg:void 0,id:1,idcard:void 0,idcardBack:void 0,idcardFront:void 0,loginChannel:void 0,mobile:void 0,name:void 0,nickname:void 0,password:void 0,qualityType:void 0,updateTime:void 0,userOpenId:void 0,userStatus:void 0,userType:void 0}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0;var t=new FormData;this.listQuery.page&&t.append("page",this.listQuery.page),this.listQuery.limit&&t.append("limit",this.listQuery.limit),this.listQuery.date&&t.append("date",this.listQuery.date),this.listQuery.city&&t.append("city",this.listQuery.city),this.listQuery.plateNum&&t.append("plateNum",this.listQuery.plateNum),this.listQuery.model&&t.append("model",this.listQuery.model),this.listQuery.nickName&&t.append("nickName",this.listQuery.nickName),this.listQuery.mobilePhone&&t.append("mobilePhone",this.listQuery.mobilePhone),Object(a.f)(t).then(function(t){t.data.body&&(e.list=t.data.body.infos?t.data.body.infos:[],e.total=t.data.body.pageInfo.size),e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},sortChange:function(e){var t=e.prop,n=e.order;"id"===t&&this.sortByID(n)},handleShowOwnerInfo:function(e){this.dialogShowOwnerInfo=!0,this.ownerInfo=e},handlePass:function(e,t){var n=this,i=new FormData;i.append("jfCar.carStatus",t),i.append("jfCar.id",e.id),i.append("jfUser.id",e.jfUser.id),Object(a.k)(i).then(function(a){n.getList(),3==t&&(window.location.hash="/car/car-add/"+e.id)})}}},l=(n("dNCV"),n("KHd+")),o=Object(l.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-date-picker",{staticClass:"filter-item",attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.listQuery.date,callback:function(t){e.$set(e.listQuery,"date",t)},expression:"listQuery.date"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"车牌号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.plateNum,callback:function(t){e.$set(e.listQuery,"plateNum",t)},expression:"listQuery.plateNum"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"型号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.model,callback:function(t){e.$set(e.listQuery,"model",t)},expression:"listQuery.model"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"用户名"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.nickName,callback:function(t){e.$set(e.listQuery,"nickName",t)},expression:"listQuery.nickName"}}),e._v(" "),n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"手机号"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleFilter(t):null}},model:{value:e.listQuery.mobilePhone,callback:function(t){e.$set(e.listQuery,"mobilePhone",t)},expression:"listQuery.mobilePhone"}}),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"90px"},attrs:{placeholder:"城市",clearable:""},model:{value:e.listQuery.city,callback:function(t){e.$set(e.listQuery,"city",t)},expression:"listQuery.city"}},e._l(e.cityOptions,function(e){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"状态(全部/未审核/已审核)",clearable:""},model:{value:e.chekcValue,callback:function(t){e.chekcValue=t},expression:"chekcValue"}},e._l(e.checkOptions,function(e){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),n("el-select",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"审核(全部/通过/未通过)",clearable:""},model:{value:e.passValue,callback:function(t){e.passValue=t},expression:"passValue"}},e._l(e.passOptions,function(e){return n("el-option",{key:e.key,attrs:{label:e.label,value:e.key}})})),e._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(e._s(e.$t("table.search")))])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[n("el-table-column",{attrs:{label:"ID",prop:"id",sortable:"custom",align:"center",width:"65"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车主姓名",width:"150px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.jfUser.name))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"城市","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.city))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"品牌",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.brand))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"型号",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.model))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车牌号",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.plateNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"颜色",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.color))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"申请时间",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.createTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"车主信息",width:"110px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handleShowOwnerInfo(t.row.jfUser)}}},[e._v("查看")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("table.actions"),align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){e.handlePass(t.row,3)}}},[e._v("通过")]),e._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){e.handlePass(t.row,4)}}},[e._v("不通过")])]}}])})],1),e._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){e.$set(e.listQuery,"page",t)},"update:limit":function(t){e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),n("el-dialog",{attrs:{title:"车主信息查看",visible:e.dialogShowOwnerInfo},on:{"update:visible":function(t){e.dialogShowOwnerInfo=t}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[n("el-form-item",{attrs:{label:"姓名",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.name,callback:function(t){e.$set(e.ownerInfo,"name",t)},expression:"ownerInfo.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"手机号",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.mobile,callback:function(t){e.$set(e.ownerInfo,"mobile",t)},expression:"ownerInfo.mobile"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"身份证",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.idcard,callback:function(t){e.$set(e.ownerInfo,"idcard",t)},expression:"ownerInfo.idcard"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"身份证正面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.idcardFront}})]),e._v(" "),n("el-form-item",{attrs:{label:"身份证反面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.idcardBack}})]),e._v(" "),n("el-form-item",{attrs:{label:"驾照",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.drivingNum,callback:function(t){e.$set(e.ownerInfo,"drivingNum",t)},expression:"ownerInfo.drivingNum"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"驾照类型",prop:"type"}},[n("el-input",{model:{value:e.ownerInfo.drivingType,callback:function(t){e.$set(e.ownerInfo,"drivingType",t)},expression:"ownerInfo.drivingType"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"驾照正面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.drivingFront}})]),e._v(" "),n("el-form-item",{attrs:{label:"驾照反面",prop:"type"}},[n("img",{attrs:{src:e.ownerInfo.drivingBack}})])],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogShowOwnerInfo=!1}}},[e._v("关闭")])],1)],1)],1)},[],!1,null,null,null);o.options.__file="carAudit.vue";t.default=o.exports},dNCV:function(e,t,n){"use strict";var a=n("3VHu");n.n(a).a}}]);