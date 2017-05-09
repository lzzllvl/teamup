module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define("Role", {
    name: {
      type:DataTypes.STRING(5),
      allowNull: false,
      unique: true
    }
  }, {timestamps: false});
  return Role;
}