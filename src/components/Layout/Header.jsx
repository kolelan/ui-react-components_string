import React from 'react';
import styles from './Layout.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Tap Component Tester</h1>
            <p>Тестирование компонента отображения нажатия на струну</p>
        </header>
    );
};

export default Header;