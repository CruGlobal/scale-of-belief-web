import React from 'react'
import { Show, SimpleShowLayout, DisabledInput, Edit, SimpleForm, RefreshButton, ShowButton, EditButton, Create, UrlField, SelectField, SelectInput } from 'admin-on-rest'
import { CardActions } from 'material-ui/Card'
import ListScoresButton from './scores/ListScoresButton'
import ReactTooltip from 'react-tooltip'
import TooltipTextInput from './TooltipTextInput'
import { FullMap, PartialMap } from './scores/scoreMap'

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
      <SelectField label='Audience' source='score' choices={FullMap()} />
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

  if (score === undefined) {
    errors.score = ['Score values are required']
    return errors
  }

  if (score < 0 || score > 8) {
    errors.score = ['Audience must be one of the given options']
  }

  return errors
}

export const ScoreEdit = (props) => (
  <Edit title='Edit Score' actions={<EditScoreActions />} {...props}>
    <SimpleForm redirect='show' validate={validateScore}>
      <DisabledInput label='URI' source='id' />
      <SelectInput label='Audience' source='score' choices={PartialMap()} />
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
      <TooltipTextInput label='URI' source='id' />
      <ReactTooltip place='right' type='info' delayHide={1000} effect='solid'>
        <p>
          Events are identified in our system by their URI. For Web Pages, the URI is simply the full URL.<br />
          URIs for other types of products may need to be defined by the Growth Solutions Team.<br />
          If you are unsure about the structure of the URI for your event please contact the
          Growth Solutions Team at <a href='mailto:dps-growthsolutions@cru.org'>dps-growthsolutions@cru.org</a>.
        </p>
      </ReactTooltip>
      <SelectInput label='Audience' source='score' choices={PartialMap()} />
    </SimpleForm>
  </Create>
)
