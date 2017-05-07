//many to many relationship table
module.exports = (sequelize, DataTypes) => {
  var ProjectInvestor = sequelize.define('ProjectInvestor', {
    // investor_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'investor',
    //   referencesKey: 'id'
    // },
    // project_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'project',
    //   referencesKey: 'id'
    // }
  }, {timestamps: false})
  return ProjectInvestor;
}