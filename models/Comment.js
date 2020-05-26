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
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
      publications_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },

    {
      timestamps: false,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Comment.belongsTo(models.Publication, {
      foreignKey: "publications_id",
    });
  };

  return Comment;
};
