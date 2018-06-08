import React from 'react'
import { Card, CardText, CardHeader } from 'material-ui/Card'
import { ViewTitle } from 'admin-on-rest'
import './App.css'

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

    <ViewTitle title='People' />

    <Card>
      <CardHeader title='Content' titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#f9b625'}} />
      <CardText>
        <span className='keyword-label'>Hostile/Unaware</span> - Those who are hostile towards Christianity or those who
        have never heard the Gospel.
      </CardText>

      <CardText>
        <span className='keyword-label'>Content</span> - Those with no desired relationship to faith.
        These people have some knowledge of Christianity, but are not actively hostile towards it.
      </CardText>

      <CardText>
        <span className='keyword-label'>Contextualized</span> - Those who know and trust at least one Christian.
        This includes people who are content to identify with the beliefs of their culture.
      </CardText>

    </Card>
    <br />

    <Card>
      <CardHeader title='Curious' titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#dd7d1b'}} />
      <CardText>
        <span className='keyword-label'>Curious</span> - Those who are curious of spiritual things. This includes those who are specifically
        interested in learning about Christianity, and those who are exploring religion in general.
      </CardText>

      <CardText>
        <span className='keyword-label'>Seeker</span> - Those who are actively interacting with a Christian about
        Christianity on an ongoing basis, and willing to continue doing so.
      </CardText>
    </Card>
    <br />

    <Card>
      <CardHeader title='Follower' titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#3eb1c8'}} />
      <CardText>
        <span className='keyword-label'>Believer</span> - Those who profess to be Christian.
        These people may or may not be actively looking for ways to grow spiritually.
        Either way, they are not yet committed to impacting the world around them for Christ.
      </CardText>

      <CardText>
        <span className='keyword-label'>Learner</span> - Those who are in the process of new Christian instruction.
        This could include follow-up and fellowship with other believers.
      </CardText>

      <CardText>
        <span className='keyword-label'>Follower</span> - Those who are secure in the faith, attending church or
        fellowship regularly and have a grounding in basic orthodox Christian beliefs.
      </CardText>
    </Card>
    <br />

    <Card>
      <CardHeader title="Guide" titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#007398'}} />
      <CardText>
        <span className='keyword-label'>New Disciple</span> - Those who are learning how to share their faith with others,
        how to disciple others, and/or are actively being discipled by someone else.
      </CardText>

      <CardText>
        <span className='keyword-label'>Engaged Disciple</span> - Those who are actively sharing their faith with others
        on a regular basis.
      </CardText>

      <CardText>
        <span className='keyword-label'>Guide</span> - Those advancing the mission of the Gospel. These are people mobilizing their faith through
        evangelism, discipleship, or serving others through personal or organizational ministry. A multiplying disciple.
      </CardText>
    </Card>
  </div>
)
