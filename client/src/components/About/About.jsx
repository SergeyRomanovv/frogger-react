import React from 'react';
import style from './style.module.css';

export default function About({ setAbout, about }) {
    const closeHandler = () => {
        setAbout(!about);
    };

    return (
        <div className={style.mainBox}>
            <div className={style.contentBox}>
                <div className={style.textBox}>
                    <p style={{fontSize: 20}}>Hello! My name is Sergey Romanov</p>
                    <p>I'm a frontend developer</p>
                    <div className={style.contactsBox}>
                        <div className={style.linkBtn}>
                             <a href='https://github.com/SergeyRomanovv'> My GitHub</a>
                        </div>
                        <div className={style.linkBtn}>
                            <a href='https://t.me/SergeyRomanovDev'>My Telegram</a>
                        </div>
                    </div>
                    <p>
                        My stack: React, Redux, NodeJS, PostgreSQL, Sequelize
                    </p>
                    <div onClick={closeHandler} className={style.closeBtn}>
                        <img src="./x-circle.svg" />
                    </div>
                </div>

                <div className={style.stackBox}>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original-wordmark.svg"
                            title="React"
                            alt="React"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/redux/redux-original.svg"
                            title="Redux"
                            alt="Redux "
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/nodejs/nodejs-original-wordmark.svg"
                            title="CSS3"
                            alt="CSS"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/postgresql/postgresql-original-wordmark.svg"
                            title="Postgre-sql"
                            alt="Postgre-sql"
                            width="70"
                            height="70"
                        />
                    </div>
                    <div className={style.iconBackground}>
                        <img
                            src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/sequelize/sequelize-original-wordmark.svg"
                            title="Sequelize"
                            alt="Sequelize"
                            width="70"
                            height="70"
                        />
                    </div>
                </div>
                <div className={style.projectBox}>
                    <h3>My projects</h3>
                    <p style={{textAlign: 'center'}}>
                        Site for conducting online parties in tabletop role-playing games with map builder, video chat
                    </p>
                    <div className={style.pLinkBtn}>
                        <a href="https://dnd-deploy.herokuapp.com/">
                            Dungeon Online
                        </a>
                    </div>
                    <p>Site to search anime by screenshot and view anime rating</p>
                    <div className={style.pLinkBtn}>
                        <a href="https://anime-ep-finder.herokuapp.com/">
                            Anime EP Finder
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
