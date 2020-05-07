module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      publications_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
    {
      timestamps: false,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.Publication, {
      foreignKey: "publications_id",
      as: "post",
    });

    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Comment;
};
