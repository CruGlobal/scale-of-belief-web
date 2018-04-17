import React from 'react'
import { List, Datagrid, TextField, Filter, TextInput, SelectField, CreateButton, RefreshButton } from 'admin-on-rest'
import { CardActions } from 'material-ui/Card'
import EditAPIUserButton from './apiUsers/EditAPIUserButton'

const ApiUserActions = () => (
    <CardActions>
      <CreateButton basePath='api-user' />
      <RefreshButton />
    </CardActions>
)

export const ApiUsersList = (props) => (
    <List title='Existing API Users' actions={<ApiUserActions />} {...props}>
        <Datagrid>
          <TextField source='id' label='GUID' />
          <TextField source='user.contact_email' label='Email' />
          <SelectField label='Type' source="user.type" choices={[
            { id: 'super', name: 'Super Admin' }
          ]} />
          <EditAPIUserButton />
        </Datagrid>
    </List>
)