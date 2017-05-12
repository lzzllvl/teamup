module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define("UserRole", {

  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        UserRole.belongsTo(models.User, {
          unique: true
        });
        UserRole.belongsTo(models.Role);
      }
    }
  });
  return UserRole;
}