import React, {useEffect} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';
import Author from '../Author';

const ListItem = ({ content }) => {
  const { frontMatter, metadata } = content;

  const {authors} = metadata;

  const imageUrl = frontMatter.image ?? '/img/default-blog-post-banner.png';

  return (
    <div className="col col--4" style={{ marginBottom: '20px' }}>
      <div className="col-demo">
        <div className="card-demo">
          <div className="card" style={{ border: '1px solid #ddd' }}>
            <div className={`card__image ${styles.cardImage}`}>
              <Link to={metadata.permalink}>
                <img
                  src={imageUrl}
                  alt={metadata.title}
                  title={metadata.title}
                />
              </Link>
            </div>
            <div className="card__body">
              <small>{metadata.formattedDate}</small>
              <Link to={metadata.permalink}>
                <h3 className={styles.title}>{metadata.title}</h3>
              </Link>
              <Author
                authors={authors}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
