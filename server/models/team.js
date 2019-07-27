module.exports = (sequelize, DataTypes) => {

  const Team = sequelize.define('Team', {

    // attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at',
    },

  }, {
    tableName: 'teams'
  });


  Team.associate = (models) => {
    Team.belongsToMany(models.User, { as: 'members', through: models.Membership, foreignKey: 'team_id' });
  };

  return Team;
};
