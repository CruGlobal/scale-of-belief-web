import React from 'react'
import { Show, SimpleShowLayout, TextField, DisabledInput, TextInput, Edit, SimpleForm, RefreshButton, ShowButton, EditButton } from 'admin-on-rest'
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
      <TextField source='id' label='URI' />
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
    errors.score = ['Score values are required']
    return errors
  }

  if (score.unaware < 1 || score.unaware > 5) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.unaware = ['Score must be between 1 and 5']
  }
  if (score.curious < 1 || score.curious > 5) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.curious = ['Score must be between 1 and 5']
  }
  if (score.follower < 1 || score.follower > 5) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.follower = ['Score must be between 1 and 5']
  }
  if (score.guide < 1 || score.guide > 5) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.guide = ['Score must be between 1 and 5']
  }
  if (score.confidence < 0 || score.confidence > 100) {
    if (!errors.score) {
      errors.score = {}
    }
    errors.score.confidence = ['Confidence must be between 0 and 100']
  }

  return errors
}

export const ScoreEdit = (props) => (
  <Edit title='Edit Score' actions={<EditScoreActions />} {...props}>
    <SimpleForm redirect='show' validate={validateScore}>
      <DisabledInput label = 'URI' source='id' />
      <TextInput label='Unaware' source='score.unaware' />
      <TextInput label='Curious' source='score.curious' />
      <TextInput label='Follower' source='score.follower' />
      <TextInput label='Guide' source='score.guide' />
      <TextInput label='Confidence' source='score.confidence' />
    </SimpleForm>
  </Edit>
)