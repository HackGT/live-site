import '../App.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CardTag from './CardTag'
import CardImg from './CardImg'

const LiveEvents: React.FC = () => {

  const events = [
    {
      "title": "Title 1",
      "tags": ["super long tag 1", "tag 2", "tag"],
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Title 2",
      "tags": ["super long tag 1", "tag 2", "tag"],
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Title 3",
      "tags": ["super long tag 1", "tag 2", "tag"],
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]

  return (
    <div className="live_events">
      <p className="live_event_title">Live Events</p>
      <div className="live_event_container">
        {
          events.map(function(event) { 
            return (
              <div className="live_event_card">
                <div className="live_event_image">
                  <CardImg />
                </div>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography align='left' gutterBottom variant="h5" component="h2">
                        {event.title}
                      </Typography>
                      <CardActions>
                        {
                          event.tags.map(function(obj) { 
                            return <CardTag tag={obj}  />;
                          })
                        }
                      </CardActions>
                      <Typography align='left' variant="body2" color="textSecondary" component="p">
                        {event.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default LiveEvents;
