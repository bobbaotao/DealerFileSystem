<template>
  <div class="container">
       <el-row class="smallRow">
            <el-col :offset="1" :span="12">
                <el-button size="small" :disabled="IsEdit" type="primary" v-on:click="IsEdit = true">Edit</el-button>
                <el-button size="small" :disabled="!IsEdit" type="primary" v-on:click="saveValueToServer">Save</el-button>
                <el-button size="small" v-on:click="returnToLastNav">Return</el-button>
            </el-col>
        </el-row>
        <el-row class="smallRow">
            <el-col :offset="1" :span="22">
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Act Period<br />期限
                    </el-col>
                    <el-col class="colValue" :span="18">
                        from
                        <el-date-picker v-model="ActPeriod_StartDate"  :disabled="!IsEdit" size="mini"
                            type="date" placeholder="选择开始日期">
                        </el-date-picker>
                        to
                        <el-date-picker v-model="ActPeriod_EndDate"  :disabled="!IsEdit" size="mini"
                            type="date" placeholder="选择结束日期">
                        </el-date-picker>
                        <el-select size="mini" class="smallSelector" :disabled="!IsEdit" v-model="Year">
                            <el-option v-for="item in yearList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Contract Type<br />合同类型
                    </el-col>
                    <el-col class="colValue" :span="18">
                        <el-select size="mini"  class="largeSelector" :disabled="!IsEdit" v-model="ContractType">
                            <el-option v-for="item in contractTypeList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Dealer Region<br />经销商区域
                    </el-col>
                    <el-col class="colValue" :span="8">
                        <el-select size="mini" :disabled="!IsEdit" v-model="Dealer_Region">
                            <el-option v-for="item in dealerRegionList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col class="colTitle" :span="4">
                        Sales Target<br />销售目标
                    </el-col>
                    <el-col class="colValue" :span="8">
                        <el-input-number size="mini" v-model="SalesTarget" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" :disabled="!IsEdit">
                        </el-input-number>
                        <el-select size="mini"  class="miniSelector" :disabled="!IsEdit" v-model="SalesTarget_Unit">
                            <el-option v-for="item in salesTargetUnitList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Appointed Products<br />指定产品
                    </el-col>
                    <el-col class="colValue" :span="18"> 
                        <el-input  :disabled="!IsEdit" type="textarea" :autosize="{ minRows: 2, maxRows: 9}" v-model="Appointed_Products"></el-input>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Distribution Area<br />代理区域
                    </el-col>
                    <el-col class="colValue" :span="18"> 
                        <el-input  :disabled="!IsEdit" type="textarea" :autosize="{ minRows: 2, maxRows: 9}" v-model="Distribution_Area"></el-input>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Exceptions<br />除外医院
                    </el-col>
                    <el-col class="colValue" :span="18"> 
                        <el-input  :disabled="!IsEdit" type="textarea" :autosize="{ minRows: 2, maxRows: 9}" v-model="Exceptions_Hosptial"></el-input>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        After-sales Service Agreement<br />售后服务协议
                    </el-col>
                    <el-col class="colValue" :span="18"> 
                        <!-- <el-input :disabled="!IsEdit" type="textarea" :autosize="{ minRows: 2, maxRows: 9}" v-model="AfterSales_SvcAgreement"></el-input> -->
                        <el-switch :disabled="!IsEdit" v-model="IsHave_AfterSalesAgr"
                            active-text="有" inactive-text="无">
                        </el-switch>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Application Service Agreement<br />应用服务协议
                    </el-col>
                    <el-col class="colValue" :span="18"> 
                        <el-switch :disabled="!IsEdit" v-model="IsHave_AppSvcAgr"
                            active-text="有" inactive-text="无">
                        </el-switch>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Glory Record<br />荣誉记录
                    </el-col>
                    <el-col class="colValue" :span="18"> 
                        <el-input :disabled="!IsEdit" type="textarea" :autosize="{ minRows: 2, maxRows: 9}" v-model="Glory_Record"></el-input>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        经销商协议
                    </el-col>
                    <el-col class="colValue" :span="10"> 
                        <el-upload
                            class="upload-demo" :disabled="!this.IsEdit || this.ContractDocUploadDisable" :file-list="ContractDocFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="ContractDocFileUploadFailed"
                            :on-success="ContractDocFileUploadSuccess" :on-remove="ContractDocDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || this.ContractDocUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                 <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        授权书
                    </el-col>
                    <el-col class="colValue" :span="10"> 
                        <el-upload
                            class="upload-demo" :disabled="!this.IsEdit || this.CertUploadDisable" :file-list="CertFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="CertFileUploadFailed"
                            :on-success="CertFileUploadSuccess" :on-remove="CertDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || this.CertUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Remark<br />其他备注
                    </el-col>
                    <el-col class="colValue" :span="18"> 
                        <el-input :disabled="!IsEdit" type="textarea"  
                        :autosize="{ minRows: 2, maxRows: 9}" v-model="Remark"></el-input>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import Utility from '../utility/index';
import { Loading } from 'element-ui';
var array = require('array');

export default {
    name: "ContractLogPage",
    data () {
        var yearArr = Utility.loadYearSelectList();
        var contractTypeArr = Utility.loadContractTypeList();
        var salesTargetArr = Utility.loadSTUnitList();
        var dealerRegionArr = Utility.loadDealerRegionList();
        return {
            id: null,
            Year: null,
            ActPeriod_StartDate: null,
            ActPeriod_EndDate: null,
            ContractType: null,
            Dealer_Region: null,
            SalesTarget: null,
            SalesTarget_Unit: null,
            Appointed_Products: null,
            Distribution_Area: null,
            Exceptions_Hosptial: null,
            AfterSales_SvcAgreement: null,
            IsHave_AfterSalesAgr: false,
            IsHave_AppSvcAgr: false,
            Glory_Record: null,
            FileID_DealerAgreement: null,
            FileID_DealerCA: null,
            Remark: null,
            IsDeleted: false,

            yearList: yearArr,
            contractTypeList: contractTypeArr,
            salesTargetUnitList: salesTargetArr,
            dealerRegionList: dealerRegionArr,
            IsEdit: false,
            formStatus: "NEW",
            fileBaseUrl: Utility.fileServiceUrl,
            
            ContractDocUploadDisable: false,
            ContractDocFileList: [],

            CertUploadDisable: false,
            CertFileList: []
        }
    },
    props: ['Status','initData','dealerID','refreshKey'],
    created: function() {
        this.setInitValue(this.initData);
    },
    watch: {
        initData: function(newValue) {
            this.setInitValue(newValue);
        },
        refreshKey: function(newValue) {
            this.setInitValue(this.initData);
        },
        Status: function(newValue) {
            this.formStatus =  newValue;
        }
    },
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        FileProcess: function() {
            this.ShowLoadingView();
        },
        FileDownLoad: function(file) {
            var url = file.url;
            window.open(url);
        },
        ContractDocFileUploadFailed: function(err, file, fileList) {
            this.HideLoadingView();
            this.$message.error(err.message);
        },
        ContractDocFileUploadSuccess: function(response, file, fileList) {
            this.HideLoadingView();
            this.FileID_DealerAgreement =this.FileID_DealerAgreement + response + ";";
            file.id = response;
            file.url = this.fileBaseUrl + '?method=loadDFAttachment&fileID=' + response,
            this.$message("Upload Success!");

            this.$store.commit('addAtt',{
                id: response,
                dealer_id: this.dealerID,
                Doc_Name: file.name
            })
        },
        ContractDocDeletedfFile: function(file, fileList) {
            
            if(file && file.id)
            {
               var idArr = this.FileID_DealerAgreement.split(";");
               var iResult = "";
               for(var id in idArr) {
                    var fileId = idArr[id];

                    if(fileId !=  file.id && fileId != "") {
                        iResult += fileId + ";";
                    }
               }
               this.removeFileFromServer(file.id);
               this.FileID_DealerAgreement = iResult;
            } else {
                this.$message.error("file id is null!");
            }
        },
        CertFileUploadFailed: function(err, file, fileList) {
            this.HideLoadingView();
            this.$message.error(err.message);
        },
        CertFileUploadSuccess: function(response, file, fileList) {
            this.HideLoadingView();
            this.FileID_DealerCA =this.FileID_DealerCA + response + ";";
            file.id = response;
            file.url = this.fileBaseUrl + '?method=loadDFAttachment&fileID=' + response,
            this.$message("Upload Success!");

            this.$store.commit('addAtt',{
                id: response,
                dealer_id: this.dealerID,
                Doc_Name: file.name
            })
        },
        CertDeletedfFile: function(file, fileList) {
            //var i = file;
            //todo
            if(file && file.id)
            {
               var idArr = this.FileID_DealerCA.split(";");
               var iResult = "";
               for(var id in idArr) {
                    var fileId = idArr[id];

                    if(fileId !=  file.id && fileId != "") {
                        iResult += fileId + ";";
                    }
               }
               this.removeFileFromServer(file.id);
               this.FileID_DealerCA = iResult;
            } else {
                this.$message.error("file id is null!");
            }
        },
        removeFileFromServer: function(id) {
            var requestUrl = Utility.dfServiceUrl + "/DeleteAttachment/" + this.dealerID + "/"  + id;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                this.$message("Delete success!");
            }).catch((error) => {
                this.HideLoadingView();
                //this.$message.error(error.data.message);
            });
        },  
        saveValueToServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/SaveContract/";
            if(this.id && this.id != -1) {
                requestUrl += "UPDATE";
            } else {
                requestUrl += "NEW";
            }

            var requestData = {
                data: this.buildServerData()
            };

            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.SaveContractResult && response.data.SaveContractResult.Status == "success") {
                    this.id = response.data.SaveContractResult.Data;
                    this.$emit("refresh");
                    this.IsEdit = false;
                    this.formStatus = "UPDATE";
                    this.$message("Save Success!");
                } else if (response.data && response.data.SaveContractResult) {
                    this.$message.error(response.data.SaveContractResult.Message);
                } else {
                    this.$message.error("Save Contract Failed!");
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.message);
            });
        },
        buildServerData: function () {
            var result = {
                id: this.id,
                dealer_id : this.dealerID,
                Year: this.Year,
                ActPeriod_StartDate: Utility.formatDateToServerObj(this.ActPeriod_StartDate),
                ActPeriod_EndDate: Utility.formatDateToServerObj(this.ActPeriod_EndDate),
                ContractType: this.ContractType,
                Dealer_Region: this.Dealer_Region,
                SalesTarget: this.SalesTarget,
                SalesTarget_Unit: this.SalesTarget_Unit,
                Appointed_Products: this.Appointed_Products,
                Distribution_Area: this.Distribution_Area,
                Exceptions_Hosptial: this.Exceptions_Hosptial,
                AfterSales_SvcAgreement: this.AfterSales_SvcAgreement,
                Glory_Record: this.Glory_Record,
                FileID_DealerAgreement: this.FileID_DealerAgreement,
                FileID_DealerCA: this.FileID_DealerCA,
                Remark: this.Remark,
                IsDeleted: this.IsDeleted,
                IsHave_AppSvcAgr: this.IsHave_AppSvcAgr,
                IsHave_AfterSalesAgr: this.IsHave_AfterSalesAgr
            };
            return result;
        },
        setInitValue: function(data) {
            if(this.Status == "NEW")
            {
                this.IsEdit = true;
            }
            if(data) {
                this.id = data.id;
                this.Year = data.Year;
                this.ActPeriod_StartDate = Utility.formatDateToString(data.ActPeriod_StartDate);
                this.ActPeriod_EndDate = Utility.formatDateToString(data.ActPeriod_EndDate);
                this.ContractType = data.ContractType;
                this.Dealer_Region = data.Dealer_Region;
                this.SalesTarget = data.SalesTarget;
                this.SalesTarget_Unit = data.SalesTarget_Unit;
                this.Appointed_Products = data.Appointed_Products;
                this.Distribution_Area = data.Distribution_Area;
                this.Exceptions_Hosptial = data.Exceptions_Hosptial;
                this.AfterSales_SvcAgreement = data.AfterSales_SvcAgreement;
                this.Glory_Record = data.Glory_Record;
                this.FileID_DealerAgreement = data.FileID_DealerAgreement;
                this.FileID_DealerCA = data.FileID_DealerCA;
                this.Remark = data.Remark;
                this.IsDeleted = data.IsDeleted;
                this.IsHave_AfterSalesAgr = data.IsHave_AfterSalesAgr;
                this.IsHave_AppSvcAgr = data.IsHave_AppSvcAgr;
                this.ContractDocFileList = this.loadFileList(data.FileID_DealerAgreement);
                this.CertFileList = this.loadFileList(data.FileID_DealerCA);
            } else {
                this.id = -1;
                this.Year = null;
                this.ActPeriod_StartDate = null;
                this.ActPeriod_EndDate = null;
                this.ContractType = null;
                this.Dealer_Region = null;
                this.SalesTarget = null;
                this.SalesTarget_Unit = null;
                this.Appointed_Products = null;
                this.Distribution_Area = null;
                this.Exceptions_Hosptial = null;
                this.AfterSales_SvcAgreement = null;
                this.Glory_Record = null;
                this.FileID_DealerAgreement = null;
                this.FileID_DealerCA = null;
                this.Remark = null;
                this.IsDeleted = false;
                this.IsHave_AfterSalesAgr = false,
                this.IsHave_AppSvcAgr = false,
                this.ContractDocFileList = [];
                this.CertFileList = [];
            }
        },
        loadFileList: function(fileIds) {
            var fileArr = array();
            if(fileIds != null && fileIds != "") {
                var ids = fileIds.split(';');
                for(var id in ids) {
                    var fileId = ids[id];
                    if(fileId != null && fileId != "")
                    {
                        var fileItem = this.$store.getters.loadAttInfoByID(fileId);
                        if(fileItem != null)
                        {
                            fileArr.push({
                                name: fileItem.Doc_Name,
                                url: this.fileBaseUrl + '?method=loadDFAttachment&fileID=' + fileId,
                                status: 'finished',
                                id: fileId
                            });
                        }
                    }
                }
                return fileArr.toArray();
            } else {
                return [];
            }
        },
        returnToLastNav: function() {
            this.$emit("close");
        }
    }
}
</script>

<style scoped>
.smallRow 
{
    padding: 15px 0px 10px 0px;
    text-align: left;
}
.tinyRow {
    padding: 5px 0px 5px 0px;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    border-bottom: 1px solid black;
}
.colTitle {
    padding-left: 15px;
}
.colValue {
    padding-left: 10px;
}
.largeSelector {
    width: 400px;
}
.smallSelector {
     width: 120px;   
}
.miniSelector {
    width: 80px;
}
</style>


