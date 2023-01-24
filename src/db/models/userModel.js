const {Model, DataTypes, Sequelize} = require('sequelize')
const  bcrypt = require('bcrypt')
const USER_TABLE = 'users'
const userSchema ={

    id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      role:{
        allowNull: false,
        type:DataTypes.STRING,
        defaultValue: 'admin'
      },

      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      recoveryToken: {
        allowNull: true,
        type: DataTypes.STRING,
        field:'recovery_token'
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }

}


class User extends Model{

    static associate() {}


    static config(sequelize) {

      return  {
        sequelize,
        tableName: USER_TABLE,
        modelName:'User',
        timestamps: false,
        hooks:{
          beforeCreate: async (user, options)=>{
            const password = await bcrypt.hash(user.password, 10)
            user.password= password

          }
        }

      }
    }

}

module.exports={User, USER_TABLE, userSchema }
