import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push as pushAction } from 'react-router-redux'
import ContentCreateIcon from 'material-ui/svg-icons/content/create'

class CreateScoreButton extends Component {
  handleClick = () => {
    const { push, record } = this.props
    push('/score/create?id=' + encodeURIComponent(record.id))
  }

  render () {
    return <FlatButton label='Create' icon={<ContentCreateIcon />} onClick={this.handleClick} />
  }
}

CreateScoreButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object
}

export default connect(null, {
  push: pushAction
})(CreateScoreButton)
