import { FunctionComponent } from 'react';

import logo from '../../../assets/logo.svg';

import styles from './styles.module.css';

const Header: FunctionComponent = () => {
    return (
        <header className={styles.header}>
            <img src={logo} alt='logo' className={styles.header_logo} />
            <h1 className={styles.header_title}>Tasks List</h1>
        </header>
    )
};

export default Header;