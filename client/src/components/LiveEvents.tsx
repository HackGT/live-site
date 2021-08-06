import '../App.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardTag from './CardTag'

import placeholder_img from '../assets/blue.png'

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
              <Card className="live_event_card">
                <CardMedia
                  component='img'
                  image={placeholder_img}
                  style={{
                    borderTopLeftRadius: '1.5%',
                    borderBottomLeftRadius: '1.5%',
                    width: 175,
                    objectFit: 'cover'
                  }}
                />
                <CardActionArea>
                  <CardContent>
                    <Typography align='left' gutterBottom variant="h5" component="h2">
                      {event.title}
                    </Typography>
                    <Typography align='left' variant="body2" color="textSecondary" component="p">
                      {event.description}
                    </Typography>
                    <CardActions className="live_event_card_actions">
                      {
                        event.tags.map(function(obj) { 
                          return <CardTag tag={obj}  />;
                        })
                      }
                    </CardActions>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default LiveEvents;
