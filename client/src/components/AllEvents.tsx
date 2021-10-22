import '../App.css';

import React, { useState, useEffect } from 'react';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MediaQuery from "react-responsive";

import { fetchAllEvents } from '../services/cmsService';
import get_random_card_image from './CardImg'

type Props = {
  setEventCallback: any;
};

const AllEvents: React.FC<Props> = (props: Props) => {

  let [events, setEvents] = useState<any[]>([])
  const [tagFilter, setTagFilter] = useState("None")
  const [locationFilter, setLocationFilter] = useState("None")
  const [tagFilters, setTagFilters] = useState(new Set());
  const [locationFilters, setLocationFilters] = useState(new Set());
  const [filtered_events, set_filtered_events] = useState<any[]>([])

  useEffect(() => {

    const getEvents = async () => {
      const data = await fetchAllEvents(false)
      const events = data.allEvents
      setEvents(events);
      set_filtered_events(events.slice(0, 6))

      // Update possible tag filters
      if (tagFilters.size === 0) {
        let tag_filter_set = new Set(["None"])
        for (let i = 0; i < events.length; i++) {
          for (let j = 0; j < events[i].tags.length; j++) {
            tag_filter_set.add(events[i].tags[j].name)
          }
        }
        setTagFilters(tag_filter_set)
      }

      // Update possible location filters
      if (locationFilters.size === 0) {
        let location_filter_set = new Set(["None"])
        for (let i = 0; i < events.length; i++) {
          for (let j = 0; j < events[i].location.length; j++) {
            location_filter_set.add(events[i].location[j].name)
          }
        }
        setLocationFilters(location_filter_set)
      }

    };
    getEvents();
  }, []);

  const handleTagFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTagFilter(event.target.value as string)
  };

  const handleEventFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocationFilter(event.target.value as string)
  };

  // This function is called when the filter button is clicked
  // It should return a list of events that have the tags specified by the filters! 
  // If there are both filters, we show events have have the tag filter OR the location filter.
  const handle_filter_button = () => {
    if (tagFilter === "None" && locationFilter === "None") {
      set_filtered_events(events.slice(0, 6))
    } else {
      let location_filtered_set = new Set()
      let tag_filtered_set = new Set()

      // Loop through each event
      for (let i = 0; i < events.length; i++) {
        if (locationFilter !== "None") {
          // If there is a location filter and no tag filter
          for (let j = 0; j < events[i]['location'].length; j++) {
            if (events[i].location[j].hasOwnProperty("name") && events[i].location[j].name === locationFilter) {
              location_filtered_set.add(events[i])
              break;
            }
          }
        } else {
          location_filtered_set.add(events[i])
        }
        if (tagFilter !== "None") {
          // If there is a tag filter but no location filter
          for (let j = 0; j < events[i]['tags'].length; j++) {
            if (events[i]['tags'][j]['name'] === tagFilter) {
              tag_filtered_set.add(events[i])
              break;
            }
          }
        } else {
          tag_filtered_set.add(events[i])
        }
      }

      let location_filtered_list = Array.from(location_filtered_set)
      let filtered_list = new Array()
      for (let k = 0; k < location_filtered_list.length; k++) {
        if (tag_filtered_set.has(location_filtered_list[k])) {
          filtered_list.push(location_filtered_list[k])
        }
      }
      set_filtered_events(filtered_list)
    }
  }

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
      marginTop: '20px'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  return (
    <div className="all_events">
      <p className="all_events_title">All Events</p>
      <div className="all_events_filter_container">
        <p className="all_events_filter_text">Filter by: </p>
        <FormControl className="all_events_filter_dropdown">
          <InputLabel id="tag-select-input">Tag</InputLabel>
          <Select
            labelId="tag-select-label"
            id="tag-select-id"
            value={tagFilter}
            onChange={handleTagFilterChange}
          >
            {
              Array.from(tagFilters).map(function(obj: any) { 
                return <MenuItem value={obj}>{obj}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <FormControl className="all_events_filter_dropdown">
          <InputLabel id="event-select-label">Location</InputLabel>
          <Select
            labelId="event-select-label"
            id="event-select-id"
            value={locationFilter}
            onChange={handleEventFilterChange}
          >
            {
              Array.from(locationFilters).map(function(obj: any) { 
                return <MenuItem value={obj}>{obj}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <StyledButton variant="contained" onClick={handle_filter_button} color="primary">Filter</StyledButton>
      </div>
      <div className="all_events_container">
        <MediaQuery minWidth={900}>
          {
            filtered_events.map((event) => (
              <div className="all_events_card">
                <CardMedia
                  component='img'
                  image={get_random_card_image()}
                  style={{
                    borderTopLeftRadius: '1.5%',
                    borderTopRightRadius: '1.5%',
                    height: '130px',
                  }}
                />
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
            ))
          }
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          {
            filtered_events.map((event) => (
              <div className="all_events_card">
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
            ))
          }
        </MediaQuery>
      </div>
      <StyledButton variant="contained" href="/schedule" color="primary">Check Full Schedule</StyledButton>
    </div>
  )
}

export default AllEvents;