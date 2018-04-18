import React from 'react'
import { List, Datagrid, UrlField, TextInput, Filter } from 'admin-on-rest'

const ContentFilter = (props) => (
  <Filter {...props}>
      <TextInput label='Search' source='q' alwaysOn />
  </Filter>
)

export const ContentList = (props) => (
    <List title='Content Without Scores' {...props} filters={<ContentFilter />}>
        <Datagrid>
            <UrlField source='id' label='URI' />
        </Datagrid>
    </List>
)