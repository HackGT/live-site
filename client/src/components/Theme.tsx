import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7B69EC',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
