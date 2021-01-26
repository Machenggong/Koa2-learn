function pv(ctx) {
    global.console.log('pv:',ctx)
}

module.exports = function() {
    return async function(ctx,next) {
        pv(ctx)
        await next()
    }
}