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


//需求3： 如下注释可绕过代理.如果绕过代理就进行拦截
/**
 * const xxx=  {n:0}
 * const data = proxy({data:xxx})
 * xxx.n =  -1
 */

const dataValue = { n: 0 }
const data3 = proxy2({ data: dataValue })

function proxy2({ data }) {
    //增加监听
    const value = data.n
    delete data.n //可以不写
    Object.defineProperty(data, 'n', {
        get() {
            return value
        },
        set(newValue) {
            if (newValue < 0) return
            data.n = newValue
        }
    })
    //代理
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