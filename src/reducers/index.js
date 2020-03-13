import { 
    CREATE_CONTACT,
    INACTIVATE_CONTACT,
    DELETE_ALL
} from '../actions/index';

const initialState = {
    contactList: []
  }

export default function contactApp(state=initialState,action){
    switch(action.type){
        case CREATE_CONTACT :
            return Object.assign({},state,{
                contactList:[
                    ...state.contactList,
                    {
                        ...action.contact
                    }
                ]
            })
         
        default:
            return state;
    }

}