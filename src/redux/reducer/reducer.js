import * as actions from '../action/actiionTypes';

export const initialState ={
  user:null
};

const reducer =(state,action)=>{
  console.log(action);
  switch(action.type){
    case actions.set_user:
      return {
        ...state,
        user:action.user,
      }
    default:
      return state;
  }
};

export default reducer;
