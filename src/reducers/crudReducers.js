import { 
    CREATE_CONTACT,
    INACTIVATE_CONTACT,
    DELETE_ALL,
    UPDATE_CONTACT 
} from '../actions/index';

const initialState = {
    contactList: [],
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

        case INACTIVATE_CONTACT:
            let list = [...state.contactList];
            list[action.index].status = "inactive"
            return {
                ...state,
                contactList:list
            }
         
        case DELETE_ALL:
            return{
                ...state,
                contactList:[]
            }

        case UPDATE_CONTACT:
            let updatedList = [...state.contactList];
            updatedList[action.index] = action.contact
            return{
                ...state,
                contactList:updatedList
            }

        default:
            return state;
    }

}