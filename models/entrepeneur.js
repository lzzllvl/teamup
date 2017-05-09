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
      type: DataTypes.TEXT('medium')
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Entrepeneur.belongsTo(models.User);
        // Associating Entrepeneur with Project
        Entrepeneur.hasMany(models.Project, {
          onDelete: "cascade"
        });
      }
    }
  })
  return Entrepeneur;
}