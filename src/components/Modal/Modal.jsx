import { Component } from 'react';
import style from './Modal.module.css';

class Modal extends Component {
  state = {};

  render() {
    return (
      <div className={style.overlay}>
        <div className={style.modal}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
