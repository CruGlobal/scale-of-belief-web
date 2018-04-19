import React from 'react'
import { List, Datagrid, TextField, Filter, TextInput, CreateButton, RefreshButton, UrlField } from 'admin-on-rest'
import { CardActions } from 'material-ui/Card'
import CustomEditButton from './customEditButton'

const ScoresFilter = (props) => (
  <Filter {...props}>
    <TextInput label='Search' source='q' type='url' defaultValue='http://example.com' alwaysOn />
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
  <List title='Existing Scores' {...props} filters={<ScoresFilter />} actions={<ScoresActions />}>
    <Datagrid>
      <UrlField source='id' label='URI' />
      <TextField source='score.unaware' label='Unaware' />
      <TextField source='score.curious' label='Curious' />
      <TextField source='score.follower' label='Follower' />
      <TextField source='score.guide' label='Guide' />
      <TextField source='score.confidence' label='Confidence' />
      <CustomEditButton endpoint='score' />
    </Datagrid>
  </List>
)
