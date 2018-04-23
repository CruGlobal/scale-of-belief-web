import React from 'react'
import ReactDOM from 'react-dom'
import { ApiUsersList } from './apiUsers'
import { Resource } from 'admin-on-rest'

describe('List', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='api-users' list={ApiUsersList} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
