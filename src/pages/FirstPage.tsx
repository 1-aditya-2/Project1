import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/first.module.css";

const FirstPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userDetails = {
      name: name,
      phone: phone,
      email: email,
    };

    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    navigate('/second');
  };

  return (
    <div >
      <center><h1>First Page</h1></center>
      <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <fieldset>
        <input type="text" value={name} placeholder="Your Name *" onChange={(e) => setName(e.target.value)} required />
        <input type="number" value={phone} placeholder="Your Phone No *" onChange={(e) => setPhone(e.target.value)} required />
        <input type="email" value={email} placeholder="Your Email *" onChange={(e) => setEmail(e.target.value)} required />
        </fieldset>
        <button type="submit" value="apply">Submit</button>
      </form>
      </div>

</div>
  );
};

export default FirstPage;
