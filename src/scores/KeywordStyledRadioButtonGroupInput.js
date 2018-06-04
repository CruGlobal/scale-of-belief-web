import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { translate } from 'admin-on-rest'

/**
 * This component is basically a copy of RadioButtonGroupInput from admin-on-rest, with customized labeling logic.
 * In particular, this component applies a class to a specific keyword within a label for the given radio button group.
 */
export class KeywordStyledRadioButtonGroupInput extends Component {
    handleChange = (event, value) => {
      this.props.input.onChange(value)
    }

    renderRadioButton = choice => {
      const {
        optionText,
        optionValue,
        translate,
        translateChoice
      } = this.props
      const choiceName = React.isValidElement(optionText) // eslint-disable-line no-nested-ternary
        ? React.cloneElement(optionText, { record: choice })
        : typeof optionText === 'function'
          ? optionText(choice)
          : get(choice, optionText)
      return (
        <RadioButton
          key={get(choice, optionValue)}
          label={
            translateChoice ? (
              translate(choiceName, { _: choiceName })
            ) : (
              choiceName
            )
          }
          value={get(choice, optionValue)}
        />
      )
    }

    render () {
      const {
        label,
        source,
        input,
        choices,
        options,
        elStyle,
        keyword,
        keywordClass
      } = this.props

      const defaultLabelStyle = {
        lineHeight: '22px',
        transform: 'scale(0.95) translate(0px, -6px)',
        transformOrigin: 'left top 0px',
        pointerEvents: 'none',
        userSelect: 'none',
        marginTop: '20px',
        display: 'block',
        color: 'rgba(0, 0, 0, 0.3)'
      }

      const labelPieces = label.split(' ')
      let modifiedLabel = ''

      for (var index in labelPieces) {
        let labelPiece = labelPieces[index]
        if (labelPiece === keyword) {
          labelPiece = '<span class="' + keywordClass + '">' + keyword + '</span>'
        }

        modifiedLabel += labelPiece + ' '
      }

      modifiedLabel = modifiedLabel.trim()

      return (
        <div>
          <label style={defaultLabelStyle}>
            <span dangerouslySetInnerHTML={{__html: modifiedLabel}} />
          </label>
          <RadioButtonGroup
            name={source}
            defaultSelected={input.value}
            valueSelected={input.value}
            style={elStyle}
            {...options}
          >
            {choices.map(this.renderRadioButton)}
          </RadioButtonGroup>
        </div>
      )
    }
}

KeywordStyledRadioButtonGroupInput.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.object),
  elStyle: PropTypes.object,
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.object,
  optionText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ]).isRequired,
  optionValue: PropTypes.string.isRequired,
  resource: PropTypes.string,
  source: PropTypes.string,
  translate: PropTypes.func.isRequired,
  translateChoice: PropTypes.bool.isRequired,
  keyword: PropTypes.string,
  keywordClass: PropTypes.string
}

KeywordStyledRadioButtonGroupInput.defaultProps = {
  addField: true,
  choices: [],
  options: {},
  optionText: 'name',
  optionValue: 'id',
  translateChoice: true
}

export default translate(KeywordStyledRadioButtonGroupInput)
