export default class NumberFormat {
    static formatCurrency(value, currency) {
        value = value ? value : 0
        let currencyFormat = currency ? new Intl.NumberFormat("en-US", { style: "currency", currency: currency }) : new Intl.NumberFormat("en-US")

        return currencyFormat.format(value)
    }

    static format(value) {
        return new Intl.NumberFormat().format(value)
    }
}