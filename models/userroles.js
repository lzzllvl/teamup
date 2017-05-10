module.exports = (sequelize, DataTypes) => {
  var UserRoles = sequelize.define("userroles", {

  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        UserRoles.belongsTo(models.User);
        UserRoles.belongsTo(models.Role);
      }
    }
  });
  return UserRoles;
}