// Action Types
export const CREATE_CONTACT = "CREATE_CONTACT";
export const INACTIVATE_CONTACT = "INACTIVATE_CONTACT";
export const DELETE_ALL = "DELETE_ALL";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const SHOW_INACTIVE_FILTER = "SHOW_INACTIVE_FILTER";
export const SHOW_CARD_VIEW_FILTER = "SHOW_CARD_VIEW_FILTER";

// Actions

export function createContact(contact){
    return {
        type:CREATE_CONTACT,
        contact
    }
}

export function makeInactive(index){
    return{
        type:INACTIVATE_CONTACT,
        index
    }
}

export function deleteAllContacts(){
    return{
        type:DELETE_ALL
    }
}

export function updateContact(index,contact){
    return{
        type:UPDATE_CONTACT,
        index,
        contact
    }
}