import React from 'react'
import { Admin, Resource } from 'admin-on-rest'
import authClient from './authClient'
import loginPage from './loginPage'
import { ScoreList } from './scores'
import restClient from './restClient'

const App = () => (
  <Admin authClient={authClient}
         loginPage={loginPage}
         restClient={restClient}>
      <Resource name='scores' list={ScoreList} />
  </Admin>
)

export default App
