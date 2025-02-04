import { useState, useEffect } from "react";
import { VolunteerData } from "../interfaces/VolunteerData";
import { retrieveVolunteers, deleteVolunteer } from "../api/volunteerAPI";
import VolunteerCard from "../components/VolunteerCard";
import { Link } from "react-router-dom";
import { ApiMessage } from "../interfaces/ApiMessage";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState<VolunteerData[]>([]);

  const fetchVolunteers = async () => {
    try {
      const data = await retrieveVolunteers();
      setVolunteers(data);
    } catch (err) {
      console.error('Failed to retrieve volunteers', err);
    }
  };

  const deleteIndvVolunteer = async (volunteerId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteVolunteer(volunteerId);
      fetchVolunteers();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  useEffect(() => {
    fetchVolunteers();
  }, []);
  return (
    <div className='volunteer'>
      <div className='new-volunteer'>
        <Link to='/new-volunteer'>Click to add a new volunteer!</Link>
      </div>
      <div className='volunteer-list'>
        {volunteers ? volunteers.map((volunteer) => (
            <VolunteerCard 
              key={volunteer.id}
              id={volunteer.id}
              name={volunteer.volunteerName}
              deleteIndvVolunteer={deleteIndvVolunteer}
            />
          )
        ) : (
            <div>
              Could not retrieve Volunteers to display! Please check again later. 
            </div>
          )
        }
      </div>
    </div>
  );
};


export default VolunteerPage;
