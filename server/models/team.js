module.exports = (sequelize, DataTypes) => {

  const Team = sequelize.define('Team', {

    // attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: 'teams',
    underscored: true,
  });

  Team.associate = (models) => {
    Team.belongsToMany(models.User, { as: 'members', through: models.Membership });
  };

  return Team;
};
