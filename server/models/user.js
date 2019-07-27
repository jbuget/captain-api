module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {

    // attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'status',
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
    tableName: 'users'
  });

  User.associate = (models) => {
    User.belongsToMany(models.Team, { as: 'teams', through: models.Membership, foreignKey: 'user_id'  });
  };

  return User;

};
