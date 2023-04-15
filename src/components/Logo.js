import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Typography} from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {


  const logo = (
    <Box sx={{ flexGrow: 1, width: 35, height: 35, display: 'flex', ...sx  }}>
             <Typography variant="h6" gutterBottom sx={{color: '#ff3c4b', ml: 0, pt: 0.7}}>AdTokenVerse</Typography>
      </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/" style={{ textDecoration: 'none'}}>{logo}</RouterLink>;
}
