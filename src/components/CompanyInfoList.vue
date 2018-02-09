<template>
    <div>
        <el-row class="SectionTitle" >
            <el-col>
                <span v-on:click="isHide = !isHide" style="padding-left:20px">
                    <i class="el-icon-plus" v-if="isHide"></i><i class="el-icon-minus" v-else></i>
                     Company Information Form / 经销商信息表备份
                </span>
            </el-col>
        </el-row>
        <el-row v-if="!isHide" class="smallRow">
            <el-col :span="12" style="text-align: left; padding-left:10px;">
                <el-button size="small" type="primary"  :disabled="!isAllowEdit" 
                    v-on:click="handlerCreateNew">Create New</el-button>
                <el-button size="small" type="primary"  :disabled="!isAllowEdit" 
                    v-on:click="handlerGenerateNew">Generate New from Current Dealer Info</el-button>
                
            </el-col>
        </el-row>
        <el-row v-if="!isHide" class="smallRow">
            <el-table :data="CompanyInfoDatas" stripe style="width: 100%">
                    <el-table-column width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" v-on:click="handlerEdit(scope.row)" 
                                v-if="isAllowEdit">Edit</el-button>
                            <el-button type="primary" size="mini" v-on:click="handlerEdit(scope.row)" 
                                v-else>View</el-button>
                            <el-button type="primary" size="mini" v-on:click="handlerDelete(scope.row)" 
                                :disabled="!isAllowEdit">Delete</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Year" label="Year" width="120">
                        <template slot-scope="scope">
                            {{getFYText(scope.row.Year)}}
                        </template>
                    </el-table-column>
                     <el-table-column prop="Modified" label="Last Modified" width="140">
                         <template slot-scope="scope">
                            {{formatDate(scope.row.Modified)}}
                         </template>
                    </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="Company Info" :fullscreen="true" :visible.sync="diaConpanyInfoVisible">
            <CompanyInfoPage v-bind:initData="diaInitData"  v-bind:dealerID="dealerID"
                        v-bind:RefreshKey= "refrshKey" v-bind:Status="diaStatus" :isAllowEdit="isAllowEdit"
                        v-on:close="handlerCloseDialog" v-on:Refersh="handlerRefersh">
            </CompanyInfoPage>
        </el-dialog>
    </div>
</template>

<script>
import CompanyInfoPage from './CompanyInfoPage'
import Utility from '../utility/index';
import { Loading } from 'element-ui';

export default {
    name: "CompanyInfoList",
    data () {
        return {
            diaConpanyInfoVisible: false,
            diaInitData: null,
            refrshKey: 0,
            diaStatus: "NEW",
            isHide: true
        }
    },
    props: ['CompanyInfoDatas','isAllowEdit', 'dealerID'],
    components: {
        CompanyInfoPage
    },
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        getFYText: function(year) {
            return Utility.getFYText(year);
        },
        formatDate: function(data) {
            return Utility.formatDateToString(data);
        },
        handlerCreateNew: function() {
            this.diaInitData = null;
            this.diaStatus = "NEW";
            this.refrshKey = this.refrshKey + 1;
            this.diaConpanyInfoVisible = true;
        },
        handlerRefersh: function() {
            this.$emit("ReloadCompanyList");
        },
        handlerCloseDialog : function() {
            this.diaConpanyInfoVisible = false;
            //this.$emit("ReloadCompanyList");
        },
        handlerEdit: function(item) {
            this.diaInitData = item;
            this.diaStatus = "UPDATE";
            this.refrshKey = this.refrshKey + 1;
            this.diaConpanyInfoVisible = true;
        },
        LoadAttListAndOpenCompanyPage: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadAttList/" + this.dealerID;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.LoadAttListResult 
                && response.data.LoadAttListResult.Status == "success") {
                    this.$store.commit('initAttList',response.data.LoadAttListResult.Data);
                    this.diaStatus = "Generate";
                    this.refrshKey = this.refrshKey + 1;
                    this.diaConpanyInfoVisible = true;
                } else if(response.data && response.data.LoadAttListResult) {
                    this.$message.error(response.data.LoadAttListResult.Message);
                } else {
                    this.$message.error("Load company list failed!");
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.data.message);
            });
        },
        handlerGenerateNew: function() {
            var requestUrl = Utility.dfServiceUrl + "/GenerateCompanyInfo/" + this.dealerID;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.GenerateCompanyInfoResult 
                    && response.data.GenerateCompanyInfoResult.Status == "success")
                {
                    this.diaInitData = response.data.GenerateCompanyInfoResult.Data;
                    this.LoadAttListAndOpenCompanyPage();
                } else if (response.data && response.data.GenerateCompanyInfoResult) {
                    this.$message.error(response.data.GenerateCompanyInfoResult.Message);
                } else {
                    this.$message.error("some issue happened!");
                }

            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.data.message);
            });
        },  
        handlerDelete: function(item) {
            var requestData = {
                data: item
            };
            var requestUrl = Utility.dfServiceUrl + "/SaveCompanyInfo/DELETE";
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.SaveCompanyInfoResult 
                && response.data.SaveCompanyInfoResult.Status == "success") {
                    this.$message("Delete Success!");
                    this.$emit("ReloadCompanyList");
                } else if (response.data && response.data.SaveCompanyInfoResult) {
                    this.$message.error(response.data.SaveCompanyInfoResult.Message);
                } else {
                    this.$message.error("Delete Failed!");
                }   

            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.data.message);
            });
        }
    }
}
</script>

<style scoped>
.smallRow 
{
    padding: 5px 0px 5px 0px;

}
.smallCell{
    padding: 3px 5px 3px 5px;

}
.sectionRow {
    border: 1px black solid;
    padding: 5px 0px 5px 0px;
}
.SectionTitle {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 15px;
    background-color: rgba(107, 145, 188);
    color: rgba(254, 254, 254);
}
.colTitle {
    padding-left: 10px;
}
</style>

