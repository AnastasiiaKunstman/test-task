import { FC } from 'react';

import styles from './syles.module.css';

const Footer: FC = () => {
    return (
        <footer className={`container ${styles.footer}`}>
            <p className={styles.footer_content}>Anastasiia Kunstman © {new Date().getFullYear()}</p>
        </footer>
    )
};

export default Footer