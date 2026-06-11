module.exports = (sequelize, DataTypes) => {
  const Footer = sequelize.define(
    'Footer',
    {
      Data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      tableName: 'footers',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Footer;
};
