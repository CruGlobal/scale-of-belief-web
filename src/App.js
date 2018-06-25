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

const App = () => (
  <Admin
    title='Scale of Belief'
    authClient={authClient}
    loginPage={loginPage}
    restClient={restClient}
    dashboard={Dashboard}
    customReducers={{customReducer}}>
    <Resource name='scores' list={ScoreList} />
    <Resource name='score' show={ScoreShow} edit={ScoreEdit} create={ScoreCreate} />
    <Resource name='content' list={ContentList} options={{ label: 'Content' }} />
    <Resource name='api-users' list={ApiUsersList} options={{ label: 'API Users' }} />
    <Resource name='api-user' show={ApiUserShow} edit={ApiUserEdit} create={ApiUserCreate} />
  </Admin>
)

export default App
