module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
    },
    
    name: {
      type: DataTypes.STRING,
    },   

    email: {
      type: DataTypes.STRING,
    },  
    
    password: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
    underscored: true,
    classMethods: {
      associate(models) {
        User.belongsTo(models.relative, {
          foreignKey: 'foreign_id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        });
      },
    },
  });
  return User;
};
