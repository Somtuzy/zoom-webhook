const middleare = {}

middleware.generateToken = (req, res, next) => {
    try{
        let signature = ''
        const iat = Math.round(new Date().getTime() / 1000)
        const  exp = iat * 60 * 60 * 2

        const aHeader = { alg: "HS256", typ: "JWT" }

        
    } catch(err) {

    }
}

module.exports = middleware