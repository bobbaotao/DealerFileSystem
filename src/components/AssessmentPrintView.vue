<template>
    <div class="divContainer">
        <div class="btnContainer">
            <el-button size="small"  v-on:click="DoPrint">Print</el-button>
        </div>
        <div id="PrintView" class="printContainer">
            <div class="titleRow">
                Dealer Assessment Form
            </div>
            <div class="row bottomBorderLine">
                <div class="colTitle1">Dealer Name:</div>
                <div class="colValue1">{{DealerName}}</div>
                <div class="colTitle1">Fiscal Year:</div>
                <div class="colValue1">{{Year}}</div>
            </div>
            <div class="row bottomBorderLine">
                <div class="colTitle1">Sales Region:</div>
                <div class="colValue2">{{SalesRegion}}</div>
            </div>
            <div class="row bottomBorderLine">
                <div class="colTitle1">SAP Code:</div>
                <div class="colValue1">{{SalesRegion}}</div>
                <div class="colTitle1">BG:</div>
                <div class="colValue1">{{BU}}</div>
            </div>
            <div class="row bottomBorderLine">
                <div class="colTitle1">Distribution Area:</div>
                <div class="colValue2">{{Distribution_Area}}</div>
            </div>
            <div class="row bottomBorderLine">
                <div class="colTitle1">Distributed Products:</div>
                <div class="colValue2">{{Distributed_Products}}</div>
            </div>
            <div class="row bottomBorderLine">
                <div class="colTitle1">Sales Target:</div>
                <div class="colValue1">{{Sales_Target}}</div>
                <div class="colTitle1">Sales Revenue:</div>
                <div class="colValue1">{{Sales_Revenue}}</div>
            </div>
            <div class="row2">
                <div class="colTitle2">AssessmentPoints</div>
                <div class="colValue2_1">Points (0-10)</div>
                <div class="colValue2_1">Weight *</div>
                <div class="colValue2_1">Sum</div>
            </div>
            <div class="row2">
                <div class="colTitle2">Sales target achievement</div>
                <div class="colValue2_1">{{STA_Points}}</div>
                <div class="colValue2_1">{{STA_Weight}}</div>
                <div class="colValue2_1">{{STA_Sum}}</div>
            </div>
            <div class="row2">
                <div class="colTitle2">Regular project reporting</div>
                <div class="colValue2_1">{{RPR_Points}}</div>
                <div class="colValue2_1">{{RPR_Weight}}</div>
                <div class="colValue2_1">{{RPR_Sum}}</div>
            </div>
            <div class="row2">
                <div class="colTitle2">Number of dedicated sales engineers</div>
                <div class="colValue2_1">{{NDSE_Points}}</div>
                <div class="colValue2_1">{{NDSE_Weight}}</div>
                <div class="colValue2_1">{{NDSE_Sum}}</div>
            </div>
            <div class="row2">
                <div class="colTitle2">Number of certified service engineers</div>
                <div class="colValue2_1">{{NCSE_Points}}</div>
                <div class="colValue2_1">{{NCSE_Weight}}</div>
                <div class="colValue2_1">{{NCSE_Sum}}</div>
            </div>
            <div class="row2">
                <div class="colTitle2">Attended CZ training</div>
                <div class="colValue2_1">{{ACT_Points}}</div>
                <div class="colValue2_1">{{ACT_Weight}}</div>
                <div class="colValue2_1">{{ACT_Sum}}</div>
            </div>
            <div class="row2 bottomBorderLine">
                <div class="colTitle2">Overall assessment score</div>
                <div class="colValue2_1">&nbsp;</div>
                <div class="colValue2_1">&nbsp;</div>
                <div class="colValue2_1">{{Sum_Score / 100}}</div>
            </div>
            <div class="row">
                <div class="colTitle3">Target achievements of</div>
                <div class="colValue3_1">{{LastYearText1}}</div>
                <div class="colValue3_1">{{LastYearText2}}</div>
                <div class="colValue3_1">{{LastYearText3}}</div>
                <div class="colValue3_1">{{LastYearText4}}</div>
            </div>
            <div class="row2 bottomBorderLine">
                <div class="colTitle3">In percent</div>
                <div class="colValue3_1">{{LastYearPercent1}}</div>
                <div class="colValue3_1">{{LastYearPercent2}}</div>
                <div class="colValue3_1">{{LastYearPercent3}}</div>
                <div class="colValue3_1">{{LastYearPercent4}}</div>
            </div>
            <div class="row">
                <div class="colTitle1">Sales:</div>
                <div class="colTitle1">{{SignedSales_Name}}</div>
            </div>
            <div class="row">
                <div class="colTitle4">Recommended classification in next FY:</div>
                <div class="colValue1">{{Recommendation_Status}}</div>
            </div>
            <div class="row">
                <div class="colTitle1">Comments:</div>
                <div class="colValue2">{{Recommendation}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Utility from '../utility/index';
import Print from 'print-js';
import { Loading } from 'element-ui';
export default {
    name: "AssessmentPrintView",
    data () {
        return {
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
            dealerID: null,
            assessmentID: null
        }
    },
    computed: {
        STA_Sum: function() {
            if(this.STA_Points && this.STA_Points > 0) {
                return this.STA_Points * this.STA_Weight / 100;
            }
            return 0;
        },
        RPR_Sum: function() {
            if(this.RPR_Points && this.RPR_Points > 0) {
                return this.RPR_Points * this.RPR_Weight / 100;
            }
            return 0;
        },
        NDSE_Sum: function() {
            if(this.NDSE_Points && this.NDSE_Points > 0) {
                return this.NDSE_Points * this.NDSE_Weight / 100;
            }
            return 0;
        },
        NCSE_Sum: function() {
            if(this.NCSE_Points && this.NCSE_Points > 0) {
                return this.NCSE_Points * this.NCSE_Weight / 100;
            }
            return 0;
        },
        ACZT_Sum: function() {
            if(this.ACZT_Points && this.ACZT_Points > 0) {
                return this.ACZT_Points * this.ACZT_Weight / 100;
            }
            return 0;
        },
        Sum_Score: function() {
            //javascript float type count!!! this is a stupid issue
            var sum = Math.round(this.STA_Sum * 100) + Math.round(this.RPR_Sum * 100) +
             Math.round(this.NDSE_Sum * 100) + Math.round(this.NCSE_Sum * 100) + Math.round(this.ACZT_Sum * 100);
            return sum;
        },
        LastYearText1: function() {
            if(this.Year && this.Year != '') {
              return  Utility.getPastedFYText(this.Year, 1);
            }
            return "NA";
        },
        LastYearText2: function() {
            if(this.Year && this.Year != '') {
              return  Utility.getPastedFYText(this.Year, 2);
            }
            return "NA";
        },
        LastYearText3: function() {
            if(this.Year && this.Year != '') {
              return  Utility.getPastedFYText(this.Year, 3);
            }
            return "NA";
        },
        LastYearText4: function() {
            if(this.Year && this.Year != '') {
              return  Utility.getPastedFYText(this.Year, 4);
            }
            return "NA";
        }  
    },
    created () {
         if(this.$route.params && this.$route.params.dealerID 
            && this.$route.params.assessmentID) {
                this.dealerID = this.$route.params.dealerID;
                this.assessmentID =  this.$route.params.assessmentID;
            this.loadDataFromServer();  

            } else {
                this.$message.error("No dealer id or assessment id!")
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
        DoPrint: function() {
            Print('PrintView', 'html');
            //Print({printable: 'PrintView', type: "html", honorMarginPadding: false, maxWidth: 1200});
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

               // this.LoadTasks();
            } else {
                //To do, should all have data
            }
        },
        loadDataFromServer: function() {
            var requestUrl = Utility.dfServiceUrl + "/LoadAssessment/" + this.dealerID + "/" + this.assessmentID;
            this.ShowLoadingView();

            this.axios.post(requestUrl).then((rep) => {
                this.HideLoadingView();

                if(rep.data && rep.data.LoadAssessmentResult &&
                    rep.data.LoadAssessmentResult.Status == "success") {
                        this.setInitData(rep.data.LoadAssessmentResult.Data);
                        //this.
                        this.$nextTick().then(() => { this.DoPrint()});
                        //Vue.nextTick().then(() => { this.DoPrint()});
                    } else if(rep.data && rep.data.LoadAssessmentResult) {
                        this.$message.error(rep.data.LoadAssessmentResult.Message);
                    } else {
                        this.$message.error("Load assessment failed!");
                    }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error("Load assessment failed!");
            });
        },
        initDataTest: function() {
                this.id = "";
                this.Year = "2017";
                this.BU = "MED";
                this.NatureOfContractDealer = "";
                this.DealerName = "打印测试经销商0527";
                this.SAP_Code = "C1";
                this.Distribution_Area = "asdasasxas, asdpasda asdada asdassfjhi casddsc scsdcsdciocejejcnndsk csdsnkwnien dscdncnsnd,scdscdsi cslecnapcjeo dcsjejnapjjc acecnice;l acasci9jeclj ascnoiecnl aclkjicpeojwcj acjpocepopj acd dcsdjdc sdoejcejjjjjecjwcjiowiepcwpjijoicdjiecwjojcjw";
                this.Distributed_Products = "zcsd";
                this.Sales_Target = 3211;
                this.Sales_Revenue = "acsc";

                this.STA_Points = 8;
                //if(data.STA_Weight && data.STA_Weight > 0) {
                //    this.STA_Weight = data.STA_Weight;
                //} else {
                    this.STA_Weight = 70;
                //}
                this.RPR_Points = 7;
                //if(data.RPR_Weight && data.RPR_Weight > 0) {
                //    this.RPR_Weight = data.RPR_Weight;
                //} else {
                    this.RPR_Weight = 10;
                //}
                this.NDSE_Points = 7;
                //if(data.NDSE_Weight && data.NDSE_Weight > 0) {
                //    this.NDSE_Weight = data.NDSE_Weight;
                //} else {
                    this.NDSE_Weight = 10;
                //}
                this.NCSE_Points = 9;
                //if(data.NCSE_Weight && data.NCSE_Weight > 0) {
                //    this.NCSE_Weight = data.NCSE_Weight;
                //} else {
                    this.NCSE_Weight = 5;
                //}
                this.ACZT_Points = 7;
                //if(data.ACZT_Weight && data.ACZT_Weight > 0) {
                //    this.ACZT_Weight = data.ACZT_Weight;
                //} else {
                    this.ACZT_Weight = 5;
                //}

                // if(data.LastYearPercent1) {
                //     this.LastYearPercent1 = (data.LastYearPercent1 * 0.01).toString();
                // } else {
                //     this.LastYearPercent1 = "NA";
                // }
                this.LastYearPercent1 = "NA";
                // if(data.LastYearPercent2) {
                //     this.LastYearPercent2 = (data.LastYearPercent2 * 0.01).toString();
                // } else {
                //     this.LastYearPercent2 = "NA";
                // }
                 this.LastYearPercent2 = "NA";
                // if(data.LastYearPercent3) {
                //     this.LastYearPercent3 = (data.LastYearPercent3 * 0.01).toString();
                // } else {
                //     this.LastYearPercent3 = "NA";
                // }
                 this.LastYearPercent3 = "NA";
                // if(data.LastYearPercent4) {
                //     this.LastYearPercent4 = (data.LastYearPercent4 * 0.01).toString();
                // } else {
                //     this.LastYearPercent4 = "NA";
                // }
                this.LastYearPercent4 = "NA";

                this.Overall_AS = 6.1;
                this.WF_Status = "";
                this.SignedSales_Account = "";
                this.SignedSales_Name = "Test";
                this.SignedControlling_Account = "";
                this.SignedControlling_Name = "";
                this.SignedControlling_DateTime = "";
                this.IsProbation = false;
                this.IsDeleted = false;
                this.Recommendation = "asdasasxas, asdpasda asdada asdassfjhi casddsc scsdcsdciocejejcnndsk csdsnkwnien dscdncnsnd,scdscdsi cslecnapcjeo dcsjejnapjjc acecnice;l acasci9jeclj ascnoiecnl aclkjicpeojwcj acjpocepopj acd dcsdjdc sdoejcejjjjjecjwcjiowiepcwpjijoicdjiecwjojcjw";
                
                this.Recommendation_Status = "Temp 1";
        }
    }
}
</script>

<style scoped>
.printContainer{
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
}
</style>