import { Volunteer } from '../models/index.js';

export const seedVolunteers = async () => {
  await Volunteer.bulkCreate([
    {
      volunteerName: 'Paul'
    }, 
    {
      volunteerName: 'Jae'
    }, 
    {
      volunteerName: 'Jessica'
    },
    {
      volunteerName: 'Jennifer'
    }
  ], { individualHooks: true})
}
