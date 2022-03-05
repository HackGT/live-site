import React, { useState, useEffect } from "react";
import custom_theme from "../../Theme";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import { Image, Box, Text, Select, FormControl, Button } from '@chakra-ui/react';
import CardTag from "../../common/CardTag";
import MediaQuery from "react-responsive";

import { fetchAllEvents } from "../../../services/cmsService";
import get_random_card_image from "../../common/CardImg";

type Props = {
  setEventCallback: any;
};

const AllEvents: React.FC<Props> = (props: Props) => {
  let [events, setEvents] = useState<any[]>([]);
  const [tagFilter, setTagFilter] = useState("None");
  const [locationFilter, setLocationFilter] = useState("None");
  const [tagFilters, setTagFilters] = useState(new Set());
  const [locationFilters, setLocationFilters] = useState(new Set());
  const [filtered_events, set_filtered_events] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchAllEvents(true);
      const events = data.allEvents;
      setEvents(events);
      set_filtered_events(events.slice(0, 6));

      // Update possible tag filters
      if (tagFilters.size === 0) {
        let tag_filter_set = new Set(["None"]);
        for (let i = 0; i < events.length; i++) {
          for (let j = 0; j < events[i].tags.length; j++) {
            tag_filter_set.add(events[i].tags[j].name);
          }
        }
        setTagFilters(tag_filter_set);
      }

      // Update possible location filters
      if (locationFilters.size === 0) {
        let location_filter_set = new Set(["None"]);
        for (let i = 0; i < events.length; i++) {
          for (let j = 0; j < events[i].location.length; j++) {
            location_filter_set.add(events[i].location[j].name);
          }
        }
        setLocationFilters(location_filter_set);
      }
    };
    getEvents();
  }, []);

  const handleTagFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTagFilter(event.target.value as string);
  };

  const handleEventFilterChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLocationFilter(event.target.value as string);
  };

  // This function is called when the filter button is clicked
  // It should return a list of events that have the tags specified by the filters!
  // If there are both filters, we show events have have the tag filter OR the location filter.
  const handle_filter_button = () => {
    if (tagFilter === "None" && locationFilter === "None") {
      set_filtered_events(events.slice(0, 6));
    } else {
      let location_filtered_set = new Set();
      let tag_filtered_set = new Set();

      // Loop through each event
      for (let i = 0; i < events.length; i++) {
        if (locationFilter !== "None") {
          // If there is a location filter and no tag filter
          for (let j = 0; j < events[i]["location"].length; j++) {
            if (
              events[i].location[j].hasOwnProperty("name") &&
              events[i].location[j].name === locationFilter
            ) {
              location_filtered_set.add(events[i]);
              break;
            }
          }
        } else {
          location_filtered_set.add(events[i]);
        }
        if (tagFilter !== "None") {
          // If there is a tag filter but no location filter
          for (let j = 0; j < events[i]["tags"].length; j++) {
            if (events[i]["tags"][j]["name"] === tagFilter) {
              tag_filtered_set.add(events[i]);
              break;
            }
          }
        } else {
          tag_filtered_set.add(events[i]);
        }
      }

      let location_filtered_list = Array.from(location_filtered_set);
      let filtered_list = new Array();
      for (let k = 0; k < location_filtered_list.length; k++) {
        if (tag_filtered_set.has(location_filtered_list[k])) {
          filtered_list.push(location_filtered_list[k]);
        }
      }
      set_filtered_events(filtered_list);
    }
  };


  return (
    <div className="all_events">
      <p className="all_events_title">All Events</p>
      <div className="all_events_filter_container">
        <p className="all_events_filter_text">Filter by: </p>
        <Box id="tag-select">
        <FormControl className="all_events_filter_dropdown">
        <Text color="white">Tag</Text>
          <Select
            labelId="tag-select-label"
            id="tag-select-id"
            value={tagFilter}
            onChange={handleTagFilterChange}
            placeholder="Tag"
            bg="white"
          >
            {Array.from(tagFilters).map(function (obj: any) {
              return <option value={obj}>{obj}</option>;
            })}
          </Select>
        </FormControl>
        </Box>
        <Box id="event-select">
        <FormControl className="all_events_filter_dropdown">
          <div>
            <Text color="white">Location</Text>
          <Select
            labelId="event-select-label"
            id="event-select-id"
            value={locationFilter}
            onChange={handleEventFilterChange}
            placeholder="Location"
            bg="white"
          >
            {Array.from(locationFilters).map(function (obj: any) {
              return <option value={obj}>{obj}</option>;
            })}
          </Select>
          </div>
        </FormControl>
        </Box>

        <Button
          variant="contained"
          onClick={handle_filter_button}
          color="primary"
          bg={custom_theme.palette.primary.main}
          borderRadius={5}
          border={0}
          textColor="white"
          fontSize={16}
          padding={"0 30px"}
          boxShadow={"0 3px 5px 2px rgba(255, 105, 135, .3)"}
          marginTop={"20px"}
        >
          Filter
        </Button>
      </div>
      <div className="all_events_container">
        <MediaQuery minWidth={900}>
          {filtered_events.map((event) => (
            <div className="all_events_card">
              <Image
              src={get_random_card_image()}
              htmlHeight={130}
              style={{
                borderTopLeftRadius: "1.5%",
                borderTopRightRadius: "1.5%",
                height: "130px",
              }}
              />
              <Box
              bg='white'
              style={{
                borderBottomLeftRadius: "1.5%",
                borderBottomRightRadius: "1.5%"
              }}
              >
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
                    <CardActions>
                      {event.tags.map((tag: any, index: number) => (
                        <CardTag key={index} tag={tag.name} />
                      ))}
                    </CardActions>
                </CardActionArea>
              </Box>
            </div>
          ))}
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          {filtered_events.map((event) => (
            <div className="all_events_card">
              <Box
              bg='white'
              style={{
                borderBottomLeftRadius: "1.5%",
                borderBottomRightRadius: "1.5%"
              }}
              >
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
                    <CardActions>
                      {event.tags.map((tag: any, index: number) => (
                        <CardTag key={index} tag={tag.name} />
                      ))}
                    </CardActions>
                </CardActionArea>
              </Box>
            </div>
          ))}
        </MediaQuery>
      </div>
      <Button
          variant="contained"
          href="/schedule"
          onClick={handle_filter_button}
          color="primary"
          bg={custom_theme.palette.primary.main}
          borderRadius={5}
          border={0}
          textColor="white"
          fontSize={16}
          padding={"0 30px"}
          boxShadow={"0 3px 5px 2px rgba(255, 105, 135, .3)"}
          marginTop={"20px"}
        >Check Full Schedule</Button> 
       
    </div>
  );
};

export default AllEvents;
