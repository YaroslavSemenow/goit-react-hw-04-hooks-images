import { TailSpin } from 'react-loader-spinner';
import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.wrap}>
      <TailSpin height="100" width="100" color="#505050" ariaLabel="loading" />
    </div>
  );
}
