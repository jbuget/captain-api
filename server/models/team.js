module.exports = (sequelize, DataTypes) => {

  const Team = sequelize.define('team', {

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
    Team.belongsToMany(models.user, { as: 'members', through: models.membership });
  };

  return Team;
};
