import React, { Component } from 'react'
import { GET_ONE } from 'admin-on-rest'
import restClient from '../restClient'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push as pushAction } from 'react-router-redux'

class EditScoreButton extends Component {
  handleClick = () => {
    const { record, push } = this.props
    restClient(GET_ONE, 'score', { id: record.id })
      .then(() => {
        push('/score/' + encodeURIComponent(record.id))
      })
      .catch((e) => {
          console.error(e)
          push('/scores?filter={' + encodeURIComponent(record.id) + '}')
      })
  }

  render() {
      return <FlatButton label="Edit" onClick={this.handleClick} />
  }
}

EditScoreButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object
}

export default connect(null, {
  push: pushAction
})(EditScoreButton)
