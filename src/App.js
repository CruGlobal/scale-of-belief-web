import React from 'react'
import { Admin, Resource } from 'admin-on-rest'
import authClient from './authClient'
import loginPage from './loginPage'
import { ScoreList } from './scores'
import { ApiUsersList } from './apiUsers'
import { ScoreShow, ScoreEdit, ScoreCreate } from './score'
import { ApiUserShow, ApiUserEdit, ApiUserCreate } from './apiUser'
import restClient from './restClient'

const App = () => (
  <Admin authClient={authClient}
         loginPage={loginPage}
         restClient={restClient}>
      <Resource name='scores' list={ScoreList} />
      <Resource name='score' show={ScoreShow} edit={ScoreEdit} create={ScoreCreate} />
      <Resource name='api-users' list={ApiUsersList} options={{ label: 'API Users' }} />
      <Resource name='api-user' show={ApiUserShow} edit={ApiUserEdit} create={ApiUserCreate} />
  </Admin>
)

export default App
