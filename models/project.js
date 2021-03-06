module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('Project',
    {
      project_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      full_description: {
        type: DataTypes.TEXT,
        
      },
      short_description: {
        type: DataTypes.TEXT('tiny'),

      },
      needs_developer: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },
      needs_investor: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },
      offer_investor_text: {
        type: DataTypes.TEXT
      },
      offer_developer_text: {
        type: DataTypes.TEXT
      },
      offer_to_investor: {
        type: DataTypes.DECIMAL
      },
      offer_from_investor: {
        type: DataTypes.INTEGER(8)
      },
      offer_to_developer: {
        type: DataTypes.INTEGER(3)
      },
      offer_from_developer: {
        type: DataTypes.INTEGER(8)
      },
      project_scope: {
        type: DataTypes.TEXT
      },
      project_industry: {
        type: DataTypes.STRING
      },
      // owner_id: {
      //   type: DataTypes.INTEGER,
      //   references: 'entrepeneur',
      //   referencesKey: 'id'
      // }
    },
    {
      timestamps: false,
      classMethods: {
        associate: function(models) {
          // Associating Developer with Invite and requests
          Project.hasMany(models.ProjectDeveloper, {
            onDelete: "cascade",
            constraints: false
          });
          Project.hasMany(models.ProjectInvestor, {
            onDelete: "cascade",
            constraints: false
          });
          Project.hasMany(models.DeveloperInvite, {
            onDelete: "cascade",
            constraints: false
          });
          Project.hasMany(models.DeveloperRequest, {
            onDelete: "cascade",
            constraints: false
          });
          Project.hasMany(models.InvestorInvite, {
            onDelete: "cascade",
            constraints: false
          });
          Project.hasMany(models.InvestorRequest, {
            onDelete: "cascade",
            constraints: false
          });
        }
      }
    });

    return Project;
}