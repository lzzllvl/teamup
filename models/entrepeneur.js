module.exports = (sequelize, DataTypes) => {
  var Entrepeneur = sequelize.define('Entrepeneur', {

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