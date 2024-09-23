import React, {useEffect} from 'react';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';
import Author from '../Author';

const ListItem = ({ content }) => {
  const { frontMatter, metadata } = content;

  const {authors} = metadata;

  const formattedDate = new Date(metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const imageUrl = frontMatter.image ?? 'https://uploads-ssl.webflow.com/63720940a94e098b4e2a542b/65d32406856a3e7dd9629299_blog-banner-default2.png';

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
              <small>{formattedDate}</small>
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
