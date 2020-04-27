class MessageManager {
    constructor() {
        this.messages = []
    }

    add(message) {
        message.setMid(this.messages.length)
        this.messages.push(message)
    }

    get(mid) {
        var matches = this.messages.filter((message)=>{
            return message.mid == mid
        })
        return matches[0]
    }

    getByRid(rid) {
        var matches = this.messages.filter((message)=>{
            return message.rid == rid
        })
        return matches
    }
}

module.exports.messageManager = new MessageManager()