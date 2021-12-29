import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classes from './header.module.css';

const Header: React.FC = () => {
    return (
        <header>
            <p className={classes.collaboratorLogo}>collaborator</p>
            <div className={classes.headerRight}>
                <div className={classes.circleDiv}></div>
                <FontAwesomeIcon
                    className={classes.faCaretDown}
                    icon={faCaretDown}
                />
            </div>
        </header>
    );
};

export default Header;
