import React from 'react'
import { Show, SimpleShowLayout, TextField, DisabledInput, TextInput, Edit, SimpleForm } from 'admin-on-rest'

export const ScoreShow = (props) => (
  <Show title='Single Score' {...props}>
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

export const ScoreEdit = (props) => (
  <Edit title='Edit Score' {...props}>
    <SimpleForm redirect='show'>
      <DisabledInput label = 'URI' source='id' />
      <TextInput label='Unaware' source='score.unaware' />
      <TextInput label='Curious' source='score.curious' />
      <TextInput label='Follower' source='score.follower' />
      <TextInput label='Guide' source='score.guide' />
      <TextInput label='Confidence' source='score.confidence' />
    </SimpleForm>
  </Edit>
)