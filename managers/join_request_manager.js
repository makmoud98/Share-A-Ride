class JoinRequestManager {
    constructor() {
        this.requests = []
    }

    add(request) {
        request.setJid(this.requests.length)
        this.requests.push(request)
    }

    get(jid) {
        var matches = this.requests.filter((request)=>{
            return request.jid == jid
        })
        return matches[0]
    }

    getByAid(aid) {
        var matches = this.requests.filter((request)=>{
            return request.aid == aid
        })
        return matches
    }

    getByRid(rid) {
        var matches = this.requests.filter((request)=>{
            return request.rid == rid
        })
        return matches
    }
}

module.exports.joinRequestManager = new JoinRequestManager()
module.exports.JoinRequestManager = JoinRequestManager