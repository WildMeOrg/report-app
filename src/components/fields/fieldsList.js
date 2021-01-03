import AllTextInput from './AllTextInput.jsx';
import AreaInput from './AreaInput.jsx';
import BooleanInput from './BooleanInput.jsx';
import DateInput from './DateInput.jsx';
import DateRangeInput from './DateRangeInput.jsx';
import LatLongInput from './LatLongInput.jsx';
import MultiSelectInput from './MultiSelectInput.jsx';
import SelectInput from './SelectInput.jsx';
// Create NewComponent in the fields folder and import it
// displayType: NewComponent
const inputMap = {
  string: AllTextInput,
  longstring: AllTextInput,
  integer: AllTextInput,
  floats: AllTextInput,
  date: DateInput, 
  daterange: DateRangeInput,
  select: SelectInput,
  multiselect: MultiSelectInput,
  latlong: LatLongInput,
  boolean: BooleanInput,
  area: AreaInput,
};

export default inputMap;

// string: 'string',
// longstring: 'longstring',
// float: 'float',
// feetmeters: 'feetmeters', // float represents meters, but GUI supports feet
// individual: 'individual', // string (individual ID)
// relationships: 'relationships', // { targetIndividualId: string, direction: enum, type: enum, id: int }
// integer: 'integer',
// file: 'file',
// latlong: 'latlong', // [float, float] defines [lat, lng]
// area: 'area', // { north: float, east: float, south: float, west: float } defines a geographic bounding box
// date: 'date',
// daterange: 'daterange', // [date, date]
// select: 'select', // string
// multiselect: 'multiselect', // array of strings
// comparator: 'comparator', // { comparator: one of ["LT", "LTE", "GT", "GTE", "EQ"], value: float }
// boolean: 'boolean',
// treeview: 'treeview', // nested array
// treeeditor: 'treeeditor', // nested array (deprecated, replaced by locationIds)
// locationIds: 'locationIds',
