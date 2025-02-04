import { useState, useEffect, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { WorkData } from "../interfaces/WorkData";
import { deleteWork, retrieveWorks } from "../api/workAPI";

const MainPage = () => {
  const [ workArray, setWorkArray ] = useState<WorkData[]>([]);
  const [ dataCheck, setDataCheck ] = useState(true);

  const fetchWork = async () => {
    try {
      const data = await retrieveWorks();
      setWorkArray(data);
    } catch (err) {
      console.error('Failed to retrieve work:', err);
    }
  };

  useEffect(() => {
    if(dataCheck) {
      fetchWork();
    } else {
      setDataCheck(false);
    }
  }, [dataCheck]);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const workId = Number(event.currentTarget.value);
    if (!isNaN(workId)) {
      try {
        const data = await deleteWork(workId);
        fetchWork();
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className="main-list">
      <div>
        <Link to='/show-volunteers'>Click here to see Volunteers!</Link>
      </div>
      {dataCheck ? (
        <div className="work-list">
          {workArray.map((work) => (
            <div key={work.id} className='work-details'>
              <h3>{work.name}</h3>
              <h4>{work.status}</h4>
              <div>{work.description}</div>
              <div>{work.assignedVolunteer?.volunteerName}</div>
              <Link to={'/edit-work'} state={{id: work.id}}>
                <button>Edit</button>
              </Link>
              <button 
                value={String(work.id)}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          No volunteer work available!
        </div>
      )
    }
    </div>
  )
};

export default MainPage;
