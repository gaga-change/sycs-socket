(function () {
    function getQuery() {
        let url = location.search
        let query = url.split('?')[1]
        let ret = {}
        if (query) {
            let keyVal = query.split('&')
            keyVal.forEach((item) => {
                let key = item.split('=')[0]
                let val = item.split('=')[1]
                if(key) ret[key] = val            
            })
        }
        return ret
    }
    // LS缓存级
    function LS (key, data) {
        if (data) {
            localStorage.setItem(key, JSON.stringify(data))
        } else {
            let d = localStorage.getItem(key)
            if (d) return JSON.parse(d)
            else return null
        }
    }
    function turnKey(obj) {
        let newObj = {}
        for(let key in obj) {
            newObj[_turn(key)] = obj[key]
        }
        function _turn(key) {
            return key.replace(/\_(\w)/g, function (all, letter) {
                return letter.toUpperCase()
            })
        }
        return newObj
    }
    window.common = {
        getQuery,
        turnKey,
        API: '/api',
        LS
    }
})()