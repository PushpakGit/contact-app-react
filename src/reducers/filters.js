import { 
    SHOW_CARD_VIEW_FILTER,
    SHOW_INACTIVE_FILTER
} from '../actions/index';

const initialState = {
    showInactive:false,
    showCardView:false
  }

export default function appFilters(state=initialState,action){
    switch(action.type){
        case SHOW_CARD_VIEW_FILTER :
            return  {
                ...state,
                showCardView:action.checked
            }

        case SHOW_INACTIVE_FILTER:
            return {
                ...state,
                showInactive:action.checked
            }

        default:
            return state;
    }

}