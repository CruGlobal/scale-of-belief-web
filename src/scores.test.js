import React from 'react'
import ReactDOM from 'react-dom'
import { ScoreList } from './scores'
import { Resource } from 'admin-on-rest'

describe('List', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='scores' list={ScoreList} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
