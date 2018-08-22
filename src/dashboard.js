import React from 'react'
import { Card, CardText, CardHeader } from 'material-ui/Card'
import { ViewTitle } from 'admin-on-rest'
import './App.css'

export default () => (
  <div>
    <Card>
      <ViewTitle title='Events' />
      <CardText>
        <p>An "event" is any interaction a user has with Cru about which we track data.</p>
        <p className='indented-paragraph'>
            This can come in two forms, online and offline. Online is any piece of data we track that occurs online
            (page or screen views, articles read, videos watched, etc).
            Offline is any piece of data that occurs "in real life" and is tracked digitally
            (example - someone prayed for you and recorded it in GodTools or we tracked that someone went to a conference
            or on a mission trip).
        </p>
      </CardText>
    </Card>
    <br />

    <ViewTitle title='Event Categories' />

    <Card>
      <CardHeader title='Scale of Belief - Content' titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#f9b625'}} />
      <CardText>
        <p>
          <span className='keyword-label'>Unaware</span> - No awareness of the gospel or Christianity.
        </p>
        <p>
          They have never been engaged in conversations around Christianity in any way. There is no knowledge of any form.
          This often looks like someone from a country with little access to the gospel.
        </p>
      </CardText>

      <CardText>
        <p>
          <span className='keyword-label'>Hostile</span> - Aware of Christianity in some cultural context,
          actively hostile and working against Christians.
        </p>
        <p>
          Opposed to the idea of Christianity. They are not open to hearing ideas in any context around Christian themes.
          This could look like someone highly opposed to all religion or someone of another religion
          that believes Christianity is wrong.
        </p>
      </CardText>

      <CardText>
        <p>
          <span className='keyword-label'>Uninterested</span> - Aware of Christianity
          in some cultural context, do not want to learn more about the gospel.
          They are generally apathetic towards Christianity, not hostile.
        </p>
        <p>
          The individual is content in their religious beliefs
          and not seeking to know more about Christianity; or satisfied in their faith or lack thereof.
          Some awareness of God, some knowledge of Christian themes such as
          Adam and Eve, Moses, Jesus’ miracles, the crucifixion of Christ.
          There is currently no desire to dig deeper into their knowledge base.
        </p>
      </CardText>

    </Card>
    <br />

    <Card>
      <CardHeader title='Scale of Belief - Curious' titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#dd7d1b'}} />
      <CardText>
        <p>
          <span className='keyword-label'>Open to Faith</span> - Willing to listen to the gospel message or
          Christian perspectives but are not actively seeking answers about Christianity.
        </p>
        <p>
          May have contact with a Christian where they’ve learned more about the general narrative
          and feel more inclined to learn.
          This could be displayed as a willingness to listen, attend, read or watch content
          for non-interactive engagement with the gospel message or be in contact with a Christian.
        </p>
      </CardText>

      <CardText>
        <p>
          <span className='keyword-label'>Seeking</span> - Actively seeking answers about Christianity
          and spiritual things.
        </p>
        <p>
          Actively seeking answers to Christian faith or life’s purpose.
          Awareness of the gospel message and some interest in learning about spiritual topics or Christian themes.
          This could look like active, ongoing conversations or interactions with a Christian or Christian materials.
          The individual is seeking to learn more about Jesus and deeper-level themes of Christianity.
        </p>
      </CardText>
    </Card>
    <br />

    <Card>
      <CardHeader title='Scale of Belief - Follower' titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#3eb1c8'}} />
      <CardText>
        <p>
          <span className='keyword-label'>Received Christ as Savior</span> - They have professed Christ as their Savior
          at some point in their life.
        </p>
        <p>
          They may have recently accepted Christ or would say they've done it 20 years ago, but that's the baseline.
          They aren't Maturing (#6) at this point. Some accept Christ and immediately start growing.
          Others accept Christ and don't. Others accept Christ, grow for a while and then stop.
          This is just the baseline that they would say they've accepted Christ.
          See the "Additional Context" tab for further context and bible verses.
        </p>
      </CardText>

      <CardText>
        <p>
          <span className='keyword-label'>Maturing in Faith</span> - Exploring biblical truths
          and discovering what it means to walk a Spirit-filled life.
        </p>
        <p>
          They are still new to certain terminology and are exploring the deeper meanings behind biblical stories.
          Engaging in community activities such as a church congregation, bible study or conversations
          geared towards higher learning about the faith.
          They grasp the truths of Christ, understand the implications of those truths and
          have made a decision to surrender to Jesus.
          They are gaining confidence in their beliefs and their decision to follow Christ,
          beginning to understand what life change will be required.
        </p>
      </CardText>

      <CardText>
        <p>
          <span className='keyword-label'>Walking in the Spirit</span> - Have experienced life change
          and are committed to walking in the Spirit.
          Life bears fruits of personal spiritual growth and
          biblical community such as churches, fellowship, online communities, being discipled.
        </p>
        <p>
          They have experienced change in their life and understand deeper levels of Christianity such as grace,
          mercy and love as it is written in the Bible.
          They are secure and active in their faith and have committed to a life of following Christ.
          They are invested in community activities such as a church congregation or bible study group.
          They are taking in all they can to build into their personal development and personal relationship with Christ.
        </p>
      </CardText>

      <CardText>
        <p>
          <span className='keyword-label'>Learning to Disciple and Evangelize</span> - Learning about what
          it means to disciple and evangelize. Desire to fulfill the call of the Great Commission.
        </p>
        <p>
          They are learning and actively engaged in being mentored by a believer.
          They are actively involved in their community and are serving as well as absorbing information.
          The difference in this level of commitment is the knowledge and desire to act on giving back to
          their church, being intentional in their relationships and recognizing Christ’s example to be a disciple to others.
        </p>
      </CardText>
    </Card>
    <br />

    <Card>
      <CardHeader title='Scale of Belief - Guide' titleStyle={{fontSize: '20px', lineHeight: '24px', color: '#007398'}} />
      <CardText>
        <p>
          <span className='keyword-label'>Sharing Faith</span> - They are actively involved in evangelism and discipleship.
        </p>
        <p>
          Actively involved in their Christian community including regular attendance,
          service and giving at their church, discipleship of others and being discipled and evangelizing.
          They are taking strides to be developed in their relationship with Christ and others.
        </p>
      </CardText>

      <CardText>
        <p>
          <span className='keyword-label'>Multiplying Disciple</span> - Highly engaged in the
          Great Commission and making new disciples.
        </p>
        <p>
          Actively involved in their Christian community including regular attendance,
           service and giving at their church, discipleship and being discipled, and evangelizing.
           They are intentionally involved in non-Christian community, such as building relationships
           with neighbors or co-workers, as a means of sharing the gospel.
           They are engaged in missions opportunities and look for opportunities to evangelize wherever they are.
           A multiplier is not engaged only in addition of disciples, no matter how broad the addition may be.
           A person is also not a multiplier if they only have the intent to multiply but have not yet begun
           to see multiplication happen through generations or a network of influence.
        </p>
      </CardText>
    </Card>
  </div>
)
