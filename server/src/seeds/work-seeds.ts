import { Work } from '../models/index.js';

export const seedWork = async () => {
  await Work.bulkCreate([
    {
      name: 'Help the elderly', status: 'TODO', description: 'Help grandma cross the street', assignedVolunteerId: 1
    },
    {
      name: 'Sell Lemonade', status: 'IN PROGRESS', description: 'Raise funds for Girl Scout', assignedVolunteerId: 2
    },
    {
      name: 'Pick up groceries', status: 'DONE', description: 'Help out with groceries for the community', assignedVolunteerId: 3
    },
    {
      name: 'Work at the soup kitchen', status: 'TODO', description: 'Help feed the homeless at the Soup Kitchen', assignedVolunteerId: 4
    },
    {
      name: 'Mow lawn', status: 'IN PROGRESS', description: 'Head to the communities and mow lawns for people in need', assignedVolunteerId: 2
    },
    {
      name: 'Take care of farm', status: 'DONE', description: 'feed the cows, pet the chickens, and sing with the pigs', assignedVolunteerId: 3
    },
    {
      name: 'Dog walk', status: 'TODO', description: 'Walk the dogs and praise the cats!', assignedVolunteerId: 4
    }
  ]);
};
