import React from 'react'
import Chip from 'material-ui/Chip'
import PropTypes from 'prop-types'
import get from 'lodash.get'

/**
 * Render multiple Chips from an array of values. Modified from http://www.material-ui.com/#/components/chip
 */
class ChipArray extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.transformData(get(props.record, props.source))
    this.styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }
  }

  transformData = (original) => {
    let transformed = {}
    let transformedArray = []

    for (let i = 0; i < original.length; i++) {
      transformedArray.push({ key: i, label: original[i] })
    }

    transformed.chipData = transformedArray

    return transformed
  }

  renderChip (data) {
    return (
      <Chip
        key={data.key}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    )
  }

  render () {
    return (
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    )
  }
}

const ChipArrayField = ({ source, record = {} }) => new ChipArray({record: record, source: source}).render()

ChipArrayField.propTypes = {
  source: PropTypes.string.isRequired,
  record: PropTypes.any,
  addLabel: PropTypes.bool,
  label: PropTypes.string
}

ChipArrayField.defaultProps = {
  addLabel: true
}
export default ChipArrayField
