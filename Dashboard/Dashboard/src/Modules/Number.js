export default class NumberFormat {
    static formatCurrency(value = 0, currency) {
        const currencies = {
            "EUR": "€",
            "GBP": "£",
            "USD": "$",
            "CNY": "¥",
            "MYR": "RM",
            "THB": "฿",
            "IDR": "Rp"
        }
        currency = currencies[currency] ? currencies[currency] : ''

        return `${currency}${this.format(value, 2)}`
    }

    static formatDecimal(value) {
        return this.format(value, 2)
    }

    static format(value, digits = 0) {
        return value.toFixed(digits).replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,")
    }
}