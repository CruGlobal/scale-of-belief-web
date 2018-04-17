import React, { Component } from 'react'
import { GET_ONE } from 'admin-on-rest'
import restClient from '../restClient'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push as pushAction } from 'react-router-redux'
import ContentCreate from 'material-ui/svg-icons/content/create'

class EditAPIUserButton extends Component {
  handleClick = () => {
    const { record, push } = this.props
    restClient(GET_ONE, 'api-user', { id: record.id })
      .then(() => {
        push('/api-user/' + encodeURIComponent(record.id))
      })
      .catch((e) => {
          console.error(e)
      })
  }

  render() {
      return <FlatButton label="Edit" icon={<ContentCreate />} onClick={this.handleClick} />
  }
}

EditAPIUserButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object
}

export default connect(null, {
  push: pushAction
})(EditAPIUserButton)
