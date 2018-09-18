const Sequelize = require('sequelize');
//const User = require('./models/User')

const sequelize = new Sequelize('sqlreact', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    //storage: 'path/to/database.sqlite'
});

//Test database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    userName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
User.sync()
/*User.sync({ force: true }).then(() => {
    // Table created
    return User.create({
        userName: 'John',
        password: 'Hancock'
    });
});*/

module.exports = sequelize
module.exports = User
