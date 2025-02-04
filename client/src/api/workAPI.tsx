import { WorkData } from "../interfaces/WorkData";
import { ApiMessage } from "../interfaces/ApiMessage";

const retrieveWorks = async () => {
  try {
    const response = await fetch('/api/works', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    if(!response.ok) {
      throw new Error('invalid work API response, check network tab!');
    }

    return data;
  } catch(err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

const retrieveWork = async (id: number | null) => {
  try {
    const response = await fetch(`/api/works/${id}`, {
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
    return Promise.reject('Could not fetch work');
  }
};

const createWork = async (body: WorkData):Promise<WorkData> => {
  try {
    const response = await fetch(
      '/api/works/', {
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
    console.log('Error from Work Creation: ', err);
    return Promise.reject('Could not create new work');
  }
};

const updateWork = async (id: number, body: WorkData ):Promise<WorkData> => {
  try {
    const response = await fetch(
      `/api/works/${id}`, {
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

const deleteWork = async (workId: number | null): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting work', err);
    return Promise.reject('Could not delete work');
  }
};

export { retrieveWork, retrieveWorks, createWork, updateWork, deleteWork };
