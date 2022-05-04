import * as React from 'react';
import { useState } from 'react';
import styles from './Products.module.scss';

export default function Product({ product }) {
  
  const [open, setOpen] = useState(false);

  function click() {
    setOpen(true);
  }

  return (
    <div className={styles.column}>
      <h2>{product.Title}</h2>
      { open
          ? <img width="200" height="140" src={product.ImageUrl.Url}></img>
          : <h1 onClick={click}>{product.Code}</h1>
      }
    </div>
  );
}
