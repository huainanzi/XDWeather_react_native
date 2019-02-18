class DateUtils{
    static tranferDate(date){
        let value = new Date(parseInt(date) * 1000);
        return value.getHours().toString() + ':00';
    }
    static getDate(date){
        let value = new Date(parseInt(date) * 1000);
        return {
            year:value.getFullYear(),
            month:value.getMonth(),
            day:value.getDay(),
            hour:value.getHours(),
            minite:value.getMinutes,
        };
    }
}

export default DateUtils;