import React from 'react'
import { List, Datagrid, Filter, TextInput, CreateButton, RefreshButton, UrlField, SelectField } from 'admin-on-rest'
import { CardActions } from 'material-ui/Card'
import CustomEditButton from './customEditButton'
import { FullMap } from './scores/scoreMap'

const ScoresFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='q' type='url' defaultValue='https://example.com' alwaysOn />
  </Filter>
)

const ScoresActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
  <CardActions>
    {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
    <CreateButton basePath='score' />
    <RefreshButton />
  </CardActions>
)

export const ScoreList = (props) => (
  <List title='View or Update Scores' {...props} filters={<ScoresFilter />} actions={<ScoresActions />} perPage={25}>
    <Datagrid>
      <UrlField source='id' label='URI' />
      <SelectField label='Audience' source='score' choices={FullMap()} />
      <CustomEditButton endpoint='score' />
    </Datagrid>
  </List>
)
