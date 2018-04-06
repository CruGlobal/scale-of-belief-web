import React from 'react'
import { Admin, Resource } from 'admin-on-rest'
import authClient from './authClient'
import loginPage from './loginPage'
import { ScoreList } from './scores'
import { ScoreEdit } from './score'
import restClient from './restClient'

const App = () => (
  <Admin authClient={authClient}
         loginPage={loginPage}
         restClient={restClient}>
      <Resource name='scores' list={ScoreList} />
      <Resource name='score' edit={ScoreEdit} />
  </Admin>
)

export default App
