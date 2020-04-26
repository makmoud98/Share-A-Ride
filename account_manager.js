class AccountManager {
    constructor() {
        this.accounts = []
    }
    getAll() {
        return this.accounts
    }
    add(account) {
        account.setAid(this.accounts.length)
        this.accounts.push(account)
    }
    get(aid) {
        for(var i = 0; i < this.accounts.length; i++) {
            if(this.accounts[i].aid == aid) {
                return this.accounts[i]
            }
        }
        throw "aid doesnt exist"
    }
    update(aid, account) {
        for(var i = 0; i < this.accounts.length; i++) {
            if(this.accounts[i].aid == aid) {
                this.accounts[i] = account
                return
            }
        }
        throw "aid doesnt exist"
    }
}

module.exports.accountManager = new AccountManager()
