import React, { Component } from 'react'
import { GET_ONE } from 'admin-on-rest'
import restClient from './restClient'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push as pushAction } from 'react-router-redux'
import ContentCreate from 'material-ui/svg-icons/content/create'

class CustomEditButton extends Component {
  handleClick = () => {
    const { record, push, endpoint } = this.props
    restClient(GET_ONE, endpoint, { id: record.id })
      .then(() => {
        push('/' + endpoint + '/' + encodeURIComponent(record.id))
      })
      .catch((e) => {
          console.error(e)
      })
  }

  render() {
      return <FlatButton label="Edit" icon={<ContentCreate />} onClick={this.handleClick} />
  }
}

CustomEditButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  endpoint: PropTypes.string
}

export default connect(null, {
  push: pushAction
})(CustomEditButton)
