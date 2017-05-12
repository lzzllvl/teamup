module.exports = (sequelize, DataTypes) => {
  var Developer = sequelize.define('Developer', {
    skills: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // Associating Developer with Invite and requests
        Developer.belongsTo(models.User);

        Developer.hasMany(models.DeveloperInvite, {
          onDelete: "cascade",
          constraints: false
        });
        Developer.hasMany(models.DeveloperRequest, {
          onDelete: "cascade",
          constraints: false
        });
        Developer.hasMany(models.ProjectDeveloper, {
          constraints: false
        });
      }
    }
  });
  return Developer;
}