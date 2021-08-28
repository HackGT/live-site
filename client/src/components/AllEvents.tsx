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

import { fetchAllEvents } from '../services/cmsService';

import placeholder_img from '../assets/blue_wide.png'

type Props = {
  setEventCallback: any;
};

const AllEvents: React.FC<Props> = (props: Props) => {

  let [events, setEvents] = useState<any[]>([])
  const [tagFilter, setTagFilter] = useState("None")
  const [eventFilter, setEventFilter] = useState("None")
  const [tagFilters, setTagFilters] = useState(new Set());
  const [eventFilters, setEventFilters] = useState(new Set());
  const [filtered_events, set_filtered_events] = useState<any[]>([])

  useEffect(() => {

    const getEvents = async () => {
      const data = await fetchAllEvents()
      const events = data.allEvents
      setEvents(events);
      set_filtered_events(events.splice(0, 6))

      // Update filters
      if (tagFilters.size == 0) {
        let filter_set = new Set(["None"])
        for (var i = 0; i < events.length; i++) {
          for (var j = 0; j < events[i].tags.length; j++) {
            filter_set.add(events[i].tags[j].name)
          }
        }
        setTagFilters(filter_set)
      }
      if (eventFilters.size == 0) {
        let filter_set = new Set(["None"])
        for (var i = 0; i < events.length; i++) {
          if (events[i].location.length != 0) {
            for (var j = 0; j < events[i].location.length; j++) {
              filter_set.add(events[i].location[j].name)
            }
          } else {
            events[i].location = [{
              "name": "virtual"
            }]
            filter_set.add("virtual")
          }
        }
        setEventFilters(filter_set)
      }
    };
    getEvents();
  }, []);

  const handleTagFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTagFilter(event.target.value as string)
  };

  const handleEventFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEventFilter(event.target.value as string)
  };

  const handle_filter_button = () => {
    if (tagFilter === "None" && eventFilter === "None") {
      set_filtered_events(events.splice(0, 6))
    } else {
      let filtered_list = []
      for (var i = 0; i < events.length; i++) {
        if (tagFilter === "None" && eventFilter !== "None") {
          for (let j = 0; j < events[i]['tags'].length; j++) {
            console.log(events[i].location[j])
            console.log(events[i].location[j].name)
            if (events[i].location[j].hasOwnProperty("name") && events[i].location[j].name === eventFilter) {
              filtered_list.push(events[i])
              break;
            }
          }
        } else if (tagFilter !== "None" && eventFilter === "None") {
          for (let j = 0; j < events[i]['tags'].length; j++) {
            if (events[i]['tags'][j]['name'] === tagFilter) {
              filtered_list.push(events[i])
              break;
            }
          }
        } else {
          if (events[i]["location"][0]["name"] === eventFilter) {
            for (let j = 0; j < events[i]['tags'].length; j++) {
              if (events[i]['tags'][j]['name'] === tagFilter) {
                filtered_list.push(events[i])
                break;
              }
            }
            // if (events[i]['tags'].includes(tagFilter)) {
            //   filtered_list.push(events[i])
            // }
          }
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
            value={eventFilter}
            onChange={handleEventFilterChange}
          >
            {
              Array.from(eventFilters).map(function(obj: any) { 
                return <MenuItem value={obj}>{obj}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <StyledButton variant="contained" onClick={handle_filter_button} color="primary">Filter</StyledButton>
      </div>
      <div className="all_events_container">
        {
          filtered_events.map((event) => (
            <div className="all_events_card">
              <CardMedia
                component='img'
                image={placeholder_img}
                style={{
                  borderTopLeftRadius: '1.5%',
                  borderTopRightRadius: '1.5%'
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
      </div>
      <StyledButton variant="contained" href="/schedule" color="primary">Check Full Schedule</StyledButton>
    </div>
  )
}

export default AllEvents;
