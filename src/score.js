import React from 'react'
import { Show, SimpleShowLayout, TextField, DisabledInput, TextInput, Edit, SimpleForm, RefreshButton, ShowButton, EditButton, Create, UrlField, RadioButtonGroupInput } from 'admin-on-rest'
import { CardActions } from 'material-ui/Card'
import ListScoresButton from './scores/ListScoresButton'

const ShowScoreActions = ({ basePath, data }) => (
  <CardActions>
    <EditButton basePath={basePath} record={data} />
    <ListScoresButton record={data} />
    <RefreshButton />
  </CardActions>
)

export const ScoreShow = (props) => (
  <Show title='Single Score' actions={<ShowScoreActions />} {...props}>
    <SimpleShowLayout>
      <UrlField source='id' label='URI' />
      <TextField source='score.unaware' label='Unaware' />
      <TextField source='score.curious' label='Curious' />
      <TextField source='score.follower' label='Follower' />
      <TextField source='score.guide' label='Guide' />
      <TextField source='score.confidence' label='Confidence' />
    </SimpleShowLayout>
  </Show>
)

const EditScoreActions = ({ basePath, data }) => (
  <CardActions>
    <ShowButton basePath={basePath} record={data} />
    <ListScoresButton record={data} />
    <RefreshButton />
  </CardActions>
)

const validateScore = (record) => {
  const errors = {}

  const score = record.score

  if (!record.id) {
    errors.id = ['URI is required']
  }

  if (!score) {
    errors.score = {unaware: ['Score values are required']}
    return errors
  }

  if (!score.unaware || score.unaware < 1 || score.unaware > 6) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.unaware = ['Score must be between 1 and 6']
  }
  if (!score.curious || score.curious < 1 || score.curious > 6) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.curious = ['Score must be between 1 and 6']
  }
  if (!score.follower || score.follower < 1 || score.follower > 6) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.follower = ['Score must be between 1 and 6']
  }
  if (!score.guide || score.guide < 1 || score.guide > 6) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.guide = ['Score must be between 1 and 6']
  }
  if (!score.confidence || score.confidence < 0 || score.confidence > 100) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.confidence = ['Confidence must be between 0 and 100']
  }

  return errors
}

const scoreChoices = [
  { id: '1', name: 'Highly Uninterested' },
  { id: '2', name: 'Moderately Uninterested' },
  { id: '3', name: 'Somewhat Uninterested' },
  { id: '4', name: 'Somewhat Interested' },
  { id: '5', name: 'Moderately Interested' },
  { id: '6', name: 'Highly Interested' }
]

export const ScoreEdit = (props) => (
  <Edit title='Edit Score' actions={<EditScoreActions />} {...props}>
    <SimpleForm redirect='show' validate={validateScore}>
      <DisabledInput label='URI' source='id' />
      <RadioButtonGroupInput label='Unaware' source='score.unaware' choices={scoreChoices} />
      <RadioButtonGroupInput label='Curious' source='score.curious' choices={scoreChoices} />
      <RadioButtonGroupInput label='Follower' source='score.follower' choices={scoreChoices} />
      <RadioButtonGroupInput label='Guide' source='score.guide' choices={scoreChoices} />
      <TextInput label='Confidence' source='score.confidence' />
    </SimpleForm>
  </Edit>
)

const CreateScoreActions = ({ basePath, data }) => (
  <CardActions>
    <ListScoresButton record={data || {id: 'https://cru.org'}} />
    <RefreshButton />
  </CardActions>
)

export const ScoreCreate = (props) => (
  <Create title='Create Score' actions={<CreateScoreActions />} {...props}>
    <SimpleForm redirect='show' validate={validateScore}>
      <TextInput label='URI' source='id' />
      <RadioButtonGroupInput label='Unaware' source='score.unaware' choices={scoreChoices} />
      <RadioButtonGroupInput label='Curious' source='score.curious' choices={scoreChoices} />
      <RadioButtonGroupInput label='Follower' source='score.follower' choices={scoreChoices} />
      <RadioButtonGroupInput label='Guide' source='score.guide' choices={scoreChoices} />
      <TextInput label='Confidence' source='score.confidence' />
    </SimpleForm>
  </Create>
)
