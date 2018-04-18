import React from 'react'
import { Show, SimpleShowLayout, TextField, DisabledInput, TextInput, Edit, SimpleForm, Create, SelectInput, SelectArrayInput, FunctionField, SelectField, required, email, regex } from 'admin-on-rest'

export const ApiUserShow = (props) => (
  <Show title='API User' {...props}>
    <SimpleShowLayout>
      <TextField source='id' label='GUID' />
      <TextField source='user.contact_email' label='Email' />
      <FunctionField label='API Pattern' render={record => `${record.user.api_pattern}`} />
      <SelectField label='Type' source="user.type" choices={[
        { id: '', name: 'Normal User' },
        { id: 'super', name: 'Super Admin' }
      ]} />
    </SimpleShowLayout>
  </Show>
)

export const ApiUserEdit = (props) => (
  <Edit title='Edit API User' {...props}>
    <SimpleForm redirect='show'>
      <DisabledInput label = 'GUID' source='id' />
      <TextInput label='Email' source='user.contact_email' validate={[required, email]} />
      <SelectArrayInput label='API Pattern' source='user.api_pattern' />
      <SelectInput label='Type' source="user.type" choices={[
        { id: '', name: 'Normal User' },
        { id: 'super', name: 'Super Admin' },
      ]} />
    </SimpleForm>
  </Edit>
)

const guidValidate = regex(/^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/, 'Must be a valid GUID')

export const ApiUserCreate = (props) => (
  <Create title='Create API User' {...props}>
    <SimpleForm redirect='show'>
      <TextInput label = 'GUID' source='id' validate={[required, guidValidate]} />
      <TextInput label='Email' source='user.contact_email' validate={[required, email]}  />
      <SelectArrayInput label='API Pattern' source='user.api_pattern' />
      <SelectInput label='Type' source="user.type" choices={[
        { id: '', name: 'Normal User' },
        { id: 'super', name: 'Super Admin' },
      ]} />
    </SimpleForm>
  </Create>
)
