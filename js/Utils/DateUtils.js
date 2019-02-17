class DateUtils{
    static tranferDate(date){
        let value = new Date(parseInt(date) * 1000);
        return value.getHours().toString() + ':00';
    }
}

export default DateUtils;