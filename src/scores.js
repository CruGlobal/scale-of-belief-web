import React from 'react'
import { List, Datagrid, TextField, Filter, TextInput, CreateButton, RefreshButton, UrlField, SelectField } from 'admin-on-rest'
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

const scoreChoices = [
  { id: 1, name: 'Highly Uninterested' },
  { id: 2, name: 'Moderately Uninterested' },
  { id: 3, name: 'Somewhat Uninterested' },
  { id: 4, name: 'Somewhat Interested' },
  { id: 5, name: 'Moderately Interested' },
  { id: 6, name: 'Highly Interested' }
]

export const ScoreList = (props) => (
  <List title='Existing Scores' {...props} filters={<ScoresFilter />} actions={<ScoresActions />}>
    <Datagrid>
      <UrlField source='id' label='URI' />
      <SelectField label='Unaware' source='score.unaware' choices={scoreChoices} />
      <SelectField label='Curious' source='score.curious' choices={scoreChoices} />
      <SelectField label='Follower' source='score.follower' choices={scoreChoices} />
      <SelectField label='Guide' source='score.guide' choices={scoreChoices} />
      <TextField source='score.confidence' label='Confidence' />
      <CustomEditButton endpoint='score' />
    </Datagrid>
  </List>
)
