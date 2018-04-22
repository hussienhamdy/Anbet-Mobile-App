const INITIAL_STATE = {user:null,loading:false,error:''};
export default (state = INITIAL_STATE, action) =>{
  switch (action.type) {
    case 'save_user':
      return {...state,user:action.payload,error:'',loading:false};
      break;
    case 'no_such_user':
      return {...state,error:'هذا الحساب غير مسجل',loading:false};
      break;
    case 'network_error':
      return {...state,error:'خطأ في الاتصال بالشبكة',loading:false};
      break;
    case 'start_loading':
      return {...state,loading:true,error:''};
      break;
    case 'delete_user':
        return {...state,user:null,loading:false,error:''};
        break;
    default:
      return state;
  }
};
