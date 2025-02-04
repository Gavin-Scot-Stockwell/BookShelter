import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateVolunteers, retrieveVolunteer } from '../api/volunteerAPI';
import { VolunteerData } from '../interfaces/VolunteerData';

const EditVolunteer = () => {
  const [volunteer, setVolunteer] = useState<VolunteerData | undefined>();

  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchVolunteer = async (volunteerId: VolunteerData) => {
    try {
      const data = await retrieveVolunteer(volunteerId.id);
      setVolunteer(data);
    } catch (err) {
      console.error('Failed to retrieve ticket:', err);
    }
  }

  useEffect(() => {
    fetchVolunteer(state);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (volunteer && volunteer.id !== null){
      updateVolunteers(volunteer.id, volunteer);
      navigate('/');
    }
    else{
      console.error('Ticket data is undefined.');
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVolunteer((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <div className='form-container'>
        {
          volunteer ? (
            <form className='form' onSubmit={handleSubmit}>
              <h1>Edit Volunteer</h1>
              <label htmlFor='tName'>Volunteer Name</label>
              <input
                id='tName'
                name='volunteerName'
                value={volunteer.volunteerName || ''}
                onChange={handleChange}
                />
              <button type='submit'>Update</button>
            </form>
          ) : (
            <div>Issues fetching ticket</div>
          )
        }
      </div>  
    </>
  );
};

export default EditVolunteer;
