import { ApiMessage } from "../interfaces/ApiMessage";
import { VolunteerData } from "../interfaces/VolunteerData";

const retrieveVolunteers = async () => {
  try {
    const response = await fetch('/api/volunteers', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid volunteer API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }  
};

const retrieveVolunteer = async (id: number | null): Promise<VolunteerData> => {
  try {
    const response = await fetch(`/api/volunteers/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if(!response.ok) {
      throw new Error('invalid volunteer API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch volunteer');
  }
};

const createVolunteer = async (body: VolunteerData): Promise<VolunteerData> => {
  try {
    const response = await fetch(
      '/api/volunteers/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
      }

    )
    const data = response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from Volunteer Creation: ', err);
    return Promise.reject('Could not create Volunteer');
  }
};

const updateVolunteers = async (id: number, body: VolunteerData): Promise<VolunteerData> => {
  try {
    const response = await fetch(
      `/api/volunteers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteVolunteer = async (id: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/volunteers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting volunteer', err);
    return Promise.reject('Could not delete volunteer');
  }
};

export { retrieveVolunteer, retrieveVolunteers, createVolunteer, updateVolunteers, deleteVolunteer };
