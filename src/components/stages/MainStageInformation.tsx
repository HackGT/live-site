import EventInformation from "../EventInformation";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardTag from "../common/CardTag";

type Props = {
  event: EventInformation;
};

const MainStageInformation: React.FC<Props> = (props: Props) => {
  // TODO: Add countdown logic for upcoming events + game link

  return (
    <Card className="main_stage_content">
      <CardContent>
        <Typography align="left" gutterBottom variant="h5" component="h2">
          {props.event.title}
        </Typography>
        <Typography
          align="left"
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.event.description}
        </Typography>
      </CardContent>
      <CardActions>
        {props.event.tags.map((tag: any, index: number) => (
          <CardTag key={index} tag={tag.name} />
        ))}
      </CardActions>
    </Card>
  );
};

export default MainStageInformation;
