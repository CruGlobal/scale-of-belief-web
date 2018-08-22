import React from 'react'
import { List, Datagrid, UrlField, TextInput, Filter } from 'admin-on-rest'
import CreateScoreButton from './scores/CreateScoreButton'
import ModalContainer from './ModalContainer'

const ContentFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='q' defaultValue='https://example.com' alwaysOn />
  </Filter>
)

export const ContentList = (props) => (
  <div>
    <ModalContainer />
    <List title='Create New Scores' {...props} filters={<ContentFilter />} perPage={25}>
      <Datagrid>
        <UrlField source='id' label='URI' />
        <CreateScoreButton />
      </Datagrid>
    </List>
  </div>
)
