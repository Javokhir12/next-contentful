import styles from '../styles/Skeleton.module.css';

function Skeleton() {
  return (
    <div className={styles['skeleton']}>
      <div className={styles['s-banner']}></div>
      <div className={styles['s-header']}></div>
      <div className={styles['s-content']}></div>
      <div className={styles['s-content']}></div>
      <div className={styles['s-content']}></div>
    </div>
  );
}

export default Skeleton;
