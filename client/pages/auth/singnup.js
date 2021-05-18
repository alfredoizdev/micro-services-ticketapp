import { useState } from "react";

const Singnup = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setCredential({
      ...credential,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = credential;
    reset();
  };

  const reset = () => {
    setCredential({ email: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Singnup</h2>
      <div className='form-group'>
        <label>Email address</label>
        <input
          name='email'
          className='form-control'
          value={credential.email}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          name='password'
          className='form-control'
          type='password'
          value={credential.password}
          onChange={handleChange}
        />
      </div>
      <button className='btn btn-primary' type='submit'>
        Sign Up
      </button>
    </form>
  );
};

export default Singnup;
