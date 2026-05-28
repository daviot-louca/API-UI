const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const messages = db.define(

   "messages",

   {

      id:{

         primaryKey:true,

         autoIncrement:true,

         type:DataTypes.INTEGER
      },

      message:{

         type:DataTypes.TEXT,

         allowNull:false
      },

      ticketId:{

         type:DataTypes.INTEGER,

         allowNull:false
      },

      userId:{

         type:DataTypes.INTEGER,

         allowNull:false
      },

      isRead:{

         type:DataTypes.BOOLEAN,

         defaultValue:false
      }
   },

   {

      timestamps:true
   }
);

module.exports = messages;