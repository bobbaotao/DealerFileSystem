<template>
    <div>
        <el-row class="SectionTitle" >
            <el-col>
                <span v-on:click="isHide = !isHide" style="padding-left:20px">
                    <i class="el-icon-plus" v-if="isHide"></i><i class="el-icon-minus" v-else></i>
                    Dealer Assessment List / 经销商评估表历史
                </span>
            </el-col>
        </el-row>
        <el-row v-if="!isHide" class="smallRow">
            <el-col :span="12" style="text-align: left; padding-left:10px;">
                <el-button size="small" type="primary" :disabled="!isAllowEdit" v-on:click="handlerCreateNew">Create New</el-button>
            </el-col>
        </el-row>
        <el-row v-if="!isHide">
            <el-col>
                <el-table :data="assessmentList"  stripe style="width: 100%">
                    <el-table-column width="200">
                        <template slot-scope="scope">
                             <el-button type="primary" size="mini" v-on:click="EditAssessment(scope.row)" 
                                v-if="isAllowEdit">Edit</el-button>
                            <el-button type="primary" size="mini" v-on:click="EditAssessment(scope.row)" 
                                v-else>View</el-button>
                            <el-button type="primary" size="mini" v-on:click="DeleteAssessment(scope.row)" 
                                :disabled="!isAllowEdit">Delete</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Year" label="FY Year" width="100">
                        <template slot-scope="scope">
                            {{getFYText(scope.row.Year)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="Overall_AS" label="Score" width="150">
                        <template slot-scope="scope">
                            {{scope.row.Overall_AS / 100}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="Recommendation_Status" label="Recommendation" width="200">
                        <template slot-scope="scope">
                            {{scope.row.Recommendation_Status}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="WF_Status" label="Status" width="150">
                        <template slot-scope="scope">
                            {{scope.row.WF_Status}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="Dealer Assessment" :visible.sync="DialogAssessmentVisible" :fullscreen="true">
            <DealerAssessmentPage :initData="assessmentDiaData" :refreshKey="refreshKey" :dealerID="dealerID"
               :isAllowEdit="isAllowEdit" v-on:close="dialogClose" v-on:reloadAssessmentList="reloadAssessmentList">
            </DealerAssessmentPage>
        </el-dialog>
        <!-- <el-dialog title="Choose A Contract" :visible.sync="DialogSelectContract" >
            <el-table :data="contractList" stripe style="width: 100%">
                <el-table-column prop="" >

                </el-table-column>
            </el-table>
        </el-dialog> -->
    </div>
</template>

<script>
import DealerAssessmentPage from './DealerAssessmentPage';
import Utility from '../utility/index';
import { Loading } from 'element-ui';
var moment = require('moment');
var array = require('array');

export default {
    name: "DealerAssessmentList",
    data () {
        return {
            isHide: true,
            DialogAssessmentVisible: false,

            refreshKey: 0,
            assessmentDisIsEdit: false,
            assessmentDiaData: null,
            //assessmentDiaStatus: "UPDATE",

            contractSourceList: null
        }
    },
    components: {
        DealerAssessmentPage
    },
    props: ['assessmentList', 'isAllowEdit', 'dealerID', 'contractList'],
    created () {
        
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
        handlerCreateNew: function() {
            var year = (moment().year() - 1);
            var requestUrl =  Utility.dfServiceUrl + "/GenerateAssessment/" + this.dealerID + "/" + year;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((response) => {
                this.HideLoadingView();
                if(response.data && response.data.GenerateAssessmentResult 
                    && response.data.GenerateAssessmentResult.Status == "success") {
                        this.assessmentDiaData = response.data.GenerateAssessmentResult.Data;
                        this.refreshKey = this.refreshKey + 1;
                        this.DialogAssessmentVisible = true;
                    } else if(response.data && response.data.GenerateAssessmentResult) {
                        this.$message.error(response.data.GenerateAssessmentResult.Message);
                    } else {
                        this.$message.error("Create New Failed!");
                    }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error("Create New Failed!");
            });

        },
        EditAssessment: function(assessmentItem) {
            //to do;
            this.assessmentDiaData = assessmentItem;
            this.refreshKey = this.refreshKey + 1;
            this.DialogAssessmentVisible = true;
        },
        DeleteAssessment: function(assessmentItem) {
            // to do;

            var requestData = {
                data: assessmentItem
            };
            var requestUrl = Utility.dfServiceUrl + "/SaveAssessment/DELETE";
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();
                if(response.data && response.data.SaveAssessmentResult &&
                   response.data.SaveAssessmentResult.Status == "success") {
                       this.$message("Delete Success!");
                       this.$emit("ReloadAssessmentList");
                   } else if(response.data && response.data.SaveAssessmentResult) {
                       this.$message.error(response.data.SaveAssessmentResult.Message);
                   } else {
                       this.$message.error("Delete Failed!");
                   }

            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error("Delete Failed!");
            });
        },
        setContractSourceList: function() {
            //to do, not sure if it is need!
            var cSourceList = new array();
            if(this.contractList && this.contractList.length > 0) {
                this.contractList.forEach((item) => {
                    //var 
                });
            }
        },
        dialogClose: function() {
            this.DialogAssessmentVisible = false;
            //this.$emit("ReloadAssessmentList");  
        },
        reloadAssessmentList: function() {
            this.$emit("ReloadAssessmentList");   
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
