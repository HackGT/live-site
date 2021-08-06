import '../App.css';

import { withStyles } from '@material-ui/core/styles';
import custom_theme from './Theme'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardTag from './CardTag'

import placeholder_img from '../assets/blue_wide.png'

const UpcomingEvents: React.FC = () => {

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

  const StyledButton = withStyles({
    root: {
      background: custom_theme.palette.primary.main,
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 48,
      fontSize: 16,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  return (
    <div className="upcoming_events">
      <p className="upcoming_events_title">Upcoming Events</p>
      <div className="upcoming_events_container">
        {
          events.map(function(event) { 
            return (
              <div className="upcoming_events_card">
                <CardMedia
                  component='img'
                  image={placeholder_img}
                  style={{
                    borderTopLeftRadius: '1.5%',
                    borderTopRightRadius: '1.5%'
                  }}
                />
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography align='left' gutterBottom variant="h5" component="h2">
                        {event.title}
                      </Typography>
                      <Typography align='left' variant="body2" color="textSecondary" component="p">
                        {event.description}
                      </Typography>
                      <CardActions>
                        {
                          event.tags.map(function(obj) { 
                            return <CardTag tag={obj}  />;
                          })
                        }
                      </CardActions>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            )
          })
        }
      </div>
      <StyledButton className="upcoming_events_button" variant="contained" href="/schedule" color="primary">Show All Upcoming Events</StyledButton>
    </div>
  )
}

export default UpcomingEvents;
