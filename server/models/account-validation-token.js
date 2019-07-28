module.exports = (sequelize, DataTypes) => {

  const AccountValidationToken = sequelize.define('accountValidationToken', {

    // attributes
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'account-validation-tokens',
    underscored: true,
  });

  AccountValidationToken.associate = (models) => {
    AccountValidationToken.belongsTo(models.user);
  };

  return AccountValidationToken;

};
