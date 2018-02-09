<template>
    <div class="DAPContainer" >
        <el-row class="smallRow" v-if="!IsTaskPage">
            <el-col :span="18">
                <el-button size="small" :disabled="IsEdit || !isAllowEdit" type="primary" 
                    v-on:click="IsEdit = true">Edit</el-button>
                <el-button size="small" :disabled="!IsEdit || !isAllowEdit" type="primary" v-on:click="saveValueToServer">Save</el-button>
                <el-button size="small" :disabled="IsEdit || !IsAllowStartWF" type="primary" 
                    v-on:click="startWF">Start Assessment Process</el-button>
                <el-button size="small" v-on:click="returnToLastNav">Return</el-button>
            </el-col>
           <!-- <el-col :span="6">
                <el-button size="small"  v-on:click="DoPrint">Print</el-button>
            </el-col>
            -->
        </el-row>
        <el-row class="smallRow"> 
            <el-col>
                <el-row class="tinyRow">
                    <el-col :span="4" class="colTitle">Dealer Name:</el-col>
                    <el-col :span="8" class="colValue">
                        <el-input v-model="DealerName" :disabled="!IsEdit" size="mini"></el-input>
                    </el-col>
                    <el-col :span="4" class="colTitle">Fiscal Year:</el-col>
                    <el-col :span="8" class="colValue">
                        <el-select size="mini" class="smallSelector" :disabled="!IsEdit" v-model="Year">
                            <el-option v-for="item in yearList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col class="colTitle" :span="4">
                        Sales Region
                    </el-col>
                    <el-col class="colValue"  :span="8">
                        <!-- <el-input v-model="SalesRegion" :disabled="!isEdit" size="mini"></el-input> -->
                        <el-select size="mini" :disabled="!IsEdit" class="middleSelector" v-model="SalesRegion">
                          <el-option v-for="item in SRList" :key="item" 
                            :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col :span="4" class="colTitle">SAP Code:</el-col>
                    <el-col :span="8" class="colValue">
                        <el-input v-model="SAP_Code" :disabled="!IsEdit" size="mini"></el-input>
                    </el-col>
                    <el-col :span="4" class="colTitle">BG:</el-col>
                    <el-col :span="8" class="colValue">
                        <el-select size="mini" class="smallSelector" :disabled="!IsEdit" v-model="BU">
                            <el-option v-for="item in buList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col :span="4" class="colTitle">Distribution Area:</el-col>
                    <el-col :span="18" class="colValue">
                        <el-input type="textarea" :disabled="!IsEdit" v-model="Distribution_Area" 
                                    :autosize="{ minRows: 2, maxRows: 9}">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col :span="4" class="colTitle">Distributed Products:</el-col>
                    <el-col :span="18" class="colValue">
                        <el-input type="textarea" :disabled="!IsEdit" v-model="Distributed_Products" 
                                    :autosize="{ minRows: 2, maxRows: 9}">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col :span="4" class="colTitle">Sales Target:</el-col>
                    <el-col :span="8" class="colValue">
                        <el-input-number v-model="Sales_Target" :disabled="!IsEdit" controls-position="right"
                            :min="0" :max="9999999999" :step="10000" size="mini">
                        </el-input-number>
                    </el-col>
                    <el-col :span="4" class="colTitle">Sales Revenue:</el-col>
                    <el-col :span="8" class="colValue">
                        <el-input-number v-model="Sales_Revenue" :disabled="!IsEdit" controls-position="right"
                            :min="0" :max="9999999999" :step="10000" size="mini">
                        </el-input-number>
                    </el-col>
                </el-row>
                <el-row class="tinyRow">
                    <el-col>
                        <el-row  class="miniRow">
                            <el-col :span="6"  class="colTitle">Assessment</el-col>
                            <el-col :span="6"  class="colValue">Points (0-10)</el-col>
                            <el-col :span="5"  class="colValue">Weight *</el-col>
                            <el-col :span="5"  class="colValue">Sum</el-col>
                        </el-row>
                        <el-row  class="miniRow">
                            <el-col :span="6"  class="colTitle">Sales target achievement</el-col>
                            <el-col :span="6"  class="colValue">
                                <el-input-number v-model="STA_Points" :disabled="!IsEdit" controls-position="right"
                                    :min="0" :max="10" :step="1" size="mini">
                                </el-input-number>
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{STA_Weight}}%
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{STA_Sum}}
                            </el-col>
                        </el-row>
                         <el-row  class="miniRow">
                            <el-col :span="6"  class="colTitle">Regular project reporting</el-col>
                            <el-col :span="6"  class="colValue">
                                <el-input-number v-model="RPR_Points" :disabled="!IsEdit" controls-position="right"
                                    :min="0" :max="10" :step="1" size="mini">
                                </el-input-number>
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{RPR_Weight}}%
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{RPR_Sum}}
                            </el-col>
                        </el-row>
                         <el-row  class="miniRow">
                            <el-col :span="6"  class="colTitle">Number of dedicated sales engineers</el-col>
                            <el-col :span="6"  class="colValue">
                                <el-input-number v-model="NDSE_Points" :disabled="!IsEdit" controls-position="right"
                                    :min="0" :max="10" :step="1" size="mini">
                                </el-input-number>
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{NDSE_Weight}}%
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{NDSE_Sum}}
                            </el-col>
                        </el-row>
                         <el-row  class="miniRow">
                            <el-col :span="6"  class="colTitle">Number of certified service engineers</el-col>
                            <el-col :span="6"  class="colValue">
                                <el-input-number v-model="NCSE_Points" :disabled="!IsEdit" controls-position="right"
                                    :min="0" :max="10" :step="1" size="mini">
                                </el-input-number>
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{NCSE_Weight}}%
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{NCSE_Sum}}
                            </el-col>
                        </el-row>
                         <el-row  class="miniRow">
                            <el-col :span="6"  class="colTitle">Attended CZ training</el-col>
                            <el-col :span="6"  class="colValue">
                                <el-input-number v-model="ACZT_Points" :disabled="!IsEdit" controls-position="right"
                                    :min="0" :max="10" :step="1" size="mini">
                                </el-input-number>
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{ACZT_Weight}}%
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{ACZT_Sum}}
                            </el-col>
                        </el-row>
                        <el-row  class="miniRow">
                            <el-col :span="6"  class="colTitle">Overall assessment score</el-col>
                            <el-col :span="6"  class="colValue">
                                &nbsp;
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                &nbsp;
                            </el-col>
                            <el-col :span="5"  class="colValue">
                                {{Sum_Score / 100}}
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row  class="tinyRow">
                    <el-col>
                        <el-row class="miniRow">
                            <el-col :span="4" class="colTitle">
                                Target achievements of 
                            </el-col>
                            <el-col :span="5">
                                {{LastYearText1}}
                            </el-col>
                            <el-col :span="5">
                                {{LastYearText2}}
                            </el-col>
                            <el-col :span="5">
                                {{LastYearText3}}
                            </el-col>
                            <el-col :span="5">
                                {{LastYearText4}}
                            </el-col>
                        </el-row>
                        <el-row  class="miniRow">
                            <el-col :span="4" class="colTitle">
                                In percent
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="LastYearPercent1" :disabled="!IsEdit" 
                                    class="colWidthMini" size="mini">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="LastYearPercent2" :disabled="!IsEdit" 
                                    class="colWidthMini"  size="mini">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="LastYearPercent3" :disabled="!IsEdit" 
                                    class="colWidthMini"  size="mini">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="LastYearPercent4" :disabled="!IsEdit" 
                                    class="colWidthMini"  size="mini">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row  class="tinyRow">
                    <el-col>
                        <el-row class="miniRow">
                            <el-col :span="4" class="colTitle">
                                Sales:
                            </el-col>
                            <el-col :span="8" class="colValue">
                                <ZeissPeoplePicker ref="picPicker" :isEdit="IsEdit" 
                                    v-bind:userInitAccount="SignedSales_Account"></ZeissPeoplePicker>
                            </el-col>
                            <el-col  :span="4" class="colTitle">
                                Recommended classification in next FY:
                            </el-col>
                            <el-col  :span="8" class="colValue">
                                <el-select size="mini" class="smallSelector" :disabled="!IsEdit" v-model="Recommendation_Status">
                                    <el-option v-for="item in recommendationList" :key="item.value" 
                                        :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row  class="miniRow">
                            <el-col  :span="4" class="colTitle">
                                Comments:
                            </el-col>
                            <el-col  :span="18" class="colValue">
                                <el-input type="textarea" v-model="Recommendation" :disabled="!IsEdit"
                                    :autosize="{ minRows: 2, maxRows: 9}">
                                </el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="smallRow">
            <ApprovalView v-bind:ApprovalInfos="ApprovalInfo" v-bind:taskID="curTaskID" 
                v-on:ReloadTask="LoadTasks">
            </ApprovalView>
        </el-row>
       
    </div>
</template>

<script>
import Utility from '../utility/index';
import { Loading } from 'element-ui';
import ZeissPeoplePicker from './ZeissPeoplePicker'
import ApprovalView from './ApprovalView'

export default {
    name: "DealerAssessmentPage",
    data () {
        var ylist = Utility.loadYearSelectList();
        var blist = Utility.loadBUList();
        var rlist = Utility.loadRecommendedList();
        return {
            yearList: ylist,
            buList: blist,
            recommendationList: rlist,
            IsEdit: false,

            id: -1,
            Dealer_Id: null,
            Year: null,
            BU: "MED",
            NatureOfContractDealer: null,
            DealerName: null,
            SAP_Code: null,
            Distribution_Area: null,
            Distributed_Products: null,
            Sales_Target: null,
            Sales_Revenue: null,
            STA_Points: null,
            STA_Weight: null,
            RPR_Points: null,
            RPR_Weight: null,
            NDSE_Points: null,
            NDSE_Weight: null,
            NCSE_Points: null,
            NCSE_Weight: null,
            ACZT_Points: null,
            ACZT_Weight: null,
            Overall_AS: null,

            STA_Sum: 0,
            RPR_Sum: 0,
            NDSE_Sum: 0,
            NCSE_Sum: 0,
            ACZT_Sum: 0,
            Sum_Score: 0,

            Recommendation: null,
            Recommendation_Status: null,
            WF_Status: null,
            SignedSales_Account: null,
            SignedSales_Name: null,
            SignedControlling_Account: null,
            SignedControlling_Name: null,
            SignedControlling_DateTime: null,
            SalesRegion: null,
            LastYearPercent1: null,
            LastYearPercent2: null,
            LastYearPercent3: null,
            LastYearPercent4: null,

            ApprovalInfo: null,
            curTaskID: null,

            IsProbation: false,
            IsDeleted: false,
            IsAllowStartWF: false,

            SRList: null,
            IsTaskPage: false,

            LastYearText1: "NA",
            LastYearText2: "NA",
            LastYearText3: "NA",
            LastYearText4: "NA"

        }
    },
    props: ['initData','dealerID','refreshKey', 'taskID', 'isAllowEdit'],
    components: {
        ZeissPeoplePicker,
        ApprovalView
    },
    created () {
        if(this.taskID) {
            this.IsTaskPage = true;
            this.IsEdit = false;
            this.curTaskID = this.taskID;
        }
        this.setInitData(this.initData);
    },
    watch: {
        Recommendation_Status: function(newStatus) {
            if(newStatus && this.IsEdit &&  newStatus != "") {
                var newText = Utility.loadDefaultRecommendText(newStatus);
                this.Recommendation = newText;
            }
        },
        initData: function(newValue) {
            //this.setInitData(newValue);
        },
        refreshKey: function(newKey) {
            this.setInitData(this.initData);
        },
        taskID: function(newValue) {
            if(this.taskID) 
            {
                this.IsTaskPage = true;
                this.IsEdit = false;
                this.curTaskID = this.taskID;
            }
        },
        STA_Points: function(newValue) {
            this.DoCalculate();
        },
        RPR_Points: function(newValue) {
            this.DoCalculate();
        },
        NDSE_Points: function(newValue) {
            this.DoCalculate();
        },
        NCSE_Points: function(newValue) {
            this.DoCalculate();
        },
        ACZT_Points: function(newValue) {
            this.DoCalculate();
        },
        Year: function(newValue) {
            if(this.Year && this.Year != '') {
               this.LastYearText1 = Utility.getPastedFYText(this.Year, 1);
            } else {
                this.LastYearText1 = "NA";
            }
            
            if(this.Year && this.Year != '') {
               this.LastYearText2 = Utility.getPastedFYText(this.Year, 2);
            } else {
                this.LastYearText2 = "NA";
            }

            if(this.Year && this.Year != '') {
               this.LastYearText3 = Utility.getPastedFYText(this.Year, 3);
            } else {
                this.LastYearText3 = "NA";
            }

            if(this.Year && this.Year != '') {
               this.LastYearText4 = Utility.getPastedFYText(this.Year, 4);
            } else {
                this.LastYearText4 = "NA";
            }
        }
    },
    computed: {
        // STA_Sum: function() {
        //     if(this.STA_Points && this.STA_Points > 0) {
        //         return this.STA_Points * this.STA_Weight / 100;
        //     }
        //     return 0;
        // },
        // RPR_Sum: function() {
        //     if(this.RPR_Points && this.RPR_Points > 0) {
        //         return this.RPR_Points * this.RPR_Weight / 100;
        //     }
        //     return 0;
        // },
        // NDSE_Sum: function() {
        //     if(this.NDSE_Points && this.NDSE_Points > 0) {
        //         return this.NDSE_Points * this.NDSE_Weight / 100;
        //     }
        //     return 0;
        // },
        // NCSE_Sum: function() {
        //     if(this.NCSE_Points && this.NCSE_Points > 0) {
        //         return this.NCSE_Points * this.NCSE_Weight / 100;
        //     }
        //     return 0;
        // },
        // ACZT_Sum: function() {
        //     if(this.ACZT_Points && this.ACZT_Points > 0) {
        //         return this.ACZT_Points * this.ACZT_Weight / 100;
        //     }
        //     return 0;
        // },
        // Sum_Score: function() {
        //     //javascript float type count!!! this is a stupid issue
        //     var sum = Math.round(this.STA_Sum * 100) + Math.round(this.RPR_Sum * 100) +
        //      Math.round(this.NDSE_Sum * 100) + Math.round(this.NCSE_Sum * 100) + Math.round(this.ACZT_Sum * 100);
        //     return sum;
        // },
        // LastYearText1: function() {
        //     if(this.Year && this.Year != '') {
        //       return  Utility.getPastedFYText(this.Year, 1);
        //     }
        //     return "NA";
        // },
        // LastYearText2: function() {
        //     if(this.Year && this.Year != '') {
        //       return  Utility.getPastedFYText(this.Year, 2);
        //     }
        //     return "NA";
        // },
        // LastYearText3: function() {
        //     if(this.Year && this.Year != '') {
        //       return  Utility.getPastedFYText(this.Year, 3);
        //     }
        //     return "NA";
        // },
        // LastYearText4: function() {
        //     if(this.Year && this.Year != '') {
        //       return  Utility.getPastedFYText(this.Year, 4);
        //     }
        //     return "NA";
        // }
    },
    methods: {
        ShowLoadingView: function() {
            Loading.service({ fullscreen: true });
        },
        HideLoadingView: function() {
            let curLoadingInstance = Loading.service({ fullscreen: true });
            curLoadingInstance.close();
        },
        DoCalculate: function() {
            if(this.STA_Points && this.STA_Points > 0) {
                this.STA_Sum = this.STA_Points * this.STA_Weight / 100;
            } else {
                this.STA_Sum = 0;
            }
            
            if(this.RPR_Points && this.RPR_Points > 0) {
                this.RPR_Sum =  this.RPR_Points * this.RPR_Weight / 100;
            } else {
                this.RPR_Sum = 0;
            }

            if(this.NDSE_Points && this.NDSE_Points > 0) {
                this.NDSE_Sum =  this.NDSE_Points * this.NDSE_Weight / 100;
            } else {
                this.NDSE_Sum = 0;
            }

            if(this.NCSE_Points && this.NCSE_Points > 0) {
                this.NCSE_Sum =  this.NCSE_Points * this.NCSE_Weight / 100;
            } else {
                this.NCSE_Sum = 0;
            }

            if(this.ACZT_Points && this.ACZT_Points > 0) {
                this.ACZT_Sum =  this.ACZT_Points * this.ACZT_Weight / 100;
            } else {
                this.ACZT_Sum = 0;
            }

            var sum = Math.round(this.STA_Sum * 100) + Math.round(this.RPR_Sum * 100) +
             Math.round(this.NDSE_Sum * 100) + Math.round(this.NCSE_Sum * 100) + Math.round(this.ACZT_Sum * 100);
            this.Sum_Score = sum;
        },
        DoPrint: function() {
            var printPageUrl = "./index.html#/AssessmentPrintView/" + this.dealerID + "/" + this.id;
            window.open(printPageUrl);
        },
        saveValueToServer: function() {
            //TODO
            if(!this.validateLYPAsNUM())
            {
                return;
            }
            var requestData = {
                data: this.buildServerData()
            };
            var requestUrl = Utility.dfServiceUrl + "/SaveAssessment/UPDATE";
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();
                if(response.data && response.data.SaveAssessmentResult &&
                   response.data.SaveAssessmentResult.Status == "success") {
                       this.$message("Save Success!");
                       this.IsEdit = false;
                       this.$emit("reloadAssessmentList");
                   } else if(response.data && response.data.SaveAssessmentResult) {
                       this.$message.error(response.data.SaveAssessmentResult.Message);
                   } else {
                       this.$message.error("Save Failed!");
                   }

            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error("Save Failed!");
            });

        },
        setInitData: function(data) {
            if(data) {
                this.id = data.id;
                this.Year = data.Year;
                this.BU = data.BU;
                this.NatureOfContractDealer = data.NatureOfContractDealer;
                this.DealerName = data.DealerName;
                this.SAP_Code = data.SAP_Code;
                this.Distribution_Area = data.Distribution_Area;
                this.Distributed_Products = data.Distributed_Products;
                this.Sales_Target = data.Sales_Target;
                this.Sales_Revenue = data.Sales_Revenue;

                this.STA_Points = data.STA_Points;
                if(data.STA_Weight && data.STA_Weight > 0) {
                    this.STA_Weight = data.STA_Weight;
                } else {
                    this.STA_Weight = 70;
                }
                this.RPR_Points = data.RPR_Points;
                if(data.RPR_Weight && data.RPR_Weight > 0) {
                    this.RPR_Weight = data.RPR_Weight;
                } else {
                    this.RPR_Weight = 10;
                }
                this.NDSE_Points = data.NDSE_Points;
                if(data.NDSE_Weight && data.NDSE_Weight > 0) {
                    this.NDSE_Weight = data.NDSE_Weight;
                } else {
                    this.NDSE_Weight = 10;
                }
                this.NCSE_Points = data.NCSE_Points;
                if(data.NCSE_Weight && data.NCSE_Weight > 0) {
                    this.NCSE_Weight = data.NCSE_Weight;
                } else {
                    this.NCSE_Weight = 5;
                }
                this.ACZT_Points = data.ACZT_Points;
                if(data.ACZT_Weight && data.ACZT_Weight > 0) {
                    this.ACZT_Weight = data.ACZT_Weight;
                } else {
                    this.ACZT_Weight = 5;
                }

                if(data.LastYearPercent1) {
                    this.LastYearPercent1 = (data.LastYearPercent1 * 0.01).toString();
                } else {
                    this.LastYearPercent1 = "NA";
                }
                if(data.LastYearPercent2) {
                    this.LastYearPercent2 = (data.LastYearPercent2 * 0.01).toString();
                } else {
                    this.LastYearPercent2 = "NA";
                }
                if(data.LastYearPercent3) {
                    this.LastYearPercent3 = (data.LastYearPercent3 * 0.01).toString();
                } else {
                    this.LastYearPercent3 = "NA";
                }
                if(data.LastYearPercent4) {
                    this.LastYearPercent4 = (data.LastYearPercent4 * 0.01).toString();
                } else {
                    this.LastYearPercent4 = "NA";
                }

                this.Overall_AS = data.Overall_AS;
                this.WF_Status = data.WF_Status;
                this.SignedSales_Account = data.SignedSales_Account;
                this.SignedSales_Name = data.SignedSales_Name;
                this.SignedControlling_Account = data.SignedControlling_Account;
                this.SignedControlling_Name = data.SignedControlling_Name;
                this.SignedControlling_DateTime = data.SignedControlling_DateTime;
                this.IsProbation = data.IsProbation;
                this.IsDeleted = data.IsDeleted;
                this.Recommendation = data.Recommendation;
                this.Recommendation_Status = data.Recommendation_Status;

                //this.DoCalculate();
                this.LoadTasks();
                this.LoadSRList();
            } else {
                //To do, should all have data
            }
        },
        LoadTasks: function() {
            if(this.taskID) {
                this.LoadWFInfoWithTaskFromServer();
            } else {
                 this.LoadWFInfoFromServer();
            }
        },
        LoadSRList: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadSRList/" + this.dealerID;
            
            this.axios.post(requestUrl).then((rep) => {
                if(rep.data && rep.data.LoadSRListResult && rep.data.LoadSRListResult.Status == "success") {
                    this.SRList = rep.data.LoadSRListResult.Data;
                } else if (rep.data && rep.data.LoadSRListResult) {
                    this.$message.error(rep.data.LoadSRListResult.Message);
                } else {
                    this.$message.error("Load Sales region failed!");
                }
            }).catch((error) => {
                this.$message.error("Load Sales region failed!");
                this.SRList = null;
            });
        },
        LoadLastYearPersent: function(value) {
            if(value) {
                var numValue = new Number(value);
                if(isNaN(numValue)) {
                    return null;
                }
                return Math.round(numValue * 100);
            }
            return null;
        },
        buildServerData: function() {
            var salesAccount = this.$refs.picPicker.userAccount;
            var salesName = this.$refs.picPicker.username;
            var result = {
                id: this.id,
                Dealer_Id: this.dealerID,
                Year: this.Year,
                BU: this.BU,
                NatureOfContractDealer: this.NatureOfContractDealer,
                DealerName: this.DealerName,
                SAP_Code: this.SAP_Code,
                Distribution_Area: this.Distribution_Area,
                Distributed_Products: this.Distributed_Products,
                Sales_Target: this.Sales_Target,
                Sales_Revenue: this.Sales_Revenue,
                STA_Points: this.STA_Points,
                STA_Weight: this.STA_Weight,
                RPR_Points: this.RPR_Points,
                RPR_Weight: this.RPR_Weight,
                NDSE_Points: this.NDSE_Points,
                NDSE_Weight: this.NDSE_Weight,
                NCSE_Points: this.NCSE_Points,
                NCSE_Weight: this.NCSE_Weight,
                ACZT_Points: this.ACZT_Points,
                ACZT_Weight: this.ACZT_Weight,
                Overall_AS: this.Sum_Score,
                IsProbation: this.IsProbation,
                Recommendation: this.Recommendation,
                Recommendation_Status: this.Recommendation_Status,
                SignedSales_Account: salesAccount,
                SignedSales_Name: salesName,
                LastYearPercent1: this.LoadLastYearPersent(this.LastYearPercent1),
                LastYearPercent2: this.LoadLastYearPersent(this.LastYearPercent2),
                LastYearPercent3: this.LoadLastYearPersent(this.LastYearPercent3),
                LastYearPercent4: this.LoadLastYearPersent(this.LastYearPercent4)
            };
            return result;
        },
        returnToLastNav: function() {
            this.$emit("close");
        },
        LoadWFInfoFromServer: function() {
            var requestURL = Utility.dfServiceUrl + "/LoadWFInfo/" + this.dealerID + "/" + this.id;
            //reset status
            this.ApprovalInfo = null;
            this.curTaskID = null;
            this.IsAllowStartWF = null;
            //this.ShowLoadingView();

            this.axios.post(requestURL).then((rep) => {
                //this.HideLoadingView();

                if(rep.data && rep.data.LoadWFInfoResult && rep.data.LoadWFInfoResult.Status == "success") 
                {
                    this.ApprovalInfo = rep.data.LoadWFInfoResult.Data;
                    this.curTaskID = this.ApprovalInfo.curTaskID;
                    this.IsAllowStartWF = this.ApprovalInfo.IsAllowStartWF;
                } else if(rep.data && rep.data.LoadWFInfoResult) {
                    this.$message.error(rep.data.LoadWFInfoResult.Message);
                } else {
                    this.$message.error("load WF Info failed!");
                }
            }).catch((error) => {
                //this.HideLoadingView();
                this.$message.error("load WF Info failed!");
            });
        },
        LoadWFInfoWithTaskFromServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadWFInfoWithTask/" + this.dealerID + "/" 
                    + this.id + "/" + this.taskID;
            //reset status
            this.ApprovalInfo = null;
            this.curTaskID = null;
            this.IsAllowStartWF = null;
            //this.ShowLoadingView();

            this.axios.post(requestUrl).then((rep) => {
                //this.HideLoadingView();

                if(rep.data && rep.data.LoadWFInfoWithTaskResult &&
                    rep.data.LoadWFInfoWithTaskResult.Status == "success") {
                        this.ApprovalInfo = rep.data.LoadWFInfoWithTaskResult.Data;
                        this.curTaskID = this.ApprovalInfo.curTaskID;
                        this.IsAllowStartWF = this.ApprovalInfo.IsAllowStartWF;
                    } else if (rep.data && rep.data.LoadWFInfoWithTaskResult) {
                        this.$message.error(rep.data.LoadWFInfoWithTaskResult.Message);
                    } else {
                        this.$message.error("Load Approval Info failed!");
                    }
            }).catch((error) => {
                //this.HideLoadingView();
                this.$message.error("Load Approval Info failed!");
            });
        },
        startWF: function() {
            if(this.validateIfCanStartWF()) {
                var requestUrl = Utility.dfServiceUrl + "/StartAssessmentWF/" + this.dealerID + "/" + this.id;
                this.ShowLoadingView();

                this.axios.post(requestUrl).then((response) => {
                    this.HideLoadingView();
                    if(response.data && response.data.StartAssessmentWFResult 
                        && response.data.StartAssessmentWFResult.Status == "success") {
                            this.WF_Status = "2";
                            this.$emit("reloadAssessmentList");
                            this.$message("Process Start Success!");
                        } else if(response.data && response.data.StartAssessmentWFResult) {
                            this.$message.error(response.data.StartAssessmentWFResult.Message);
                        } else {
                            this.$message.error("Process Start failed!");
                        }

                }).catch((error) => {
                    this.HideLoadingView();
                    this.$message.error(error.data.Message);
                });
            }
        },
        validateLYPAsNUM: function() {
            if(this.LastYearPercent1  && this.LastYearPercent1.toUpperCase() != "NA") {
                var numLastYearPercent1 = new Number(this.LastYearPercent1);
                if(isNaN(numLastYearPercent1)) {
                    this.$message.error("Last Year in percent shoule be number!");
                    return false;
                }
            }
            if(this.LastYearPercent2 && this.LastYearPercent2.toUpperCase() != "NA") {
                var numLastYearPercent2 = new Number(this.LastYearPercent2);
                if(isNaN(numLastYearPercent2)) {
                    this.$message.error("Last Year in percent shoule be number!");
                    return false;
                }
            }
            if(this.LastYearPercent3 && this.LastYearPercent3.toUpperCase() != "NA") {
                var numLastYearPercent3 = new Number(this.LastYearPercent3);
                if(isNaN(numLastYearPercent3)) {
                    this.$message.error("Last Year in percent shoule be number!");
                    return false;
                }
            }
            if(this.LastYearPercent4 && this.LastYearPercent4.toUpperCase() != "NA") {
                var numLastYearPercent4 = new Number(this.LastYearPercent4);
                if(isNaN(numLastYearPercent4)) {
                    this.$message.error("Last Year in percent shoule be number!");
                    return false;
                }
            }
            return true;
        },
        validateIfCanStartWF: function() {
            if(!this.DealerName || this.DealerName == "") {
                this.$message.error("Dealer name is empty!");
                return false;
            }
            if(!this.Year || this.Year == "") {
                this.$message.error("FY Year is empty!");
                return false;
            }
            if(!this.BU || this.BU == "") {
                this.$message.error("BG is empty!");
                return false;
            }
            if(!this.Sum_Score || this.Sum_Score == "" || this.Sum_Score == "NA" || this.Sum_Score== 0) {
                this.$message.error("Overall assessment score is empty or 0 or NA!");
                return false;
            }
            if(!this.Recommendation || this.Recommendation == "") {
                this.$message.error("Recommendation is empty!");
                return false;
            }
            if(!this.Recommendation_Status || this.Recommendation_Status == "") {
                this.$message.error("Recommendation Status is empty!");
                return false;
            }
            var salesAccount = this.$refs.picPicker.userAccount;
            if(!salesAccount || salesAccount == "") {
                this.$message.error("Sales is empty!");
                return false;
            }
            if(!this.WF_Status || this.WF_Status == "2" || this.WF_Status == "3" || this.WF_Status == "4") {
                this.$message.error("WF is running!");
                return false;
            }
            return this.validateLYPAsNUM();
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
.miniRow {
    padding: 3px 0px 3px 0px;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
}
.colTitle {
    padding-left: 15px;
}
.colValue {
    padding-left: 10px;
}
.colWidthMini {
    width: 160px;
}

/* print */
/* .printContainer{
    visibility:hidden;
    width: 800px;
    margin: 10px auto;
}
.row {
    width: 800px;
    display: block;
    margin:  0px;
    padding: 10px 0px 10px 0px;
    border: 0px;
    text-align: left;
}
.row2 {
    width: 800px;
    display: block;
    margin: 0px;
    padding: 3px 0px 3px 0px;
    border: 0px;
    text-align: left;
}
.titleRow {
    width: 800px;
    display: block;
    margin: 35px 0px;
    padding: 0px;
    border: 0px;
    font-size: 20px;
}
.colTitle1 {
    padding: 0px;
    width: 120px;
    margin: 0px;
    border: 0px;
    display: inline-block;
}
.colTitle2 {
    padding: 0px;
    width: 280px;
    margin: 0px;
    border: 0px;
    display: inline-block;
}
.colTitle3 {
    padding: 0px;
    width: 240px;
    margin: 0px;
    border: 0px;
    display: inline-block;
}
.colTitle4 {
    padding: 0px;
    width: 320px;
    margin: 0px;
    border: 0px;
    display: inline-block;
}
.colValue1 {
    padding: 0px;
    width: 260px;
    margin: 0px 0px 0px 10px ;
    border: 0px;
    display: inline-block;
}
.colValue2 {
    padding: 0px;
    width: 660px;
    margin: 0px 0px 0px 10px ;
    border: 0px;
    display: inline-block;
}
.colValue2_1 {
    padding: 0px;
    width: 140px;
    margin: 0px 0px 0px 10px ;
    border: 0px;
    display: inline-block;
}
.colValue3_1 {
    padding: 0px;
    width: 120px;
    margin: 0px 0px 0px 10px ;
    border: 0px;
    display: inline-block;
}
.bottomBorderLine {
    border-bottom: 1px solid black;
} */
</style>

