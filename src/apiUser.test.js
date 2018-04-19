import React from 'react'
import ReactDOM from 'react-dom'
import { ApiUserShow, ApiUserEdit, ApiUserCreate } from './apiUser'
import { Resource } from 'admin-on-rest'

describe('Show', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='api-user' show={ApiUserShow} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe('Edit', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='api-user' edit={ApiUserEdit} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe('Create', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='api-user' create={ApiUserCreate} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
