import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push as pushAction } from 'react-router-redux'

class ListScoresButton extends Component {
  handleClick = () => {
    const { push, record } = this.props
    push('/scores?filter=' + encodeURIComponent('{"q":"' + record.id + '"}'))
  }

  render() {
      return <FlatButton label="List" onClick={this.handleClick} />
  }
}

ListScoresButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object
}

export default connect(null, {
  push: pushAction
})(ListScoresButton)
