import React from 'react'
import { Show, SimpleShowLayout, TextField, DisabledInput, TextInput, Edit, SimpleForm, Create, SelectInput, SelectField, required, email, regex } from 'admin-on-rest'
import ChipArrayField from './chipArray'
import ReactTooltip from 'react-tooltip'
import TooltipSelectArrayInput from './TooltipSelectArrayInput'

export const ApiUserShow = (props) => (
  <Show title='API User' {...props}>
    <SimpleShowLayout>
      <TextField source='id' label='GUID' />
      <TextField source='user.contact_email' label='Email' />
      <ChipArrayField source='user.api_pattern' record='user.api_pattern' label='API Pattern' />
      <SelectField label='Type' source='user.type' choices={[
        { id: '', name: 'Normal User' },
        { id: 'super', name: 'Super Admin' }
      ]} />
    </SimpleShowLayout>
  </Show>
)

export const ApiUserEdit = (props) => (
  <Edit title='Edit API User' {...props}>
    <SimpleForm redirect='show'>
      <DisabledInput label='GUID' source='id' />
      <TextInput label='Email' source='user.contact_email' validate={[required, email]} />
      <TooltipSelectArrayInput label='API Pattern' source='user.api_pattern' />
      <ReactTooltip place='right' type='info' effect='solid'>
        <p>
          API Patterns are regular expressions, giving access to this user for specific URIs (e.g. ".*.cru.org.*").<br />
          You need to type "Enter" before the pattern will be recognized as added. You can add multiple patterns.
        </p>
      </ReactTooltip>
      <SelectInput label='' source='user.type' choices={[
        { id: '', name: 'Normal User' },
        { id: 'super', name: 'Super Admin' }
      ]} />
    </SimpleForm>
  </Edit>
)

const guidValidate = regex(/^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, 'Must be a valid GUID')

export const ApiUserCreate = (props) => (
  <Create title='Create API User' {...props}>
    <SimpleForm redirect='show'>
      <TextInput label='GUID' source='id' validate={[required, guidValidate]} parse={v => v.toLowerCase()} />
      <TextInput label='Email' source='user.contact_email' validate={[required, email]} />
      <TooltipSelectArrayInput label='API Pattern' source='user.api_pattern' />
      <ReactTooltip place='right' type='info' effect='solid'>
        <p>
          API Patterns are regular expressions, giving access to this user for specific URIs (e.g. ".*.cru.org.*").<br />
          You need to type "Enter" before the pattern will be recognized as added. You can add multiple patterns.
        </p>
      </ReactTooltip>
      <SelectInput label='' source='user.type' choices={[
        { id: '', name: 'Normal User' },
        { id: 'super', name: 'Super Admin' }
      ]} />
    </SimpleForm>
  </Create>
)
