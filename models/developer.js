module.exports = (sequelize, DataTypes) => {
  var Developer = sequelize.define('Developer', {
    skills: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // Associating Developer with Invite and requests
        Developer.belongsTo(models.User);


        Developer.hasMany(models.DeveloperInvite, {
          onDelete: "cascade"
        });
        Developer.hasMany(models.DeveloperRequest, {
          onDelete: "cascade"
        });
      }
    }
  });
  return Developer;
}