import '../App.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardTag from './CardTag'

import placeholder_img from '../assets/blue.png'

type Props = {
  setEventCallback: any;
  events: any;
};


const LiveEvents: React.FC<Props> = (props: Props) => {

  return (
    <div className="live_events">
      <p className="live_event_title">Live Events</p>
      <div className="live_event_container">
        {
          props.events.map((event: any) => ( 
            <Card className="live_event_card">
              <CardMedia
                component='img'
                image={placeholder_img}
                style={{
                  borderTopLeftRadius: '1.5%',
                  borderBottomLeftRadius: '1.5%',
                  objectFit: 'cover',
                  height: '100px'
                }}
              />
              <CardActionArea onClick={() => props.setEventCallback(event)}>
                <CardContent>
                  <Typography align='left' gutterBottom variant="h5" component="h2">
                    {event.name}
                  </Typography>
                  <Typography align='left' variant="body2" color="textSecondary" component="p">
                    {event.description}
                  </Typography>
                  <CardActions className="live_event_card_actions">
                    {
                      event.tags.map((tag: any, index: number) => (
                        <CardTag key={index} tag={tag.name}/>
                      ))
                    }
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default LiveEvents;
