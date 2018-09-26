/*
 * Modified from https://github.com/hurkanyakay/react-redux-modals
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import FlatButton from 'material-ui/FlatButton'

class Modal extends Component {
  onClose () {
    if (this.props.item.onClose) {
      this.props.item.onClose()
      this.props.onClose(this.props.item)
    } else {
      this.props.onClose(this.props.item)
    }
  }
  onConfirm () {
    if (this.props.item.onConfirm) {
      this.props.item.onConfirm()
      this.props.onClose(this.props.item)
    }
  }
  render () {
    const { zIndex } = this.props
    const { type } = this.props.item
    if (type === 'confirmation') {
      const { text, confirmationText, closeText } = this.props.item
      return (
        <div className='modal-wrapper' style={{zIndex: (zIndex + 1) * 10}}>
          <div className='modal'>
            <div className='text'>{text}</div>
            <div className='buttons'>
              <button className='modal-button' onClick={() => this.onClose()}>{closeText || 'Close'}</button>
              <button className='modal-button' onClick={() => this.onConfirm()}>{confirmationText || 'Confirm'}</button>
            </div>
          </div>
        </div>
      )
    } else if (type === 'custom') {
      const { content, closeText } = this.props.item
      return (
        <div className='modal-wrapper' style={{zIndex: (zIndex + 1) * 10}}>
          <div className='modal'>
            <FlatButton secondary className='close' label={closeText || 'Close'} onClick={() => this.onClose()} />
            {content}
          </div>
        </div>
      )
    }
    return (
      <div />
    )
  }
}

class Modals extends Component {
  render () {
    let modals
    if (this.props.modals) {
      modals = this.props.modals.map((item, i) =>
        <Modal item={item} key={i} zIndex={i} onClose={(item) => this.props.closeModal(item)} />)
    }
    return (
      <div className={modals.length ? 'modals' : 'modals hidden'}>
        {modals}
      </div>
    )
  }
}

const ModalContainer = connect(
  function mapStateToProps (state) {
    return {
      modals: state.customReducer.modals
    }
  },
  function mapDispatchToProps (dispatch) {
    return bindActionCreators(actions, dispatch)
  }
)(Modals)

export default ModalContainer
