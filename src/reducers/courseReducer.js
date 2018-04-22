const INITIAL_STATE = {courseID:17};
export default (state = INITIAL_STATE, action) =>{
  switch (action.type) {
    case 'save_id':
      return {...state,courseID:action.payload};
      break;
    default:
      return state;
  }
};
