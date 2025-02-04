import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { WorkData } from "../interfaces/WorkData";
import { retrieveWork, updateWork } from "../api/workAPI";

const EditWork = () => {
  const [work, setWork] = useState<WorkData | undefined>();

  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchWork = async (workId: WorkData) => {
    try {
      const data = await retrieveWork(workId.id);
      setWork(data);
    } catch (err) {
      console.error('Failed to retrieve ticket:', err);
    }
  }

  useEffect(() => {
    fetchWork(state);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (work && work.id !== null){
      updateWork(work.id, work);
      navigate('/');
    }
    else{
      console.error('Ticket data is undefined.');
    }
  }

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWork((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWork((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <>
      <div className='form-container'>
        {
          work ? (
            <form className='form' onSubmit={handleSubmit}>
              <h1>Edit Work</h1>
              <label htmlFor='tName'>Work Name</label>
              <textarea
                id='tName'
                name='name'
                value={work.name || ''}
                onChange={handleTextAreaChange}
                />
              <label htmlFor='tStatus'>Work Status</label>
              <select
                name='status'
                id='tStatus'
                value={work.status || ''}
                onChange={handleChange}
              >
                <option  value='Todo'>Todo</option>
                <option  value='In Progress'>In Progress</option>
                <option  value='Done'>Done</option>
            </select>
            <label htmlFor='tDescription'>Work Description</label>
              <textarea
                id='tDescription'
                name='description'
                value={work.description || ''}
                onChange={handleTextAreaChange}
              />
              <button type='submit'>Submit Form</button>
            </form>
          ) : (
            <div>Issues fetching Work to Edit</div>
          )
        }
      </div>  
    </>
  )
};

export default EditWork;
