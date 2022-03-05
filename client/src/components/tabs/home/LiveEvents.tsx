import {Box, Text, Image } from '@chakra-ui/react';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent"; //
import CardTag from "../../common/CardTag";

import MediaQuery from "react-responsive";
import get_random_card_image from "../../common/CardImg";

type Props = {
  setEventCallback: any;
  events: any;
};


const LiveEvents: React.FC<Props> = (props: Props) => {
  return (
    <div className="live_events">
      <p className="live_event_title">Live Events</p>
      <p className="live_event_tag">Click on a card to join the event!</p>
      <MediaQuery minWidth={900}>
        <div className="live_event_container">
          {props.events.map((event: any) => (
            <Box
            className="live_event_card"
            bg='white'
            style={{
              borderTopRightRadius: "1.5%",
              borderBottomRightRadius: "1.5%"
            }}
            >
              <Image
              src={get_random_card_image()}
              maxW={175}
              objectFit='cover'
              />
              <CardActionArea onClick={() => props.setEventCallback(event)}>
                <Text
                    as='h6'
                    fontSize={"25px"}
                    align="left"
                    >
                    {event.name}
                  </Text>
                  <Text
                      align="left"
                      as='p'
                      fontSize={"12px"}
                      color="gray"
                    >
                    {event.description}
                  </Text>
                  <CardActions className="live_event_card_actions">
                    {event.tags.map((tag: any, index: number) => (
                      <CardTag key={index} tag={tag.name} />
                    ))}
                  </CardActions>
              </CardActionArea>
            </Box>
          ))}
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={900}>
        <div className="live_event_container">
          {props.events.map((event: any) => (
            <Box 
            className="live_event_card"
            bg='white'
            style={{
              borderTopRightRadius: "1.5%",
              borderBottomRightRadius: "1.5%",
              borderTopLeftRadius: "1.5%",
              borderBottomLeftRadius: "1.5%",
            }}>
              <CardActionArea onClick={() => props.setEventCallback(event)}>
                <CardContent>
                  <Text
                    as='h6'
                    fontSize={"25px"}
                    align="left"
                    >
                    {event.name}
                  </Text>
                  <Text
                      align="left"
                      as='p'
                      fontSize={"12px"}
                      color="gray"
                    >
                    {event.description}
                  </Text>
                  <CardActions className="live_event_card_actions">
                    {event.tags.map((tag: any, index: number) => (
                      <CardTag key={index} tag={tag.name} />
                    ))}
                  </CardActions>
                </CardContent>
              </CardActionArea>
            </Box>
          ))}
        </div>
      </MediaQuery>
    </div>
  );
};

export default LiveEvents;
