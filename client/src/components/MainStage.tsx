import '../App.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardTag from './CardTag'

const MainStage: React.FC = () => {

  const tags = [
    "Standard Tag 1",
    "Standard Tag 2",
    "Standard Tag 3"
  ]

  return (
    <div>
      <div className="main_stage_container">
        <div className="main_stage_placeholder"></div>
        <Card className="main_stage_content">
          <CardActionArea>
            <CardContent>
              <Typography align='left' gutterBottom variant="h5" component="h2">
                Title goes here
              </Typography>
              <Typography align='left' variant="body2" color="textSecondary" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {
              tags.map(function(obj) { 
                return <CardTag tag={obj}  />;
              })
            }
          </CardActions>
        </Card>
      </div>
    </div>
  )
}

export default MainStage;
