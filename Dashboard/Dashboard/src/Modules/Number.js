export default class NumberFormat
{
    static DecFormat(currency,value)
    {
        return value ? value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A";
    }
}