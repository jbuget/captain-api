module.exports = (sequelize, DataTypes) => {

  const Resource = sequelize.define('resource', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headers: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    body: {
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

  }, {
    tableName: 'resources',
    underscored: true,
  });

  Resource.associate = (models) => {
    Resource.belongsTo(models.team);
  };

  return Resource;

};
