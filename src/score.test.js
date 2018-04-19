import React from 'react'
import ReactDOM from 'react-dom'
import { ScoreShow, ScoreEdit, ScoreCreate } from './score'
import { Resource } from 'admin-on-rest'

describe('Show', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='score' show={ScoreShow} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe('Edit', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='score' edit={ScoreEdit} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe('Create', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Resource name='score' create={ScoreCreate} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
