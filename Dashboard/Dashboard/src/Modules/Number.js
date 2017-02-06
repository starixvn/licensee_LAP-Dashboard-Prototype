export default class NumberFormat {
    static DecFormat(currency, value) {
        value = value ? value : 0
        var currencyFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: currency })

        return currencyFormat.format(value)
    }
}