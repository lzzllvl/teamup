module.exports = (sequelize, DataTypes) => {
  var Investor = sequelize.define('Investor', {
    investment_minimum: {
      type: DataTypes.INTEGER,
    },
    investment_maximum: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Investor.belongsTo(models.User);
        // Associating Investor with Invite and requests
        Investor.hasMany(models.InvestorInvite, {
          onDelete: "cascade",
          constraints: false
        });
        Investor.hasMany(models.InvestorRequest, {
          onDelete: "cascade",
          constraints: false
        });
        Investor.hasMany(models.ProjectInvestor, {
          constraints: false
        });
      }
    }
  });
  return Investor;
}