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
    window.common = {
        getQuery: getQuery
    }
})()