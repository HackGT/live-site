import '../App.css';

// import { withStyles } from '@material-ui/core/styles';
// import custom_theme from './Theme'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import CardTag from './CardTag'
import MediaQuery from "react-responsive";
import get_random_card_image from './CardImg'


type Props = {
  setEventCallback: any;
  events: any;
};

const UpcomingEvents: React.FC<Props> = (props: Props) => {

  // const StyledButton = withStyles({
  //   root: {
  //     background: custom_theme.palette.primary.main,
  //     borderRadius: 5,
  //     border: 0,
  //     color: 'white',
  //     height: 48,
  //     fontSize: 16,
  //     padding: '0 30px',
  //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  //   },
  //   label: {
  //     textTransform: 'capitalize',
  //   },
  // })(Button);

  return (
    <div className="upcoming_events">
      <p className="upcoming_events_title">Upcoming Events</p>
      <div className="upcoming_events_container">
        <MediaQuery minWidth={900}>
          {
            props.events.map(function(event: any) { 
              return (
                <div className="upcoming_events_card">
                  <Card>
                    <CardActionArea onClick={() => props.setEventCallback(event)}>
                      <CardMedia
                        component='img'
                        image={get_random_card_image()}
                        style={{
                          borderTopLeftRadius: '1.5%',
                          borderTopRightRadius: '1.5%', 
                          height: '100px'
                        }}
                      />
                      <CardContent>
                        <Typography align='left' gutterBottom variant="h5" component="h2">
                          {event.name}
                        </Typography>
                        <Typography align='left' variant="body2" color="textSecondary" component="p">
                          {event.description}
                        </Typography>
                        <CardActions>
                          {
                            event.tags.map((tag: any, index: number) => (
                              <CardTag key={index} tag={tag.name}/>
                            ))
                          }
                        </CardActions>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            })
          }
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          {
            props.events.map(function(event: any) { 
              return (
                <div className="upcoming_events_card">
                  <Card>
                    <CardActionArea onClick={() => props.setEventCallback(event)}>
                      <CardContent>
                        <Typography align='left' gutterBottom variant="h5" component="h2">
                          {event.name}
                        </Typography>
                        <Typography align='left' variant="body2" color="textSecondary" component="p">
                          {event.description}
                        </Typography>
                        <CardActions>
                          {
                            event.tags.map((tag: any, index: number) => (
                              <CardTag key={index} tag={tag.name}/>
                            ))
                          }
                        </CardActions>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            })
          }
        </MediaQuery>
      </div>
      {/* <StyledButton className="upcoming_events_button" variant="contained" href="/schedule" color="primary">Show All Upcoming Events</StyledButton> */}
    </div>
  )
}

export default UpcomingEvents;
