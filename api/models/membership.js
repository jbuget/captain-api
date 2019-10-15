module.exports = (sequelize, DataTypes) => {

  const Membership = sequelize.define('membership', {

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role',
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
    tableName: 'memberships',
    underscored: true,
  });

  return Membership;
};
