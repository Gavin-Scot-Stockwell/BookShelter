import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { BookFactory } from './Book.js';

const User = UserFactory(sequelize);
const Book = BookFactory(sequelize);

export { User, Book };
