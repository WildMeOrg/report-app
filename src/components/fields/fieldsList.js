import AllTextInput from './AllTextInput.jsx';

// Create NewComponent in the fields folder and import it
// displayType: NewComponent
const inputMap = {
  string: AllTextInput,
  longstring: AllTextInput,
  integer: AllTextInput,
  floats: AllTextInput,
};

export default inputMap;
