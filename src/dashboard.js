import React from 'react'
import { Card, CardText } from 'material-ui/Card'
import { ViewTitle } from 'admin-on-rest/lib/mui'

export default () => (
  <div>
    <Card>
      <ViewTitle title='Events' />
      <CardText>
        An event may be viewing a web page, clicking a button, attending a conference, or any other way people
        are interacting with Cru. Please score your event based on the level of interest each group of people
        on the Scale of Belief would have in it. While scoring, keep in mind the definitions for each stage
        on the Scale of Belief.
      </CardText>
    </Card>
    <br />

    <Card>
      <ViewTitle title='People' />
      <CardText>
        <span style={{color: '#f9b625'}}>Content</span> - Those with no desired relationship to faith. This includes people who are hostile
        towards Christianity, those who are content with their own religious beliefs that differ from Christianity,
        those who are content without religion, and those who have never heard the Gospel.
      </CardText>

      <CardText>
        <span style={{color: '#dd7d1b'}}>Curious</span> - Those who are curious of spiritual things. This includes those who are specifically
        interested in learning about Christianity, and those who are exploring religion in general.
      </CardText>

      <CardText>
        <span style={{color: '#3eb1c8'}}>Follower</span> - Those who profess to be Christian. These people may or may not be actively looking for ways
        to grow spiritually. Either way, they are not yet committed to impacting the world around them for Christ.
      </CardText>

      <CardText>
        <span style={{color: '#007398'}}>Guide</span> - Those advancing the mission of the Gospel. These are people mobilizing their faith through
        evangelism, discipleship, or serving others through personal or organizational ministry.
      </CardText>
    </Card>
  </div>
)
