async function start() {
    return await Promise.resolve('asyns is working')
}

start().then(console.log)

class Util {
    static id = Date.now()
}

console.log('Util Id', Util.id)