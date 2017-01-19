export default class FilterModel
{
    constructor (baseCurrency,currency) {
        this._baseCurrency  = baseCurrency
        this._currency = currency
     
    }
    set baseCurrency  (baseCurrency)  { this._baseCurrency = baseCurrency               }
    get baseCurrency  ()       { return this._baseCurrency                }
    set currency (currency) { this._urrency = currency             }
    get currency ()       { return this._currency               }
  
}