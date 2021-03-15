//需求1：n不能小于0
const data = {}
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

console.log(data.n) //0
data.n = -1
console.log(data.n) //0


//需求2：如果直接修改data._n还是可以修改数据，使用代理解决这个问题

const data2 = proxy({ data: { n: 0 } })

//代理
function proxy(options) {
    const { data } = options
    const obj = {}
    Object.defineProperty(obj, 'n', {
        get() {
            return data.n
        },
        set(value) {
            if (value < 0) return
            data.n = value
        }
    })
    return obj
}

console.log(data2.n) //0
data2.n = -1
console.log(data2.n) //0