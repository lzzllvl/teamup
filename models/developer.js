module.exports = (sequelize, DataTypes) => {
  var Developer = sequelize.define('Developer', {
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
    skills: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {timestamps: true})
  return Developer;
}