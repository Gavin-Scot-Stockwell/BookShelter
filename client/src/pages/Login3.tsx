import { useState, type FormEvent, type ChangeEvent } from 'react';

import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';



const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubmissionStatus("");
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h2>Returning User?</h2>
        <div className='form-group'>
          <label>Username: </label>
          <input
            className='form-input'
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Password: </label>
          <input
            className='form-input'
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary' type='submit'>
            Login
          </button>
          {submissionStatus === "error" && (<div className="text-error">Invalid credentials</div>)}
        </div>
      </form>
    </div>
  );
};

// export default Login;
