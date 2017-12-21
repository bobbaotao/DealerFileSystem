<template>
    <div>
        <el-row class="SectionTitle" >
            <el-col>
                <span v-on:click="isHide = !isHide" style="padding-left:20px">
                    <i class="el-icon-plus" v-if="isHide"></i><i class="el-icon-minus" v-else></i> Achievement / 销售目标及完成情况
                </span>
            </el-col>
        </el-row>
        <el-row v-if="!isHide" class="smallRow">
            <el-col :span="12" style="text-align: left; padding-left:10px;">
                <el-button size="small" type="primary" v-on:click="handlerCreateNew">Create New</el-button>
                
            </el-col>
        </el-row>
        <el-row  v-if="!isHide" class="smallRow">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="2">Year Target</el-col>
            <el-col :span="1">Quarter</el-col>
            <el-col :span="3">Target</el-col>
            <el-col :span="3">Sales</el-col>
            <el-col :span="2">Finish</el-col>
            <el-col :span="2">是否达标</el-col>
            <el-col :span="2">折扣金额</el-col>
            <el-col :span="2">使用合同号</el-col>
            <el-col :span="2">OINumber</el-col>
            <el-col :span="2">使用金额</el-col>
        </el-row>
        <el-row v-for="(item, index) in achListData" v-bind:key="index">
            <el-col  v-if="!isHide" class="sectionRow" >
                <el-row>
                    <el-col :span="3">
                        <el-button size="mini" type="primary" v-on:click="handlerEdit(item)">Edit</el-button>
                        <el-button size="mini" type="primary" v-on:click="handlerDelete(item)">Delete</el-button>
                    </el-col>
                    <el-col :span="2">&nbsp;{{item.Year}}</el-col>
                    <el-col :span="1">Q1</el-col>
                    <el-col :span="3">&nbsp;{{item.Q1_TargetNum}}</el-col>
                    <el-col :span="3">&nbsp;{{item.Q1_SalesNum}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q1_FinishRate > 0 ? item.Q1_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q1_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q1_Discount}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q1_DiscountContract}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q1_OINO}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q1_UsedMoney}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="1">Q2</el-col>
                    <el-col :span="3">&nbsp;{{item.Q2_TargetNum}}</el-col>
                    <el-col :span="3">&nbsp;{{item.Q2_SalesNum}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q2_FinishRate > 0 ? item.Q2_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q2_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q2_Discount}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q2_DiscountContract}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q2_OINO}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q2_UsedMoney}}</el-col>               
                </el-row>
                <el-row>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="1">Q3</el-col>
                    <el-col :span="3">&nbsp;{{item.Q3_TargetNum}}</el-col>
                    <el-col :span="3">&nbsp;{{item.Q3_SalesNum}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q3_FinishRate > 0 ? item.Q3_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q3_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q3_Discount}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q3_DiscountContract}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q3_OINO}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q3_UsedMoney}}</el-col>                  
                </el-row>
                <el-row>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="1">Q4</el-col>
                    <el-col :span="3">&nbsp;{{item.Q4_TargetNum}}</el-col>
                    <el-col :span="3">&nbsp;{{item.Q4_SalesNum}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q4_FinishRate > 0 ? item.Q4_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q4_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q4_Discount}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q4_DiscountContract}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q4_OINO}}</el-col>
                    <el-col :span="2">&nbsp;{{item.Q4_UsedMoney}}</el-col>               
                </el-row>
            </el-col>
        </el-row>
        <el-dialog title="Achievement History" :visible.sync="dialogAchItemVisable" :fullscreen="true">
            <AchievementPage :refreshKey="refreshKey" :dealerID="dealerID" :Status="achViewStatus"
                    :initData="achViewInitData" v-on:close="handlerDialogClose" v-on:refresh="handlerRefersh">
            </AchievementPage>
        </el-dialog>
    </div>
</template>

<script>
import AchievementPage from './AchievementPage';
import Utility from '../utility/index';
import { Loading } from 'element-ui';

export default {
    name: "AchievementList",
    data() {
        return {
            refreshKey: 0,
            dialogAchItemVisable: false,
            achViewInitData: null,
            achViewStatus: "New",
            isHide: true
        }
    },
    props: ['achListData','isAllowEdit', 'dealerID'],
    components: {AchievementPage},
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        handlerEdit: function(item) {
            this.achViewInitData = item;
            this.refreshKey = this.refreshKey + 1;
            this.achViewStatus = "Update";
            this.dialogAchItemVisable = true;
        },
        handlerDelete: function(item) {
            var requestData = {
                data: item
            };
            var requestUrl = Utility.dfServiceUrl + "/SaveAchievement/Delete";
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.SaveAchievementResult 
                && response.data.SaveAchievementResult.Status == "success") {
                    this.$message("Delete success!");
                    this.$emit('reloadAchList');
                } else if(response.data && response.data.SaveAchievementResult) {
                    this.$message.error(response.data.SaveAchievementResult.Message);
                } else {
                    this.$message.error("Delete failed!");
                }

            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.nessage);
            });
        },
        handlerCreateNew: function() {
            this.achViewInitData = null;
            this.refreshKey = this.refreshKey + 1;
            this.achViewStatus = "NEW";
            this.dialogAchItemVisable = true;
        },
        handlerDialogClose: function() {
            this.dialogAchItemVisable = false;
        },
        handlerRefersh: function() {
            this.$emit('reloadAchList');
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

