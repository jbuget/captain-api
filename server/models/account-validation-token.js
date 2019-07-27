module.exports = (sequelize, DataTypes) => {

  const AccountValidationToken = sequelize.define('AccountValidationToken', {

    // attributes
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'token',
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'used',
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

  }, {
    tableName: 'account-validation-tokens'
  });

  return AccountValidationToken;

};
