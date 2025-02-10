import { DataTypes, type Sequelize, Model, type Optional } from "sequelize";

// The book attributes follow the properties the openlibrary api returns
interface BookAttributes {
  id: number;
  key: string;  // this is an openlibrary attribute that is unique for each book
  title: string;
  author: string;
  first_publish_year: number | null;  // this could be empty
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

export class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes {
  public id!: number;
  public key!: string;
  public title!: string;
  public author!: string;
  public first_publish_year!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function BookFactory(sequelize: Sequelize): typeof Book {
  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_publish_year: {
        type: DataTypes.INTEGER,
        allowNull: true, // Old books may not have a known year
      },
    },
    {
      tableName: "books",
      sequelize,
    }
  );

  return Book;
}
