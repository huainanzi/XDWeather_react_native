class TempUtils{
    static tranferTemp(temp){
        value = temp - 273.15;
        return Math.round(value);
    }
}

export default TempUtils;