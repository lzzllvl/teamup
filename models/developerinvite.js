//many to many relationship tables
module.exports = (sequelize, DataTypes) => {
  var DeveloperInvite = sequelize.define('DeveloperInvite', {
    // developer_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'developer',
    //   referencesKey: 'id'
    // },
    // project_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'project',
    //   referencesKey: 'id'
    // },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    message: {
      type: DataTypes.TEXT,
      
    }
  }, {timestamps: true})
  return DeveloperInvite;
}