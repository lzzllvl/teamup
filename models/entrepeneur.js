module.exports = (sequelize, DataTypes) => {
  var Entrepeneur = sequelize.define('Entrepeneur', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    social: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio : {
      type: DataTypes.TEXT('medium'),
      allowNull: false
    }
  }, {timestamps: true})
  return Entrepeneur;
}