module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('user', {

    // attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'CREATED',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

  }, {
    tableName: 'users',
    underscored: true,
  });

  User.associate = (models) => {
    User.belongsToMany(models.team, { as: 'teams', through: models.membership });
  };

  return User;

};
