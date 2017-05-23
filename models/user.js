'use strict';
const crypto = require('crypto')
const uuid = require('uuid/v1')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    encryptedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt : DataTypes.STRING,
    authToken: DataTypes.STRING,
    authTokenExpiration: DataTypes.DATE,
    salt: DataTypes.STRING
  },{
    setterMethods:{
      // Virtual method for password
      // Password does not exist in the database, but rather
      // it is transformed to the 'encryptedPassword' value and stored as that
      password(value){
        if(value){
          const salt = uuid()
          this.setDataValue('salt', salt)
          const hash = this.encrypt(value)
          this.setDataValue('encryptedPassword', hash)
        }
      }
    }
  },{
    instanceMethods:{
      encrypt(value){
        const salt = this.get('salt')
        return crypto.createHmac('sha512', salt)
          .update(value)
          .digest('hex')
      },
    }
  },
    {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
