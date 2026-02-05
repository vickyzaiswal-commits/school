module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define('ContactUs', {
    Data: {
      type: DataTypes.JSON,
      allowNull: false
      // unique: true
    },
    
  });


  return ContactUs;
};