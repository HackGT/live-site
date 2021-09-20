import '../App.css';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import custom_theme from './Theme'

const SeeFullScheduleButton:  React.FC = () => {

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
    <div>
      <StyledButton className="upcoming_events_button" variant="contained" href="/schedule" color="primary">See Full Schedule</StyledButton>
    </div>
  )
}

export default SeeFullScheduleButton;
