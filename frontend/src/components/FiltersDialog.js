import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Box,
  Switch,
  styled,
} from '@mui/material';

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

function FiltersDialog({ open, onClose, filters, onApply }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (name, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6" component="div">
          Filters
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FilterSection>
          <Typography gutterBottom>Age Range</Typography>
          <Slider
            value={localFilters.ageRange}
            onChange={(_, value) => handleChange('ageRange', value)}
            valueLabelDisplay="auto"
            min={18}
            max={100}
            sx={{ color: 'primary.main' }}
          />
          <Typography variant="body2" color="text.secondary">
            {localFilters.ageRange[0]} - {localFilters.ageRange[1]} years
          </Typography>
        </FilterSection>

        <Divider />

        <FilterSection>
          <Typography gutterBottom>Distance</Typography>
          <Slider
            value={localFilters.distance}
            onChange={(_, value) => handleChange('distance', value)}
            valueLabelDisplay="auto"
            min={1}
            max={100}
            sx={{ color: 'primary.main' }}
          />
          <Typography variant="body2" color="text.secondary">
            Up to {localFilters.distance} km away
          </Typography>
        </FilterSection>

        <Divider />

        <FilterSection>
          <FormControl component="fieldset">
            <FormLabel component="legend">Looking for</FormLabel>
            <RadioGroup
              value={localFilters.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
            >
              <FormControlLabel value="women" control={<Radio />} label="Women" />
              <FormControlLabel value="men" control={<Radio />} label="Men" />
              <FormControlLabel value="everyone" control={<Radio />} label="Everyone" />
            </RadioGroup>
          </FormControl>
        </FilterSection>

        <Divider />

        <FilterSection>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Only show people with verified photos</Typography>
            <Switch
              checked={localFilters.verifiedOnly}
              onChange={(e) => handleChange('verifiedOnly', e.target.checked)}
            />
          </Box>
        </FilterSection>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FiltersDialog; 