module.exports = (sequelize, DataTypes) => {
  var Investor = sequelize.define('Investor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    social: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT('medium'),
      allowNull: false
    },
    investment_minimum: {
      type: DataTypes.INTEGER,
    },
    investment_maximum: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        // Associating Developer with Invite and requests
        Investor.hasMany(models.InvestorInvite, {
          onDelete: "cascade"
        });
        Investor.hasMany(models.InvestorRequest, {
          onDelete: "cascade"
        });
      }
    }
  });
  return Investor;
}