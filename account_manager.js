class AccountManager {
    constructor() {
        this.accounts = []
    }
    add(account) {
        account.aid = this.accounts.length
        this.accounts.push(account)
        return account
    }
    get(aid) {
        var matches = this.accounts.filter((acnt)=>{
            return acnt.aid == aid
        })
        // return first match
        if (matches.length) return matches[0]
        else return false 
    }
    update(aid, account) {
        var index = this.accounts.findIndex((acnt)=>{
            return acnt.aid == aid
        })
        if (index >= 0){
            this.accounts.splice(index, 1, Object.assign({}, this.accounts[index], account))
            return this.accounts[index]
        }
        else return false
    }
    delete(aid) {
        var index = this.accounts.findIndex((acnt)=>{
            return acnt.aid == aid
        })
        if (index >= 0){
            this.accounts.splice(index, 1)
            return true 
        }
        else return false
    }
}

module.exports.accountManager = new AccountManager()