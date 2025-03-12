import React from 'react';
import Link from 'next/link';
import styles from './FilterTag.module.scss';

interface FilterTagProps {
  name: string;
  type: 'ingredient' | 'country' | 'category';
  value: string;
}

const FilterTag: React.FC<FilterTagProps> = ({ name, type, value }) => {
  const getHref = () => {
    switch (type) {
      case 'ingredient':
        return `/?ingredient=${value}`;
      case 'country':
        return `/?country=${value}`;
      case 'category':
        return `/?category=${value}`;
      default:
        return '/';
    }
  };

  return (
    <Link href={getHref()} className={styles.tag}>
      {name}
    </Link>
  );
};

export default FilterTag; 