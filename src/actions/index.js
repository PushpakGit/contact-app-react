// Action Types
export const CREATE_CONTACT = "CREATE_CONTACT";
export const INACTIVATE_CONTACT = "INACTIVATE_CONTACT";
export const DELETE_ALL = "DELETE_ALL"



// Actions

export function createContact(contact){
    return {
        type:CREATE_CONTACT,
        contact
    }
}

export function inactivateContact(index){
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