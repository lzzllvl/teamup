//many to many relationship tables
module.exports = (sequelize, DataTypes) => {
  var ProjectDeveloper = sequelize.define('ProjectDeveloper', {
    // developer_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'developer',
    //   referencesKey: 'id'
    // },
    // project_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'project',
    //   referencesKey: 'id'
    // }
  }, {timestamps: false})
  return ProjectDeveloper;
}