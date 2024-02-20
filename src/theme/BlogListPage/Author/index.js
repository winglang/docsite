import React from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

const Author = ({ authors }) => {
  return (
    <div className="avatar">
      {authors && authors.length > 1 ? (
        <>
          <a href={authors[0].url} target="_blank">
            <img
              className="avatar__photo"
              src={authors[0].imageURL}
              alt={authors[0].name}
            />
          </a>
          <a href={authors[1].url} target="_blank">
            <img
              className="avatar__photo"
              src={authors[1].imageURL}
              alt={authors[1].name}
            />
          </a>
        </>
      ) : (
        <>
          {authors[0]?.imageURL && authors[0]?.name && authors[0]?.url && (
            <>
              <img className="avatar__photo" src={authors[0].imageURL} alt={authors[0].name} />
              <div className="avatar__intro">
                <div className="avatar__name">
                  <Link to={authors[0].url} className={styles.authorUrl}>
                    {authors[0]?.name}
                  </Link>
                </div>
                <small className={`avatar__subtitle ${styles.avatarSubtitle}`}>
                  {authors[0]?.title}
                </small>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Author;
