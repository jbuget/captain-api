module.exports = (sequelize, DataTypes) => {

  const Membership = sequelize.define('Membership', {

    // attributes
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role',
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
    tableName: 'memberships'
  });

  return Membership;
};
