import * as React from 'react';
import styles from './Products.module.scss';
import Product from './Product';

export default function Products({description, products}) {
  return (
    <div className={ styles.products }>
      <div className={ styles.container }>
        <h1>{description}</h1>
        <div className={styles.row}>
          { products.map( p => <Product product={p} key={p.ID}></Product>) }
        </div>
      </div>
    </div>
  );
}