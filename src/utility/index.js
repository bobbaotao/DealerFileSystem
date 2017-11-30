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

        for (var i = curYear + 5; i < curYear - 5; i--) {
            var itemText = "FY" + (i - 1) + "/" + i;
            year.push({
                label: itemText,
                value: itemText
            });
        }

        return yearArr.toArray();
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