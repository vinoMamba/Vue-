//需求1：n不能小于0
let data = {}
data._n = 0
Object.defineProperty(data, 'n', {
    get() {
        return this._n
    },
    set(value) {
        if (value < 0) return
        this._n = value
    }
})

console.log(data.n)
data.n = -1
console.log(data.n)


