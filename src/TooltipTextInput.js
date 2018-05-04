import React from 'react'
import TextField from 'material-ui/TextField'

const TooltipTextInput = ({ input, label, meta: { touched, error }, ...custom }) => (
  <div style={{width: '256px'}} data-tip>
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input} />
  </div>
)

TooltipTextInput.defaultProps = {
  addField: true
}

export default TooltipTextInput
