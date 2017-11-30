<template>
    <div>
        <el-row>
            <el-col :span="12" style="text-align: left">
                <el-button v-on:click="handerCreateNew">Create New</el-button>
                <el-button>Refreash</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="2">Year Target</el-col>
            <el-col :span="1">Quarter</el-col>
            <el-col :span="2">Target</el-col>
            <el-col :span="2">Sales</el-col>
            <el-col :span="2">Finish</el-col>
            <el-col :span="2">是否达标</el-col>
            <el-col :span="2">折扣金额</el-col>
            <el-col :span="2">使用合同号</el-col>
            <el-col :span="2">OINumber</el-col>
            <el-col :span="2">使用金额</el-col>
        </el-row>
        <el-row v-for="(item, index) in achListData" v-bind:key="index">
            <el-col>
                <el-row>
                    <el-col :span="3">
                        <el-button size="mini" type="primary" v-on:click="handerEdit(item)">Edit</el-button>
                        <el-button size="mini" type="primary" v-on:click="handerDelete(item)">Delete</el-button>
                    </el-col>
                    <el-col :span="2">&nbsp;{{item.Year}}</el-col>
                    <el-col :span="1">Q1</el-col>
                    <el-col :span="2">{{item.Q1_TargetNum}}</el-col>
                    <el-col :span="2">{{item.Q1_SalesNum}}</el-col>
                    <el-col :span="2">{{item.Q1_FinishRate > 0 ? item.Q1_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">{{item.Q1_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">{{item.Q1_Discount}}</el-col>
                    <el-col :span="2">{{item.Q1_DiscountContract}}</el-col>
                    <el-col :span="2">{{item.Q1_OINO}}</el-col>
                    <el-col :span="2">{{item.Q1_UsedMoney}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="1">Q2</el-col>
                    <el-col :span="2">{{item.Q2_TargetNum}}</el-col>
                    <el-col :span="2">{{item.Q2_SalesNum}}</el-col>
                    <el-col :span="2">{{item.Q2_FinishRate > 0 ? item.Q2_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">{{item.Q2_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">{{item.Q2_Discount}}</el-col>
                    <el-col :span="2">{{item.Q2_DiscountContract}}</el-col>
                    <el-col :span="2">{{item.Q2_OINO}}</el-col>
                    <el-col :span="2">{{item.Q2_UsedMoney}}</el-col>               
                </el-row>
                <el-row>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="1">Q3</el-col>
                    <el-col :span="2">{{item.Q3_TargetNum}}</el-col>
                    <el-col :span="2">{{item.Q3_SalesNum}}</el-col>
                    <el-col :span="2">{{item.Q3_FinishRate > 0 ? item.Q3_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">{{item.Q3_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">{{item.Q3_Discount}}</el-col>
                    <el-col :span="2">{{item.Q3_DiscountContract}}</el-col>
                    <el-col :span="2">{{item.Q3_OINO}}</el-col>
                    <el-col :span="2">{{item.Q3_UsedMoney}}</el-col>                  
                </el-row>
                <el-row>
                    <el-col :span="3">
                        &nbsp;
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="1">Q4</el-col>
                    <el-col :span="2">{{item.Q4_TargetNum}}</el-col>
                    <el-col :span="2">{{item.Q4_SalesNum}}</el-col>
                    <el-col :span="2">{{item.Q4_FinishRate > 0 ? item.Q4_FinishRate + "%": " "}}</el-col>
                    <el-col :span="2">{{item.Q4_IsReachTarget? "达标" : "未达标"}}</el-col>
                    <el-col :span="2">{{item.Q4_Discount}}</el-col>
                    <el-col :span="2">{{item.Q4_DiscountContract}}</el-col>
                    <el-col :span="2">{{item.Q4_OINO}}</el-col>
                    <el-col :span="2">{{item.Q4_UsedMoney}}</el-col>               
                </el-row>
            </el-col>
        </el-row>
        <el-dialog title="Achievement History" :visible.sync="dialogAchItemVisable" :fullscreen="true">
            <AchievementPage :ref="achView" :dealerID="dealerID" :Status="achViewStatus"
                    :initData="achViewInitData">
            </AchievementPage>
        </el-dialog>
    </div>
</template>

<script>
import AchievementPage from './AchievementPage';

export default {
    name: "AchievementList",
    data() {
        return {
            dialogAchItemVisable: false,
            achViewInitData: null,
            achViewStatus: "New"
        }
    },
    props: ['achListData','isAllowEdit', 'dealerID'],
    components: {AchievementPage},
    methods: {
        handerEdit: function(item) {

        },
        handerDelete: function(item) {

        },
        handerCreateNew: function() {
            this.achViewInitData = null;
            this.achViewStatus = "NEW";
            this.dialogAchItemVisable = true;
        }
    }
}
</script>

<style scoped>

</style>

