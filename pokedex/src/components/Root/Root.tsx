import styles from './Root.module.css'; 
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <header>
        <nav className={styles.topnavigation}>
          <ul>
            <li>Home</li>
            <li>Pokemon</li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
    
  );
}
export default Root;