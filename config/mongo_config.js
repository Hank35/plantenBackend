
var env = {
    webPort: process.env.Port || 3000,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || 'admin',
    dbPassword: process.env.DB_PASSWORD || '153IC8x5fqwVaiKm',
    dbDatabase: process.env.DB_DATABASE || 'planten'
}

var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase

var dburl_dev = "mongodb+srv://admin:153IC8x5fqwVaiKm@cluster0.vtp8l.mongodb.net/planten?retryWrites=true&w=majority"


module.exports = {
     env,
     dburl,
     dburl_dev,
     
};