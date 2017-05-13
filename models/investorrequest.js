module.exports = (sequelize, DataTypes) => {
  var InvestorRequest = sequelize.define('InvestorRequest', {
    // investor_id: {
    //   type: DataTypes.INTEGER,
    //   references: 'investor',
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
  return InvestorRequest;
}