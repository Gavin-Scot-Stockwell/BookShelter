import sequelize from '../config/connection.js';
import { VolunteerFactory } from './volunteer.js';
import { WorkFactory } from './work.js';
import { UserFactory } from './user.js';
import { BookFactory } from './Book.js';

const Volunteer = VolunteerFactory(sequelize);
const Work = WorkFactory(sequelize);
const User = UserFactory(sequelize);
const Book = BookFactory(sequelize);

Volunteer.hasMany(Work, { foreignKey: 'assignedVolunteerId' });
Work.belongsTo(Volunteer, { foreignKey: 'assignedVolunteerId', as: 'assignedVolunteer' });

export { Volunteer, Work, User, Book };
