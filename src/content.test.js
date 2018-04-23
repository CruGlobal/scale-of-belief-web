import React from 'react'
import ReactDOM from 'react-dom'
import { ContentList } from './content'
import { Resource } from 'admin-on-rest'

describe('List', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='content' list={ContentList} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
