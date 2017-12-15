<template>
    <div>
        <el-row class="SectionTitle">
            <el-col v-on:click="IsHide = !IsHide">
                <span>Dealer Agreement Management / 经销商签约记录</span>
            </el-col>
        </el-row>
        <el-row :disabled="IsHide">
            <el-col>
                <el-button type="primary" size="small" v-on:click="CreateNewContract" >Create New</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table :data="contractListData" stripe style="width: 100%">
                    <el-table-column width="200">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" :disabled="!isAllowEdit">Edit</el-button>
                            <el-button type="primary" size="mini" :disabled="!isAllowEdit">Delete</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Year" label="FYShow" width="100">

                    </el-table-column>
                    <el-table-column prop="ActPeriod_StartDate" label="from" width="140">

                    </el-table-column>
                    <el-table-column prop="ActPeriod_EndDate" label="to" width="140">

                    </el-table-column>
                    <el-table-column prop="Dealer_Region" label="Region" width="120">

                    </el-table-column>
                    <el-table-column prop="Appointed_Products" label="Product" width="120">

                    </el-table-column>
                    <el-table-column  label="Year Target" width="120">
                        <template slot-scope="scope">
                            {{scope.row.SalesTarget}}&nbsp;{{scope.row.SalesTarget_Unit}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="Dealer Agreement" :visible.sync="DialogContractVisable" :fullscreen="true">
            <ContractLogPage :refreshKey="refreshKey" :dealerID="dealerID" :Status="contractViewStatus"
            :initData="contractViewInitData" v-on:close="handerDialogClose" v-on:refresh="handerRefersh"></ContractLogPage>
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
            IsHide: false,
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
        handerDialogClose: function() {
            this.DialogContractVisable = false;
        },
        handerRefersh: function() {
            //todo
            this.$emit("reLoadContractLogList");
        },
        CreateNewContract: function() {
            this.contractViewStatus = "NEW";
            this.contractViewInitData = null;
            this.refreshKey = this.refreshKey + 1;
            this.DialogContractVisable = true; 
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
