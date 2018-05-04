import React from 'react'
import { SelectArrayInput } from 'admin-on-rest'

const TooltipSelectArrayInput = (props, options) => (
  <div style={{width: '256px'}} data-tip>
    <SelectArrayInput
      {...props}
      choices={props.choices} />
  </div>
)

TooltipSelectArrayInput.defaultProps = {
  addField: true
}

export default TooltipSelectArrayInput
