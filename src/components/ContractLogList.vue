<template>
    <div>
        <el-row class="SectionTitle">
            <el-col>
                <span v-on:click="IsHide = !IsHide"  style="padding-left:20px">
                     <i class="el-icon-plus" v-if="IsHide"></i><i class="el-icon-minus" v-else></i> Dealer Agreement Management / 经销商签约记录及荣誉
                </span>
            </el-col>
        </el-row>
        <el-row v-if="!IsHide">
            <el-col>
                <el-button type="primary" size="small" v-on:click="CreateNewContract" 
                    :disabled="!isAllowEdit">Create New</el-button>
            </el-col>
        </el-row>
        <el-row v-if="!IsHide">
            <el-col>
                <el-table :data="contractListData" stripe style="width: 100%">
                    <el-table-column width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" v-on:click="EditContract(scope.row)" 
                                v-if="isAllowEdit">Edit</el-button>
                            <el-button type="primary" size="mini" v-on:click="EditContract(scope.row)" 
                                v-else>View</el-button>
                            <el-button type="primary" size="mini" v-on:click="DeleteContract(scope.row)" 
                                :disabled="!isAllowEdit">Delete</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Year" label="FYShow" width="100">
                        <template slot-scope="scope">
                            {{getFYText(scope.row.Year)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ActPeriod_StartDate" label="from" width="140">
                        <template slot-scope="scope">
                            {{formatDate(scope.row.ActPeriod_StartDate)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ActPeriod_EndDate" label="to" width="140">
                        <template slot-scope="scope">
                            {{formatDate(scope.row.ActPeriod_EndDate)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="Dealer_Region" label="Region" width="180">

                    </el-table-column>
                    <el-table-column prop="Appointed_Products" label="Product" width="180">

                    </el-table-column>
                    <el-table-column  label="Year Target" width="160">
                        <template slot-scope="scope">
                            {{scope.row.SalesTarget}}&nbsp;{{formatUnitText(scope.row.SalesTarget_Unit)}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="Dealer Agreement" :visible.sync="DialogContractVisable" :fullscreen="true">
            <ContractLogPage :refreshKey="refreshKey" :dealerID="dealerID" :Status="contractViewStatus"
            :initData="contractViewInitData" :isAllowEdit="isAllowEdit"
            v-on:close="handlerDialogClose" v-on:refresh="handlerRefersh"></ContractLogPage>
        </el-dialog>
    </div>
</template>

<script>
import ContractLogPage from './ContractLogPage';
import Utility from '../utility/index';
import { Loading } from 'element-ui';

export default {
    name: "ContractLogList",
    data () {
        return {
            IsHide: true,
            DialogContractVisable: false,

            refreshKey: 0,
            contractViewStatus: "NEW",
            contractViewInitData: null
        }
    },
    props: ['contractListData','isAllowEdit', 'dealerID'],
    components: {
        ContractLogPage
    },
    methods: {
         ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        getFYText: function(year){
            return Utility.getFYText(year);
        },
        formatDate: function(data) {
            return Utility.formatDateToString(data);
        },
        formatUnitText: function(data) {
            return Utility.formatToUnitText(data);
        },
        handlerDialogClose: function() {
            this.DialogContractVisable = false;
            //this.$emit("reloadContractList");
        },
        handlerRefersh: function() {
            //todo
            this.$emit("reloadContractList");
        },
        CreateNewContract: function() {
            this.contractViewStatus = "NEW";
            this.contractViewInitData = null;
            this.refreshKey = this.refreshKey + 1;
            this.DialogContractVisable = true; 
        },
        EditContract: function(item) {
            this.contractViewStatus = "UPDATE";
            this.contractViewInitData = item;
            this.refreshKey = this.refreshKey + 1;
            this.DialogContractVisable = true; 
        },
        DeleteContract: function(item) {
            var requestData = {
                data: item
            };
            var requestUrl = Utility.dfServiceUrl + "/SaveContract/Delete";
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.SaveContractResult && response.data.SaveContractResult.Status == "success") {
                    this.$message("Action Success!");
                    this.$emit("reloadContractList");
                } else if (response.data && response.data.SaveContractResult) {
                    this.$message.error(response.data.SaveContractResult.Message);
                } else {
                    this.$message.error("Save Failed!");
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
