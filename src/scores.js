import React from 'react'
import { List, Datagrid, /* TextField, */ Filter, TextInput, CreateButton, RefreshButton, UrlField, SelectField } from 'admin-on-rest'
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
  { id: 0, name: 'Hostile' },
  { id: 1, name: 'Content' },
  { id: 2, name: 'Contextualized' },
  { id: 3, name: 'Curious' },
  { id: 4, name: 'Seeker' },
  { id: 5, name: 'New Believer' },
  { id: 6, name: 'Learning Basics' },
  { id: 7, name: 'Follower' },
  { id: 8, name: 'Learning to Share Faith' },
  { id: 8, name: 'Engaged Disciple' },
  { id: 10, name: 'Guide' }
]

export const ScoreList = (props) => (
  <List title='Existing Scores' {...props} filters={<ScoresFilter />} actions={<ScoresActions />}>
    <Datagrid>
      <UrlField source='id' label='URI' />
      <SelectField label='Audience' source='score' choices={scoreChoices} />
      { /* <TextField source='score.confidence' label='Confidence' /> */ }
      <CustomEditButton endpoint='score' />
    </Datagrid>
  </List>
)
