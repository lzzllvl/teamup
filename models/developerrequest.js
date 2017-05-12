module.exports = (sequelize, DataTypes) => {
  var DeveloperRequest = sequelize.define('DeveloperRequest', {
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
  return DeveloperRequest;
}