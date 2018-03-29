import React from 'react'
import { List, Datagrid, TextField, Filter, TextInput } from 'admin-on-rest'

const ScoresFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
  </Filter>
)

export const ScoreList = (props) => (
    <List title="Existing Scores" {...props} filters={<ScoresFilter />}>
        <Datagrid>
            <TextField source="id" label='URI' />
            <TextField source="score.unaware" label='Unaware' />
            <TextField source="score.curious" label='Curious' />
            <TextField source="score.follower" label='Follower' />
            <TextField source="score.guide" label='Guide' />
            <TextField source="score.confidence" label='Confidence' />
        </Datagrid>
    </List>
)