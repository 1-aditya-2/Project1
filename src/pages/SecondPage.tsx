import React from 'react';
import GridComponent from '../components/comp1';
import DepartmentList from '../components/comp2';
import styles from "../styles/second.module.css";

const SecondPage: React.FC = () => {
  return (
    <div>
      <center><h1>Second Page</h1></center>
      <div className={styles.grid}>
        <h2>Data Grid ( Component 1 )</h2>
        <GridComponent />
      </div>
      <div className={styles.list}>
        <h2>Department List (Component 2 )</h2>
        <DepartmentList />
      </div>
    </div>
  );
};

export default SecondPage;
