(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3d3d"],{"1MI5":function(t,e,i){},Mz3J:function(t,e,i){"use strict";Math.easeInOutQuad=function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e};var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function a(t,e,i){var a=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=t-a,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,a,o,e)),l<e?n(t):i&&"function"==typeof i&&i()}()}var o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&a(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&a(0,800)}}},l=(i("PelQ"),i("KHd+")),r=Object(l.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"7d9f0a7c",null);r.options.__file="index.vue";e.a=r.exports},PelQ:function(t,e,i){"use strict";var n=i("X9ZH");i.n(n).a},SkRh:function(t,e,i){"use strict";var n=i("1MI5");i.n(n).a},X9ZH:function(t,e,i){},oGLJ:function(t,e,i){"use strict";i.r(e);var n=i("wk8/"),a={name:"CarList",components:{Pagination:i("Mz3J").a},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:10,nameStr:void 0,mobile:void 0,status:void 0},cityOptions:[{label:"上海",key:"上海"}],statusOptions:[{label:"未审核",key:"0"},{label:"已审核",key:"1"},{label:"未通过",key:"2"},{label:"已拉黑",key:"3"}],statusMap:{0:"未审核",1:"已审核",2:"未通过",3:"已拉黑"},drivingMap:{0:"A1驾照",1:"A2驾照",2:"A3驾照",3:"B1驾照",4:"B2驾照",5:"C1驾照",6:"C2驾照"},drivingOptions:[{label:"A1驾照",key:"0"},{label:"A2驾照",key:"1"},{label:"A3驾照",key:"2"},{label:"B1驾照",key:"3"},{label:"B2驾照",key:"4"},{label:"C1驾照",key:"5"},{label:"C2驾照",key:"6"}],dialogShowOwnerInfo:!1,ownerInfo:{balance:void 0,bankCardCount:void 0,createTime:void 0,drivingBack:void 0,drivingFront:void 0,drivingNum:void 0,drivingType:void 0,headImg:void 0,id:1,idcard:void 0,idcardBack:void 0,idcardFront:void 0,loginChannel:void 0,mobile:void 0,name:void 0,nickname:void 0,password:void 0,qualityType:void 0,updateTime:void 0,userOpenId:void 0,userStatus:void 0,userType:void 0},dialogShowFullUserInfo:!1,drivingValue:void 0,idcard:void 0,userInfo:{balance:void 0,bankCardCount:void 0,createTime:void 0,drivingBack:void 0,drivingFront:void 0,drivingNum:void 0,drivingType:void 0,headImg:void 0,id:void 0,idcard:void 0,idcardBack:void 0,idcardFront:void 0,loginChannel:void 0,mobile:void 0,name:void 0,nickname:void 0,password:void 0,qualityType:void 0,updateTime:void 0,userOpenId:void 0,userStatus:void 0,userType:void 0}}},created:function(){this.getList()},methods:{getList:function(t){var e=this;this.listLoading=!0,t&&t.page&&(this.listQuery.page=t.page);var i=new FormData;this.listQuery.page&&i.append("pageInfo.pageNum",this.listQuery.page),this.listQuery.nameStr&&i.append("nameStr",this.listQuery.nameStr),this.listQuery.mobile&&i.append("mobile",this.listQuery.mobile),this.listQuery.status&&i.append("userStatus",this.listQuery.status),Object(n.a)(i).then(function(t){e.list=t.data.body.infos,e.total=t.data.body.pageInfo.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.page=1,this.getList()},sortChange:function(t){var e=t.prop,i=t.order;"id"===e&&this.sortByID(i)},handleViewUserInfo:function(t){this.dialogShowOwnerInfo=!0,this.ownerInfo=t},submitFullUserInfo:function(){var t=this;if(this.drivingValue&&this.idcard){var e=new FormData;e.append("id",this.userInfo.id),e.append("userStatus",1),e.append("idcard",this.idcard),e.append("drivingNum",this.drivingValue),e.append("drivingType",this.drivingValue),Object(n.d)(e).then(function(e){t.listLoading=!1,t.getList(),t.dialogShowFullUserInfo=!1})}else this.$alert("请完善用户信息")},handleShowPass:function(t,e){console.log(t),this.dialogShowFullUserInfo=!0,this.userInfo=t},handlePass:function(t,e){var i=this,a=new FormData;a.append("id",t.id),a.append("userStatus",e),Object(n.d)(a).then(function(t){i.listLoading=!1,i.getList()})}}},o=(i("SkRh"),i("KHd+")),l=Object(o.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("div",{staticClass:"filter-container"},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"姓名"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.nameStr,callback:function(e){t.$set(t.listQuery,"nameStr",e)},expression:"listQuery.nameStr"}}),t._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"手机号"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.mobile,callback:function(e){t.$set(t.listQuery,"mobile",e)},expression:"listQuery.mobile"}}),t._v(" "),i("el-select",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"用户状态",clearable:""},model:{value:t.listQuery.status,callback:function(e){t.$set(t.listQuery,"status",e)},expression:"listQuery.status"}},t._l(t.statusOptions,function(t){return i("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})})),t._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("搜索")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""},on:{"sort-change":t.sortChange}},[i("el-table-column",{attrs:{label:"ID",prop:"id",align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"用户姓名",width:"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"用户状态",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t.statusMap[e.row.userStatus]))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"手机号",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.mobile))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"用户信息",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleViewUserInfo(e.row)}}},[t._v("查看")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"注册时间",width:"160px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.createTime))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.userStatus?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handleShowPass(e.row)}}},[t._v("通过")]):t._e(),t._v(" "),0==e.row.userStatus?i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(i){t.handlePass(e.row,2)}}},[t._v("拒绝")]):t._e(),t._v(" "),1==e.row.userStatus?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(i){t.handlePass(e.row,3)}}},[t._v("拉黑")]):t._e()]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),i("el-dialog",{attrs:{title:"用户信息查看",visible:t.dialogShowOwnerInfo},on:{"update:visible":function(e){t.dialogShowOwnerInfo=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{label:"姓名",prop:"type"}},[i("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.name,callback:function(e){t.$set(t.ownerInfo,"name",e)},expression:"ownerInfo.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号",prop:"type"}},[i("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.mobile,callback:function(e){t.$set(t.ownerInfo,"mobile",e)},expression:"ownerInfo.mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证",prop:"type"}},[i("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.idcard,callback:function(e){t.$set(t.ownerInfo,"idcard",e)},expression:"ownerInfo.idcard"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证正面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.idcardFront}})]),t._v(" "),i("el-form-item",{attrs:{label:"身份证反面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.idcardBack}})]),t._v(" "),i("el-form-item",{attrs:{label:"驾照",prop:"type"}},[i("el-input",{attrs:{readonly:""},model:{value:t.ownerInfo.drivingNum,callback:function(e){t.$set(t.ownerInfo,"drivingNum",e)},expression:"ownerInfo.drivingNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"驾照类型",prop:"type"}},[i("el-input",{attrs:{readonly:""},model:{value:t.drivingMap[t.ownerInfo.drivingType],callback:function(e){t.$set(t.drivingMap,t.ownerInfo.drivingType,e)},expression:"drivingMap[ownerInfo.drivingType]"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"驾照正面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.drivingFront}})]),t._v(" "),i("el-form-item",{attrs:{label:"驾照反面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.ownerInfo.drivingBack}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogShowOwnerInfo=!1}}},[t._v("关闭")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"用户信息审核补全",visible:t.dialogShowFullUserInfo},on:{"update:visible":function(e){t.dialogShowFullUserInfo=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{label:"姓名",prop:"type"}},[i("el-input",{attrs:{disabled:""},model:{value:t.userInfo.name,callback:function(e){t.$set(t.userInfo,"name",e)},expression:"userInfo.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"手机号",prop:"type"}},[i("el-input",{attrs:{disabled:""},model:{value:t.userInfo.mobile,callback:function(e){t.$set(t.userInfo,"mobile",e)},expression:"userInfo.mobile"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证",prop:"type"}},[i("el-input",{model:{value:t.idcard,callback:function(e){t.idcard=e},expression:"idcard"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"身份证正面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.userInfo.idcardFront}})]),t._v(" "),i("el-form-item",{attrs:{label:"身份证反面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.userInfo.idcardBack}})]),t._v(" "),i("el-form-item",{attrs:{label:"驾照",prop:"type"}},[i("el-input",{model:{value:t.userInfo.drivingNum,callback:function(e){t.$set(t.userInfo,"drivingNum",e)},expression:"userInfo.drivingNum"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"驾照类型",prop:"type"}},[i("el-select",{staticClass:"filter-item",staticStyle:{width:"220px"},attrs:{placeholder:"请选择驾照类型",clearable:""},model:{value:t.drivingValue,callback:function(e){t.drivingValue=e},expression:"drivingValue"}},t._l(t.drivingOptions,function(t){return i("el-option",{key:t.key,attrs:{label:t.label,value:t.key}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"驾照正面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.userInfo.drivingFront}})]),t._v(" "),i("el-form-item",{attrs:{label:"驾照反面",prop:"type"}},[i("img",{staticStyle:{width:"150px",height:"150px"},attrs:{src:t.userInfo.drivingBack}})])],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.submitFullUserInfo}},[t._v("提交")]),t._v(" "),i("el-button",{on:{click:function(e){t.dialogShowOwnerInfo=!1}}},[t._v("关闭")])],1)],1)],1)},[],!1,null,"72671277",null);l.options.__file="userList.vue";e.default=l.exports},"wk8/":function(t,e,i){"use strict";i.d(e,"a",function(){return a}),i.d(e,"d",function(){return o}),i.d(e,"c",function(){return l}),i.d(e,"b",function(){return r});var n=i("t3Un");function a(t){return Object(n.a)({url:"/user/userManageSearch",method:"post",data:t})}function o(t){return Object(n.a)({url:"/user/update",method:"post",data:t})}function l(t){return Object(n.a)({url:"/web/login",method:"post",data:t})}function r(t){return Object(n.a)({url:"/user/get",method:"post",data:t})}}}]);