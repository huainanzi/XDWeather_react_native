class DateUtils{
    static tranferDate(date){
        let value = new Date(parseInt(date) * 1000);
        return value.getHours().toString() + ':00';
    }
    static getDate(date){
        let value = new Date(parseInt(date) * 1000);
        return {
            year:value.getFullYear(),
            month:value.getMonth()+1,
            day:value.getDate(),
            hour:value.getHours(),
            minite:value.getMinutes,
        };
    }
    static getWeek(date){
        const weeks = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        let value = new Date(parseInt(date) * 1000);
        let weekNumber = value.getDay();
        return weeks[weekNumber];
    }
}

export default DateUtils;