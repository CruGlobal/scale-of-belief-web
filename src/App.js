import React from 'react'
import { Admin, Resource } from 'admin-on-rest'
import authClient from './authClient'
import loginPage from './loginPage'
import { ScoreList } from './scores'
import { ApiUsersList } from './apiUsers'
import { ScoreShow, ScoreEdit, ScoreCreate } from './score'
import { ContentList } from './content'
import { ApiUserShow, ApiUserEdit, ApiUserCreate } from './apiUser'
import restClient from './restClient'
import Dashboard from './dashboard'
import customReducer from './reducer'
import Menu from './menu'

const App = () => (
  <Admin
    title='Scale of Belief'
    authClient={authClient}
    loginPage={loginPage}
    restClient={restClient}
    dashboard={Dashboard}
    customReducers={{customReducer}}
    menu={Menu}>
    <Resource name='score' show={ScoreShow} edit={ScoreEdit} create={ScoreCreate} />
    <Resource name='content' list={ContentList} options={{ label: 'Create New Scores' }} />
    <Resource name='scores' list={ScoreList} options={{ label: 'View or Update Scores' }} />
    <Resource name='api-users' list={ApiUsersList} options={{ label: 'User Administration' }} />
    <Resource name='api-user' show={ApiUserShow} edit={ApiUserEdit} create={ApiUserCreate} />
  </Admin>
)

export default App
