var moment = require('moment');
var array = require('array');

module.exports = {
    defaultDateFormat: 'YYYY-MM-DD',
    dfServiceUrl: '/_vti_bin/Zeiss.SpotDealer/DealerFileService.svc',
    fileServiceUrl: '../FileHandler.ashx',
    cdServiceUrl: "/_vti_bin/Zeiss.SpotDealer/DealerService.svc", //contract dealer svc url 
    formatDateToString: function(dateObj) {
        if (dateObj == null) {
            return "";
        }
        if (moment.isDate(dateObj)) {
            var mData = moment(dateObj);
            return mData.format(this.defaultDateFormat);
        } else if (dateObj.indexOf('/Date(') > -1) {
            var i = dateObj.indexOf('+');
            var dateNum = new Number(dateObj.substring(6, i));
            var mData;
            if (i == 16) {
                mData = moment.unix(dateNum)
            } else {
                mData = moment(dateNum);
            }
            return mData.format(this.defaultDateFormat);
        }
        return "";
    },
    formatDateToServerObj: function(data) {
        var fsDate = null;
        if (moment.isDate(data)) {
            fsDate = "/Date(" + moment(data).unix() + ")/";
        }
        return fsDate;
    },
    loadYearSelectList: function() {
        curYear = moment().year() % 100;
        yearArr = new array();

        for (var i = curYear + 1; i > curYear - 9; i--) {
            var itemText = "FY" + (i - 1) + "/" + i;
            yearArr.push({
                label: itemText,
                value: itemText
            });
        }

        return yearArr.toArray();
    },
    loadContractTypeList: function() {
        return [{
            label: "经销商协议 Dealer Agreement",
            value: "DealerAgreement"
        }, {
            label: "经销商考察期协议 Dealer Probation Agreement",
            value: "DealerProbationAgreement"
        }];
    },
    loadSTUnitList: function() {
        return [{
            label: "元",
            value: "RMB"
        }, {
            label: "台",
            value: "TAI"
        }, {
            label: "个",
            value: "GE"
        }]; //meicuo, wo jiushi wenmang!
    },
    loadDealerRegionList: function() {
        return [{
            label: "Dental",
            value: "Dental"
        }, {
            label: "MCS East",
            value: "MCS_East"
        }, {
            label: "MCS Middle",
            value: "MCS_Middle"
        }, {
            label: "MCS NorthCentral",
            value: "MCS_NorthCentral"
        }, {
            label: "MCS Northeast",
            value: "MCS_Northeast"
        }, {
            label: "MCS South",
            value: "MCS_South"
        }, {
            label: "MCS Southwest",
            value: "MCS_Southwest"
        }, {
            label: "OPH East",
            value: "OPH_East"
        }, {
            label: "OPH North",
            value: "OPH_North"
        }, {
            label: "OPH Southwest",
            value: "OPH_Southwest"
        }, {
            label: "National",
            value: "National"
        }, {
            label: "Service",
            value: "Service"
        }];
    },
    buildServerData_BasicInfo: function(data) {
        var fsDate = this.formatDateToServerObj(data.First_SignDate);
        var result = {
            Appointed_Products: data.Appointed_Products,
            DealerAddress: data.DealerAddress,
            DealerStatus: data.DealerStatus,
            Distribution_Area: data.Distribution_Area,
            Exceptions_Hospital: data.Exceptions_Hospital,
            First_SignDate: fsDate,
            IsDeleted: data.IsDeleted,
            PersonInChargeAccount: data.PersonInChargeAccount,
            Remark: data.Remark,
            SalesProductType: data.SalesProductType,
            SalesRegion: data.SalesRegion,
            Sign_Times: data.Sign_Times,
            dealerCode: data.dealerCode,
            dealerName_CN: data.dealerName_CN,
            dealerName_EN: data.dealerName_EN,
            dealerName_Other: data.dealerName_Other,
            dealerRegion: data.dealerRegion,
            dealer_id: data.dealer_id,
            salesTarget: data.salesTarget
        }
        return result;
    }

}