import styles from './Sidebar.module.css'
import AppNav from './AppNav';
import Logo from './Logo'
import {Outlet} from 'react-router-dom'

function Sidebar() {
    return (
      <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={styles.footer}>
            <p className={styles.copyright}></p>
            &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </footer>
      </div>
    );
}

export default Sidebar
