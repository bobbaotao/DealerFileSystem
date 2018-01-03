<template>
    <div>
        <el-row class="smallRow">
            <el-col :offset="1" :span="12">
                <el-button size="small" :disabled="IsEdit" type="primary" v-on:click="IsEdit = true">Edit</el-button>
                <el-button size="small" :disabled="!IsEdit" type="primary" v-on:click="saveValueToServer">Save</el-button>
                <el-button size="small" v-on:click="returnToLastNav">Return</el-button>
            </el-col>
        </el-row>
        <el-row class="smallRow">
            <el-col>
                <el-row class="tinyRow">
                    <el-col class="colTitle"  :span="8">Period</el-col>
                    <el-col class="colValue" :span="12">
                        <el-select size="mini" :disabled="!IsEdit" v-model="Year">
                            <el-option v-for="item in yearList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        Company Information<br />经销商企业信息表
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || this.FileUploadDisable" :file-list="CompanyInfoFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="CompanyInfoUploadSuccess" :on-remove="CompanyInfoDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        Business license (hardcopy)<br />营业执照（复印件）
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="BusinessLicensFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="BusinessLicensUploadSuccess" :on-remove="BusinessLicensDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        Tax registration certificate (hardcopy)<br />税务登记证（复印件）
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="TaxRCFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="TaxRCUploadSuccess" :on-remove="TaxRCDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        Organization code certificate (hardcopy)<br />组织代码证（复印件）
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="OrgCodeCerFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="OrgCodeCerUploadSuccess" :on-remove="OrgCodeCerDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        ID card of legal representative (hardcopy)<br />法人代表身份证（复印件）
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="IDCardOfLegalRepFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="IDCardOfLegalRepUploadSuccess" :on-remove="IDCardOfLegalRepDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        Certificate of incorporation (hardcopy)<br />公司章程（复印件）
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="CertOfIncoFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="CertOfIncoUploadSuccess" :on-remove="CertOfIncoDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        Audit report (hardcopy)<br />有效的最新年度审计报告（复印件）
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="AuditReportFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="AuditReportUploadSuccess" :on-remove="AuditReportDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        Organization chart (original)<br />组织架构图（原件）
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="OrgChartFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="OrgChartUploadSuccess" :on-remove="OrgChartDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="8">
                        <span style="padding-right:15px;">
                            Relevant operating licenses (notably for medical industry), please specify:<br />医疗器械经营企业许可证（复印件）
                        </span>
                    </el-col>
                    <el-col class="colValue" :span="12">
                        <el-upload class="upload-demo"
                            :disabled="!IsEdit || FileUploadDisable" :file-list="RelOperLicensesFileList"
                            :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                            :show-file-list="true" :on-progress="FileProcess" :on-error="UploadFailed"
                            :on-success="RelOperLicensesUploadSuccess" :on-remove="RelOperLicensesDeletedfFile"
                            :on-preview="FileDownLoad">
                            <el-button size="mini" type="primary"  icon="upload"
                            :disabled="!this.IsEdit || FileUploadDisable">点击上传</el-button>
                        </el-upload>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle"  :span="8">Remark</el-col>
                    <el-col class="colValue" :span="12">
                        <el-input :disabled="!IsEdit" type="textarea" :autosize="{ minRows: 2, maxRows: 9}"
                         v-model="Remark"></el-input>
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
    name: "CommpanyInfoPage",
    data () {
        var yearArr = Utility.loadYearSelectList();
        return {
            fileBaseUrl: Utility.fileServiceUrl,
            yearList: yearArr,
            Status: null,
            formStatus: "NEW",
            IsEdit: false,
            FileUploadDisable: false,

            Year: null,
            Id: null,
            Remark: null,
            IsDeleted: false,

            FileID_CompanyInfo: null,
            CompanyInfoFileList: [],

            FileID_BusinessLicense: null,
            BusinessLicensFileList: [],

            FileID_TaxRC: null,
            TaxRCFileList: [],

            FileID_OrgCodeCer: null,
            OrgCodeCerFileList: [],

            FileID_IDCardOfLegalRep: null,
            IDCardOfLegalRepFileList: [],

            FileID_CertOfInco: null,
            CertOfIncoFileList: [],

            FileID_AuditReport: null,
            AuditReportFileList: [],

            FileID_OrgChart: null,
            OrgChartFileList: [],

            FileID_RelOperLicenses: null,
            RelOperLicensesFileList: []

        }
    },
    props: ['initData', 'dealerID', 'RefreshKey', 'Status'],
    watch: {
        Status: function(newValue) {
            if(newValue == "Generate") {
                this.formStatus = "UPDATE";
            } else {
                this.formStatus = newValue;
            }
        },
        RefreshKey: function(newValue){
            this.setInitValue(this.initData);
        }
    },
    created () {
        this.setInitValue(this.initData);
    },
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        setInitValue: function(data) {
            if(this.Status == "NEW" || this.Status == "Generate") {
                this.IsEdit = true;
            }
            if(data) {
                this.Id = data.id;
                this.dealer_id = data.dealer_id;
                this.Year = data.Year;
                this.FileID_CompanyInfo = data.FileID_CompanyInfo;
                this.FileID_BusinessLicense = data.FileID_BusinessLicense;
                this.FileID_TaxRC = data.FileID_TaxRC;
                this.FileID_OrgCodeCer = data.FileID_OrgCodeCer;
                this.FileID_IDCardOfLegalRep = data.FileID_IDCardOfLegalRep;
                this.FileID_CertOfInco = data.FileID_CertOfInco;
                this.FileID_AuditReport = data.FileID_AuditReport;
                this.FileID_OrgChart = data.FileID_OrgChart;
                this.FileID_RelOperLicenses = data.FileID_RelOperLicenses;
                this.Remark = data.Remark;
                this.IsDeleted = data.IsDeleted;

                this.CompanyInfoFileList = this.loadFileList(data.FileID_CompanyInfo);
                this.BusinessLicensFileList = this.loadFileList(data.FileID_BusinessLicense);
                this.TaxRCFileList = this.loadFileList(data.FileID_TaxRC);
                this.OrgCodeCerFileList = this.loadFileList(data.FileID_OrgCodeCer);
                this.IDCardOfLegalRepFileList = this.loadFileList(data.FileID_IDCardOfLegalRep);
                this.CertOfIncoFileList = this.loadFileList(data.FileID_CertOfInco);
                this.AuditReportFileList = this.loadFileList(data.FileID_AuditReport);
                this.OrgChartFileList = this.loadFileList(data.FileID_OrgChart);
                this.RelOperLicensesFileList = this.loadFileList(data.FileID_RelOperLicenses);
            } else {
                this.Id = -1;
                this.Year = null;
                this.FileID_CompanyInfo = null;
                this.FileID_BusinessLicense = null;
                this.FileID_TaxRC = null;
                this.FileID_OrgCodeCer = null;
                this.FileID_IDCardOfLegalRep = null;
                this.FileID_CertOfInco = null;
                this.FileID_AuditReport = null;
                this.FileID_OrgChart = null;
                this.FileID_RelOperLicenses = null;
                this.Remark = null;
                this.IsDeleted = false;

                this.CompanyInfoFileList = [];
                this.BusinessLicensFileList = [];
                this.TaxRCFileList = [];
                this.OrgCodeCerFileList = [];
                this.IDCardOfLegalRepFileList = [];
                this.CertOfIncoFileList = [];
                this.AuditReportFileList = [];
                this.OrgChartFileList = [];
                this.RelOperLicensesFileList = [];
            }
        },
        FileProcess: function() {
            this.ShowLoadingView();
        },
        FileDownLoad: function(file) {
            var url = file.url;
            window.open(url);
        },
        UploadFailed: function(err, file, fileList) {
            this.HideLoadingView();
            this.$message.error(err.message);
        },
        fileUploadHandle: function(response, file, fileList) {
            this.HideLoadingView();
            file.id = response;
            file.url = this.fileBaseUrl + '?method=loadDFAttachment&fileID=' + response,
            this.$message("Upload Success!");

            this.$store.commit('addAtt',{
                id: response,
                dealer_id: this.dealerID,
                Doc_Name: file.name
            })
        },
        CompanyInfoUploadSuccess: function(response, file, fileList) {
            this.FileID_CompanyInfo = this.FileID_CompanyInfo + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        BusinessLicensUploadSuccess: function(response, file, fileList) {
            this.FileID_BusinessLicense = this.FileID_BusinessLicense + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        TaxRCUploadSuccess: function(response, file, fileList) {
            this.FileID_TaxRC = this.FileID_TaxRC + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        OrgCodeCerUploadSuccess: function(response, file, fileList) {
            this.FileID_OrgCodeCer = this.FileID_OrgCodeCer + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        IDCardOfLegalRepUploadSuccess: function(response, file, fileList) {
            this.FileID_IDCardOfLegalRep = this.FileID_IDCardOfLegalRep + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        CertOfIncoUploadSuccess: function(response, file, fileList) {
            this.FileID_CertOfInco = this.FileID_CertOfInco + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        AuditReportUploadSuccess: function(response, file, fileList) {
            this.FileID_AuditReport = this.FileID_AuditReport + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        OrgChartUploadSuccess: function(response, file, fileList) {
            this.FileID_OrgChart = this.FileID_OrgChart + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        RelOperLicensesUploadSuccess: function(response, file, fileList) {
            this.FileID_RelOperLicenses = this.FileID_RelOperLicenses + response + ";";
            this.fileUploadHandle(response, file, fileList);
        },
        fileDeleteHandle: function(file, fileList, sourceIDs) {
            if(file && file.id)
            {
               var idArr = sourceIDs.split(";");
               var iResult = "";
               for(var id in idArr) {
                    var fileId = idArr[id];

                    if(fileId !=  file.id && fileId != "") {
                        iResult += fileId + ";";
                    }
               }
               this.removeFileFromServer(file.id);
               return iResult;
            } else {
                this.$message.error("file id is null!");
                return sourceIDs;
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
        BusinessLicensDeletedfFile: function(file, fileList) {
            this.FileID_BusinessLicense = fileDeleteHandle(file, fileList, this.FileID_BusinessLicense);
        },
        TaxRCDeletedfFile: function(file, fileList) {
            this.FileID_TaxRC = fileDeleteHandle(file, fileList, this.FileID_TaxRC);
        },
        OrgCodeCerDeletedfFile: function(file, fileList) {
            this.FileID_OrgCodeCer = fileDeleteHandle(file, fileList, this.FileID_OrgCodeCer);
        },
        IDCardOfLegalRepDeletedfFile: function(file, fileList) {
            this.FileID_IDCardOfLegalRep = fileDeleteHandle(file, fileList, this.FileID_IDCardOfLegalRep);
        },
        CertOfIncoDeletedfFile: function(file, fileList) {
            this.FileID_CertOfInco = fileDeleteHandle(file, fileList, this.FileID_CertOfInco);
        },
        AuditReportDeletedfFile: function(file, fileList) {
            this.FileID_AuditReport = fileDeleteHandle(file, fileList, this.FileID_AuditReport);
        },
        OrgChartDeletedfFile: function(file, fileList) {
            this.FileID_OrgChart = fileDeleteHandle(file, fileList, this.FileID_OrgChart);
        },
        RelOperLicensesDeletedfFile: function(file, fileList) {
            this.FileID_RelOperLicenses = fileDeleteHandle(file, fileList, this.FileID_RelOperLicenses);
        },
        CompanyInfoDeletedfFile: function(file, fileList) {
            this.FileID_CompanyInfo = fileDeleteHandle(file, fileList, this.FileID_CompanyInfo);
        },
        saveValueToServer: function() {
            var requestData = {
                data: this.buildServerData()
            };
            var requestUrl = Utility.dfServiceUrl + "/SaveCompanyInfo/";
            if(this.Id && this.Id != -1) {
                requestUrl += "UPDATE";
            } else {
                requestUrl += "NEW";
            }
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.SaveCompanyInfoResult 
                    && response.data.SaveCompanyInfoResult.Status == "success") {
                        this.$message("Save Success!");
                        this.IsEdit = false;
                        this.formStatus = "UPDATE";
                        this.$emit("refresh");
                    } else if (response.data && response.data.SaveCompanyInfoResult) {
                        this.$message.error(response.data.SaveCompanyInfoResult.Message);
                    } else {
                        this.$message.error("Save Failed!");
                    }   

            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.data.message);
            });

        },
        buildServerData: function() {
            var data = {
                id: this.Id,
                dealer_id : this.dealerID,
                Year: this.Year,
                FileID_CompanyInfo: this.FileID_CompanyInfo,
                FileID_BusinessLicense: this.FileID_BusinessLicense,
                FileID_TaxRC: this.FileID_TaxRC,
                FileID_OrgCodeCer: this.FileID_OrgCodeCer,
                FileID_IDCardOfLegalRep: this.FileID_IDCardOfLegalRep,
                FileID_CertOfInco: this.FileID_CertOfInco,
                FileID_AuditReport: this.FileID_AuditReport,
                FileID_OrgChart: this.FileID_OrgChart,
                FileID_RelOperLicenses: this.FileID_RelOperLicenses,
                Remark: this.Remark,
                IsDeleted: this.IsDeleted
            };
            return data;
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
            //this.$router.go(-1);
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
.smallSelector {
     width: 120px;   
}
</style>

