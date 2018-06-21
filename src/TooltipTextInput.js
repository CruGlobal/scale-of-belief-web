import React from 'react'
import TextField from 'material-ui/TextField'

const TooltipTextInput = ({ input, label, meta: { touched, error }, className, ...custom }) => (
  <div style={{width: '256px'}} data-tip>
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      className={className}
      {...input} />
  </div>
)

TooltipTextInput.defaultProps = {
  addField: true
}

export default TooltipTextInput
