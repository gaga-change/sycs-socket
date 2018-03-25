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
        API: '/api'
    }
})()