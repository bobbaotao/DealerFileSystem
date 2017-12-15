<template>
    <div>
        <el-row class="smallRow">
            <el-col>
                <el-button :disabled="IsEdit" v-on:click="IsEdit = true">Edit</el-button>
                <el-button :disabled="!IsEdit" v-on:click="saveValueToServer">Save</el-button>
                <el-button v-on:click="returnToLastNav">Return</el-button>
            </el-col>
        </el-row>
        <el-row class="smallRow">
            <el-col>
                <el-row class="smallRow">
                    <el-col :span="2" class="smallCell">
                        <el-select size="mini" :disabled="Status != 'NEW'" v-model="selectedYear">
                            <el-option v-for="item in yearList" :key="item.value" 
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col class="smallCell" :span="3">Target</el-col>
                    <el-col class="smallCell" :span="3">Sales</el-col>
                    <el-col class="smallCell" :span="2">Finish Rate</el-col>
                    <el-col class="smallCell" :span="2">是否达标</el-col>
                    <el-col class="smallCell" :span="3">折扣金额</el-col>
                    <el-col class="smallCell" :span="2">已使用折扣的销售合同</el-col>
                    <el-col class="smallCell" :span="2">OI No.</el-col>
                    <el-col class="smallCell" :span="3">使用金额</el-col>
                </el-row>
                <el-row class="smallRow">
                    <el-col class="smallCell" :span="2">
                        Q1 {{ Q1_Rate > 0 ? " (" + Q1_Rate + "%)" : ""}}
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q1_TargetNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q1_TargetNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q1_SalesNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q1_SalesNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q1_FinishRate > 0 ? Q1_FinishRate + "%" : ""}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q1_IsReachTarget != null? (Q1_IsReachTarget? "已达标": "未达标"): ""}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q1_DiscountNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q1_DiscountNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q1_DiscountContract" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q1_DiscountContract}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q1_OINO" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q1_OINO}}
                        </span></el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q1_UsedMoney" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q1_UsedMoney}}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="smallRow">
                    <el-col class="smallCell" :span="2">
                        Q2 {{ Q2_Rate > 0 ? " (" + Q2_Rate + "%)" : ""}}
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q2_TargetNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q2_TargetNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q2_SalesNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q2_SalesNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q2_FinishRate > 0 ? Q2_FinishRate + "%" : ""}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q2_IsReachTarget != null? (Q2_IsReachTarget? "已达标": "未达标"): ""}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q2_DiscountNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q2_DiscountNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q2_DiscountContract" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q2_DiscountContract}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q2_OINO" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q2_OINO}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q2_UsedMoney" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q2_UsedMoney}}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="smallRow">
                    <el-col class="smallCell" :span="2">
                        Q3 {{ Q3_Rate > 0 ? " (" + Q3_Rate + "%)" : "" }}
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q3_TargetNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q3_TargetNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q3_SalesNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q3_SalesNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q3_FinishRate > 0 ? Q3_FinishRate + "%": " "}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q3_IsReachTarget != null? (Q3_IsReachTarget? "已达标": "未达标"): ""}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q3_DiscountNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q3_DiscountNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q3_DiscountContract" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q3_DiscountContract}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q3_OINO" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q3_OINO}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q3_UsedMoney" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q3_UsedMoney}}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="smallRow">
                    <el-col class="smallCell" :span="2">
                        Q4  {{ Q4_Rate > 0 ? " (" + Q4_Rate + "%)" : ""}}
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q4_TargetNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q4_TargetNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q4_SalesNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q4_SalesNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q4_FinishRate > 0 ? Q4_FinishRate + "%" : " "}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Q4_IsReachTarget != null? (Q4_IsReachTarget? "已达标": "未达标"): ""}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q4_DiscountNum" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q4_DiscountNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q4_DiscountContract" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q4_DiscountContract}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <el-input size="mini" v-model="Q4_OINO" v-if="IsEdit"></el-input>
                        <span v-else>
                            {{Q4_OINO}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <el-input-number size="mini" v-model="Q4_UsedMoney" controls-position="right"
                                        :min="0" :max="9999999999" :step="10000" v-if="IsEdit">
                        </el-input-number>
                        <span v-else>
                            {{Q4_UsedMoney}}
                        </span>
                    </el-col>
                </el-row>
                <el-row class="smallRow">
                    <el-col class="smallCell" :span="2">
                        Total
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <span>
                            &nbsp;{{Total_TargetNum}}
                        </span>
                    </el-col>
                    <el-col  class="smallCell":span="3">
                       <span>
                           &nbsp;{{Total_SalesNum}}
                       </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            &nbsp;{{Total_FinishRate > 0 ? Total_FinishRate + "%" : "" }}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        <span>
                            {{Total_IsReachTarget != null? (Total_IsReachTarget? "已达标": "未达标"): ""}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <span>
                            {{Total_DiscountNum}}
                        </span>
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        &nbsp;
                    </el-col>
                    <el-col class="smallCell" :span="2">
                        &nbsp;
                    </el-col>
                    <el-col class="smallCell" :span="3">
                        <span>
                            {{Total_UsedMoney}}
                        </span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="smallRow">
            <el-col :span="6">
                Dealer Assessment Form<br />
                经销商评估表
            </el-col>
            <el-col :span="8">
                <el-upload
                    class="upload-demo" :disabled="!this.IsEdit || this.UploadDisable" :file-list="dfFileList"
                    :action="this.fileBaseUrl + '?method=uploadDFAttachment&dealerID=' + this.dealerID"
                    :show-file-list="true" :on-progress="FileProcess" :on-error="FileUploadFailed"
                    :on-success="FileUploadSuccess" :on-remove="DeletedfFile"
                    :on-preview="FileDownLoad">
                    <el-button size="small" type="primary"  icon="upload"
                    :disabled="!this.IsEdit || this.UploadDisable">点击上传</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <el-row class="smallRow">
            <el-col :span="6">
                 其他备注
            </el-col>
            <el-col :span="14">
                <el-input v-if="IsEdit" :rows="3" type="textarea" v-model="Remark">

                </el-input>
                <span v-else>
                    {{Remark}}
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Utility from '../utility/index';
import { Loading } from 'element-ui';
var array = require('array');

export default {
    name: 'AchievementPage',
    data() {
        var yearArr = Utility.loadYearSelectList();
        return {
            yearList: yearArr,
            selectedYear: null,
            Q1_TargetNum: null,
            Q1_SalesNum: null,
            Q1_DiscountNum: null,
            Q1_DiscountContract: null,
            Q1_OINO: null,
            Q1_UsedMoney: null,
            
            Q2_TargetNum: null,
            Q2_SalesNum: null,
            Q2_DiscountNum: null,
            Q2_DiscountContract: null,
            Q2_OINO: null,
            Q2_UsedMoney: null,
            
            Q3_TargetNum: null,
            Q3_SalesNum: null,
            Q3_DiscountNum: null,
            Q3_DiscountContract: null,
            Q3_OINO: null,
            Q3_UsedMoney: null,
            
            Q4_TargetNum: null,
            Q4_SalesNum: null,
            Q4_DiscountNum: null,
            Q4_DiscountContract: null,
            Q4_OINO: null,
            Q4_UsedMoney: null,

            Remark: null,
            DAFFileID: null,
            IsEdit: false,
            id: null,
            IsDeleted: false,
            UploadDisable: false,
            fileBaseUrl: Utility.fileServiceUrl,
            dfFileList: []
        }
    },
    props: ['Status','initData','dealerID','refreshKey'],
    computed: {
            Q1_FinishRate: function() {
                if(this.Q1_TargetNum && this.Q1_TargetNum > 0) {
                    if(this.Q1_SalesNum && this.Q1_SalesNum > 0) {
                        var percent = Math.round(this.Q1_SalesNum * 10000 / this.Q1_TargetNum);
                        return percent / 100;
                    }
                    return 0;
                }
                return 0;
            },
            Q1_IsReachTarget: function() {
                if(this.Q1_TargetNum && this.Q1_TargetNum > 0) {
                    if(this.Q1_SalesNum && this.Q1_SalesNum > 0) {
                        if(this.Q1_SalesNum >= this.Q1_TargetNum)
                        {
                            return true;
                        }
                    }
                    return false;
                }
                return null;
            },
            Q2_FinishRate: function() {
                if(this.Q2_TargetNum && this.Q2_TargetNum > 0) {
                    if(this.Q2_SalesNum && this.Q2_SalesNum > 0) {
                        var percent = Math.round(this.Q2_SalesNum * 10000 / this.Q2_TargetNum);
                        return percent / 100 ;
                    }
                    return 0;
                }
                return 0;
            },
            Q2_IsReachTarget: function() {
                if(this.Q2_TargetNum && this.Q2_TargetNum > 0) {
                    if(this.Q2_SalesNum && this.Q2_SalesNum > 0) {
                        if(this.Q2_SalesNum >= this.Q2_TargetNum)
                        {
                            return true;
                        }
                    }
                    return false;
                }
                return null;
            },
            Q3_FinishRate: function() {
                if(this.Q3_TargetNum && this.Q3_TargetNum > 0) {
                    if(this.Q3_SalesNum && this.Q3_SalesNum > 0) {
                        var percent = Math.round(this.Q3_SalesNum * 10000 / this.Q3_TargetNum);
                        return percent / 100;
                    }
                    return 0;
                }
                return 0;
            },
            Q3_IsReachTarget: function() {
                if(this.Q3_TargetNum && this.Q3_TargetNum > 0) {
                    if(this.Q3_SalesNum && this.Q3_SalesNum > 0) {
                        if(this.Q3_SalesNum >= this.Q3_TargetNum)
                        {
                            return true;
                        }
                    }
                    return false;
                }
                return null;
            },
            Q4_FinishRate: function() {
                if(this.Q4_TargetNum && this.Q4_TargetNum > 0) {
                    if(this.Q4_SalesNum && this.Q4_SalesNum > 0) {
                        var percent = Math.round(this.Q4_SalesNum * 10000 / this.Q4_TargetNum);
                        return percent / 100;
                    }
                    return 0;
                }
                return 0;
            },
            Q4_IsReachTarget: function() {
                if(this.Q4_TargetNum && this.Q4_TargetNum > 0) {
                    if(this.Q4_SalesNum && this.Q4_SalesNum > 0) {
                        if(this.Q4_SalesNum >= this.Q4_TargetNum)
                        {
                            return true;
                        }
                    }
                    return false;
                }
                return null;
            },
            Total_TargetNum: function() {
                var resultNum = 0;
                if(this.Q1_TargetNum && this.Q1_TargetNum > 0) {
                    resultNum += this.Q1_TargetNum;
                }
                if(this.Q2_TargetNum && this.Q2_TargetNum > 0) {
                    resultNum += this.Q2_TargetNum;
                }
                if(this.Q3_TargetNum && this.Q3_TargetNum > 0) {
                    resultNum += this.Q3_TargetNum;
                }
                if(this.Q4_TargetNum && this.Q4_TargetNum > 0) {
                    resultNum += this.Q4_TargetNum;
                }
                return resultNum;
            },
            Total_SalesNum: function() {
                var resultNum = 0;
                if(this.Q1_SalesNum && this.Q1_SalesNum > 0) {
                    resultNum += this.Q1_SalesNum;
                }
                if(this.Q2_SalesNum && this.Q2_SalesNum > 0) {
                    resultNum += this.Q2_SalesNum;
                }
                if(this.Q3_SalesNum && this.Q3_SalesNum > 0) {
                    resultNum += this.Q3_SalesNum;
                }
                if(this.Q4_SalesNum && this.Q4_SalesNum > 0) {
                    resultNum += this.Q4_SalesNum;
                }
                return resultNum;
            },
            Total_FinishRate: function() {
                if(this.Total_TargetNum && this.Total_TargetNum > 0) {
                    if(this.Total_SalesNum  && this.Total_SalesNum > 0) {
                        var percent = Math.round(this.Total_SalesNum * 10000 / this.Total_TargetNum);
                        return percent/100;
                    }
                    return 0;
                }
                return 0;
            },
            Total_IsReachTarget: function() {
                if(this.Total_TargetNum && this.Total_TargetNum > 0) {
                    if(this.Total_SalesNum && this.Total_SalesNum > 0) {
                        if(this.Total_SalesNum >= this.Total_TargetNum) {
                            return true;
                        }
                    }
                    return false;
                }
                return null;
            },
            Total_DiscountNum: function() {
                var totalDiscount = 0;
                if(this.Q1_DiscountNum && this.Q1_DiscountNum > 0) {
                    totalDiscount += this.Q1_DiscountNum;
                }
                if(this.Q2_DiscountNum && this.Q2_DiscountNum > 0) {
                    totalDiscount += this.Q2_DiscountNum;
                }
                if(this.Q3_DiscountNum && this.Q3_DiscountNum > 0) {
                    totalDiscount += this.Q3_DiscountNum;
                }
                if(this.Q4_DiscountNum && this.Q4_DiscountNum > 0) {
                    totalDiscount += this.Q4_DiscountNum;
                }
                return totalDiscount;
            },
            Total_UsedMoney: function() {
                var totalUsedMoney = 0;
                if(this.Q1_UsedMoney && this.Q1_UsedMoney > 0) {
                    totalUsedMoney += this.Q1_UsedMoney;
                }
                if(this.Q2_UsedMoney && this.Q2_UsedMoney > 0) {
                    totalUsedMoney += this.Q2_UsedMoney;
                }
                if(this.Q3_UsedMoney && this.Q3_UsedMoney > 0) {
                    totalUsedMoney += this.Q3_UsedMoney;
                }
                if(this.Q4_UsedMoney && this.Q4_UsedMoney > 0) {
                    totalUsedMoney += this.Q4_UsedMoney;
                }
                return totalUsedMoney;
            },
            Q1_Rate: function() {
                if(this.Total_TargetNum && this.Total_TargetNum > 0)
                {
                    if(this.Q1_TargetNum && this.Q1_TargetNum > 0) 
                    {
                        var percent =  Math.round(this.Q1_TargetNum * 10000 / this.Total_TargetNum);
                        return  percent / 100;
                    }
                    return 0;
                }
                return 0;
            },
            Q2_Rate: function() {
                if(this.Total_TargetNum && this.Total_TargetNum > 0)
                {
                    if(this.Q2_TargetNum && this.Q2_TargetNum > 0) 
                    {
                        var percent =  Math.round(this.Q2_TargetNum * 10000 / this.Total_TargetNum);
                        return  percent / 100;
                    }
                    return 0;
                }
                return 0;
            },
            Q3_Rate: function() {
                if(this.Total_TargetNum && this.Total_TargetNum > 0)
                {
                    if(this.Q3_TargetNum && this.Q3_TargetNum > 0) 
                    {
                        var percent =  Math.round(this.Q3_TargetNum * 10000 / this.Total_TargetNum);
                        return percent / 100;
                    }
                    return 0;
                }
                return 0;
            },
            Q4_Rate: function() {
                if(this.Total_TargetNum && this.Total_TargetNum > 0)
                {
                    if(this.Q4_TargetNum && this.Q4_TargetNum > 0) 
                    {
                        var percent =  Math.round(this.Q2_TargetNum * 10000 / this.Total_TargetNum);
                        return percent / 100 ;
                    }
                    return 0;
                }
                return 0;
            }
    },
    created: function() {
        this.setValues(this.initData);
    },
    watch: {
        initData: function(newValue) {
            this.setValues(newValue);
        },
        refreshKey: function(newValue) {
            this.setValues(this.initData);
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
        setValues: function(data) {
            if(data)
            {
                this.id = data.id;
                this.selectedYear = data.Year;
                this.Remark = data.Remark;
                this.DAFFileID = data.FileID_DAF;
                this.IsDeleted = data.IsDeleted;

                this.Q1_TargetNum = data.Q1_TargetNum;
                this.Q1_SalesNum = data.Q1_SalesNum;
                this.Q1_DiscountNum = data.Q1_Discount;
                this.Q1_IsReachTarget = data.Q1_IsReachTarget;
                this.Q1_DiscountContract = data.Q1_DiscountContract;
                this.Q1_OINO = data.Q1_OINO;
                this.Q1_UsedMoney = data.Q1_UsedMoney;
                
                this.Q2_TargetNum = data.Q2_TargetNum;
                this.Q2_SalesNum = data.Q2_SalesNum;
                this.Q2_DiscountNum = data.Q2_Discount;
                this.Q2_IsReachTarget = data.Q2_IsReachTarget;
                this.Q2_DiscountContract = data.Q2_DiscountContract;
                this.Q2_OINO = data.Q2_OINO;
                this.Q2_UsedMoney = data.Q2_UsedMoney;

                this.Q3_TargetNum = data.Q3_TargetNum;
                this.Q3_SalesNum = data.Q3_SalesNum;
                this.Q3_DiscountNum = data.Q3_Discount;
                this.Q3_IsReachTarget = data.Q3_IsReachTarget;
                this.Q3_DiscountContract = data.Q3_DiscountContract;
                this.Q3_OINO = data.Q3_OINO;
                this.Q3_UsedMoney = data.Q3_UsedMoney;
                
                this.Q4_TargetNum = data.Q4_TargetNum;
                this.Q4_SalesNum = data.Q4_SalesNum;
                this.Q4_DiscountNum = data.Q4_Discount;
                this.Q4_IsReachTarget = data.Q4_IsReachTarget;
                this.Q4_DiscountContract = data.Q4_DiscountContract;
                this.Q4_OINO = data.Q4_OINO;
                this.Q4_UsedMoney = data.Q4_UsedMoney;
                this.initFileList(data.FileID_DAF);
            } else {
                this.id = null;
                this.selectedYear = null;
                this.Remark = null;
                this.DAFFileID = null;
                this.IsDeleted = false;

                this.Q1_TargetNum = null;
                this.Q1_SalesNum = null;
                this.Q1_DiscountNum = null;
                this.Q1_IsReachTarget = null;
                this.Q1_DiscountContract = null;
                this.Q1_OINO = null;
                this.Q1_UsedMoney = null;
                
                this.Q2_TargetNum = null;
                this.Q2_SalesNum = null;
                this.Q2_DiscountNum = null;
                this.Q2_IsReachTarget = null;
                this.Q2_DiscountContract = null;
                this.Q2_OINO = null;
                this.Q2_UsedMoney = null;

                this.Q3_TargetNum = null;
                this.Q3_SalesNum = null;
                this.Q3_DiscountNum = null;
                this.Q3_IsReachTarget = null;
                this.Q3_DiscountContract = null;
                this.Q3_OINO = null;
                this.Q3_UsedMoney = null;
                
                this.Q4_TargetNum = null;
                this.Q4_SalesNum = null;
                this.Q4_DiscountNum = null;
                this.Q4_IsReachTarget = null;
                this.Q4_DiscountContract = null;
                this.Q4_OINO = null;
                this.Q4_UsedMoney = null;
                this.dfFileList = [];
            }
        },
        initFileList: function(fileIds) {
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
                this.dfFileList = fileArr.toArray();
            } else {
                this.dfFileList = [];
            }
        },
        FileProcess: function() {
            this.ShowLoadingView();
        },
        FileUploadFailed: function(err, file, fileList) {
            this.HideLoadingView();
            this.$message.error(err.message);
        },
        FileUploadSuccess: function(response, file, fileList) {
            this.HideLoadingView();
            this.DAFFileID =this.DAFFileID + response + ";";
            file.id = response;
            file.url = this.fileBaseUrl + '?method=loadDFAttachment&fileID=' + response,
            this.$message("Upload Success!");

            this.$store.commit('addAtt',{
                id: response,
                dealer_id: this.dealerID,
                Doc_Name: file.name
            })
        },
        FileDownLoad: function(file) {
            var url = file.url;
            window.open(url);
        },
        DeletedfFile: function(file, fileList) {
            //var i = file;
            //todo
            if(file && file.id)
            {
               var idArr = this.DAFFileID.split(";");
               var iResult = "";
               for(var id in idArr) {
                    var fileId = idArr[id];

                    if(fileId !=  file.id && fileId != "") {
                        iResult += fileId + ";";
                    }
               }
               this.DAFFileID = iResult;
            } else {
                this.$message.error("file id is null!");
            }
        },
        returnToLastNav: function() {
            this.$emit("close");
            //this.$router.go(-1);
        },
        saveValueToServer: function() {
            var achData = this.buildServerData_AchievementHistory();
            var requestUrl = Utility.dfServiceUrl + "/SaveAchievement/";
            if(this.Status == "NEW") {
                requestUrl += "NEW";
            } else {
                requestUrl += "UPDATE";
            }

            var requestData = {
                                data: achData
                            };
            this.ShowLoadingView();

            this.axios.post(requestUrl, requestData).then((response) => {
                this.HideLoadingView();

                if(response.data && response.data.SaveAchievementResult 
                && response.data.SaveAchievementResult.Status == "success") {
                    this.Status = "UPDATE";
                    this.IsEdit =  false;
                    this.$message("Save success!");
                    this.$emit('refresh');
                } else if(response.data && response.data.SaveAchievementResult) {
                    this.$message.error(response.data.SaveAchievementResult.Message);
                } else {
                    this.$message.error("Save failed!");
                }
            }).catch((error) => {
                this.HideLoadingView();
                this.$message.error(error.message);
            });

        },
        loadAttachmentlistFromServer: function() {
            //Load data   //TODO
            //then show file link
        },
        buildServerData_AchievementHistory: function() {
            var result = {
                id : this.id ? this.id : 0,
                dealer_id: this.dealerID,
                Year: this.selectedYear,

                Q1_Rate: this.Q1_Rate,
                Q1_TargetNum: this.Q1_TargetNum,
                Q1_SalesNum: this.Q1_SalesNum,
                Q1_FinishRate: this.Q1_FinishRate,
                Q1_IsReachTarget: this.Q1_IsReachTarget,
                Q1_Discount: this.Q1_DiscountNum,
                Q1_DiscountContract: this.Q1_DiscountContract,
                Q1_OINO: this.Q1_OINO,
                Q1_UsedMoney: this.Q1_UsedMoney,

                Q2_Rate: this.Q2_Rate,
                Q2_TargetNum: this.Q2_TargetNum,
                Q2_SalesNum: this.Q2_SalesNum,
                Q2_FinishRate: this.Q2_FinishRate,
                Q2_IsReachTarget: this.Q2_IsReachTarget,
                Q2_Discount: this.Q2_DiscountNum,
                Q2_DiscountContract: this.Q2_DiscountContract,
                Q2_OINO: this.Q2_OINO,
                Q2_UsedMoney: this.Q2_UsedMoney,

                Q3_Rate: this.Q3_Rate,
                Q3_TargetNum: this.Q3_TargetNum,
                Q3_SalesNum: this.Q3_SalesNum,
                Q3_FinishRate: this.Q3_FinishRate,
                Q3_IsReachTarget: this.Q3_IsReachTarget,
                Q3_Discount: this.Q3_DiscountNum,
                Q3_DiscountContract: this.Q3_DiscountContract,
                Q3_OINO: this.Q3_OINO,
                Q3_UsedMoney: this.Q3_UsedMoney,

                Q4_Rate: this.Q4_Rate,
                Q4_TargetNum: this.Q4_TargetNum,
                Q4_SalesNum: this.Q4_SalesNum,
                Q4_FinishRate: this.Q4_FinishRate,
                Q4_IsReachTarget: this.Q4_IsReachTarget,
                Q4_Discount: this.Q4_DiscountNum,
                Q4_DiscountContract: this.Q4_DiscountContract,
                Q4_OINO: this.Q4_OINO,
                Q4_UsedMoney: this.Q4_UsedMoney,

                Total_TargetNum: this.Total_TargetNum,
                Total_SalesNum: this.Total_SalesNum,
                Total_FinishRate: this.Total_FinishRate,
                Total_IsReachTarget: this.Total_IsReachTarget,
                Total_Discount: this.Total_DiscountNum,
                Total_DiscountContract: this.Total_DiscountContract,
                Total_OINO: this.Total_OINO,
                Total_UsedMoney: this.Total_UsedMoney,

                FileID_DAF: this.DAFFileID,
                Remark: this.Remark,
                IsDeleted: this.IsDeleted
            };
            return result;
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

</style>