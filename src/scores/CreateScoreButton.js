import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ContentCreateIcon from 'material-ui/svg-icons/content/create'
import ScoreCreate from './CreateScoreModal'
import * as actions from '../actions'

class CreateScoreButton extends Component {
  handleClick = () => {
    const { dispatch, record } = this.props
    return dispatch(actions.openModal({
      id: record.id,
      type: 'custom',
      content: <ScoreCreate resource='score' location={window.location} item={record} />,
      onClose: () => {},
      closeText: 'Cancel'
    }))
  }

  render () {
    return <FlatButton label='Create' icon={<ContentCreateIcon />} onClick={this.handleClick} />
  }
}

CreateScoreButton.propTypes = {
  record: PropTypes.object
}

export default connect(
  null,
  function mapDispatchToProps (dispatch) {
    return {
      dispatch
    }
  }
)(CreateScoreButton)
