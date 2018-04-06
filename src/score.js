import React from 'react'
import { DisabledInput, TextInput, Edit, SimpleForm } from 'admin-on-rest'

export const ScoreEdit = (props) => (
  <Edit title='Edit Score' {...props}>
    <SimpleForm>
      <DisabledInput label = 'URI' source='id' />
      <TextInput label='Unaware' source='score.unaware' />
      <TextInput label='Curious' source='score.curious' />
      <TextInput label='Follower' source='score.follower' />
      <TextInput label='Guide' source='score.guide' />
      <TextInput label='Confidence' source='score.confidence' />
    </SimpleForm>
  </Edit>
)