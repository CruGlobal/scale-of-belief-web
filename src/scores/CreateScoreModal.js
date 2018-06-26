import React, { Component } from 'react'
import { Create, SimpleForm, SelectInput, CREATE, refreshView, showNotification } from 'admin-on-rest'
import ReactTooltip from 'react-tooltip'
import TooltipTextInput from '../TooltipTextInput'
import { PartialMap } from '../scores/scoreMap'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import restClient from '../restClient'

const validateScore = (record) => {
  const errors = {}
  const score = record.score

  if (!record.id) {
    errors.id = 'URI is required'
  }

  if (score === undefined) {
    errors.score = 'Score values are required'
    return errors
  }

  if (score < 0 || score > 8) {
    errors.score = 'Audience must be one of the given options'
  }

  return errors
}

class CreateScoreModal extends Component {
  onSubmit = async () => {
    const { dispatch, item, resource, form } = this.props
    const recordForm = form['record-form']

    if (!recordForm.syncErrors) {
      await restClient(CREATE, resource, {data: {id: item.id, score: recordForm.values.score}})
      await dispatch(refreshView())
      return dispatch(actions.closeModal({
        id: item.id,
        type: 'custom',
        onClose: () => {}
      }))
    } else {
      let errorMessage = recordForm.syncErrors.score || recordForm.syncErrors.id || ''
      return dispatch(showNotification(errorMessage, 'warning'))
    }
  }

  render () {
    const props = this.props

    return (
      <Create title='Create Score' {...props}>
        <SimpleForm validate={validateScore} handleSubmit={() => this.onSubmit}>
          <TooltipTextInput className='modalUri' label='URI' source='id' defaultValue={props.item.id} />
          <ReactTooltip place='right' type='info' delayHide={1000} effect='solid'>
            <p>
              Events are identified in our system by their URI. For Web Pages, the URI is simply the full URL.<br />
              URIs for other types of products may need to be defined by the Growth Solutions Team.<br />
              If you are unsure about the structure of the URI for your event please contact the
              Growth Solutions Team at <a href='mailto:dps-growthsolutions@cru.org'>dps-growthsolutions@cru.org</a>.
            </p>
          </ReactTooltip>
          <SelectInput label='Audience' source='score' choices={PartialMap()} />
        </SimpleForm>
      </Create>
    )
  }
}

CreateScoreModal.propTypes = {
  record: PropTypes.object,
  form: PropTypes.object
}

export default connect(
  function mapStateToProps (state, props) {
    return ({
      form: state.form
    })
  },
  function mapDispatchToProps (dispatch) {
    return {
      dispatch
    }
  }
)(CreateScoreModal)
