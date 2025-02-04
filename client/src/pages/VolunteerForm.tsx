import { ChangeEvent, FormEvent, useState } from "react";
import { createVolunteer } from "../api/volunteerAPI";
import { VolunteerData } from "../interfaces/VolunteerData";
import { useNavigate } from "react-router-dom";

const VolunteerForm = () => {
  const [newVolunteer, setNewVolunteer] = useState<VolunteerData | undefined>({
    id: null,
    volunteerName: ''
  });

  const navigate = useNavigate();
  
  const createNewVolunteer = async (body: VolunteerData) => {
    try {
      const data = await createVolunteer(body);
      return data;
    } catch (err) {
      console.error('Failed to create volunteer', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVolunteer((prev) => (prev ? { ...prev, [name]: value } : undefined));
  }
    

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if(newVolunteer) {
      const data = createNewVolunteer(newVolunteer);
      console.log(data);
      navigate('/');
    }
  }

  return (
    <>
      <div className='form-container'>
        <form className='form' onSubmit=
        {handleSubmit}>
          <h1>Add New Volunteer</h1>
          <label>New Volunteer</label>
          <input 
            type="text"
            name="volunteerName"
            value={newVolunteer?.volunteerName || ''}
            onChange={handleChange}
          />
          <button type='submit' onSubmit={handleSubmit}>Create</button>
        </form>
      </div>
    </>
  );
}

export default VolunteerForm;
