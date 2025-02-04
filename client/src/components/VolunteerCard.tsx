import { Link } from "react-router-dom";
import {ApiMessage } from '../interfaces/ApiMessage'
import { MouseEventHandler } from "react";

interface VolunteerCardProps {
  id: number | null,
  name: string | null,
  deleteIndvVolunteer: (ticketId: number) => Promise<ApiMessage>
}

const VolunteerCard = ({id, name, deleteIndvVolunteer}:VolunteerCardProps) => {

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const volunteerId = Number(event.currentTarget.value);
    if (!isNaN(volunteerId)) {
      try {
        const data = await deleteIndvVolunteer(volunteerId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='v-card'>
      <h3>Volunteer ID: {id} </h3>
      <h4>Volunteer Name: {name}</h4>
      <button>
        <Link to="/edit-volunteer" state={{id: id}}>Edit</Link>
      </button>
      <button value={String(id)} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default VolunteerCard;
