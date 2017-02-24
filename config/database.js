// config/database.js

//Future: Move everything to a config.json and load it and retrieve this details.
var databaseName = "mdvrase";

module.exports = {
    'connection': {
        'host': 'localhost',
        'user': 'root',
        'password': '',
        'database': databaseName
    },
    'database': databaseName,
    'users_table': 'usuarios'
};