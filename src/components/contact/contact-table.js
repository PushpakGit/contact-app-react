import React from 'react';

const ContactTable = props =>{
    let t = this;
        let list = props.contactList;
        if(list.length > 0){
        return list.map(contact => {
            let fName = contact.firstName ? contact.firstName : ''; // handling null value
            let lName = contact.lastName ? contact.lastName : '';

            if(!props.showInactive && contact.status === "inactive"){
                return null;
            }else{
                return <tr className="contact-row" key={contact.phone}>
                    <td className="contact-data">{ `${fName} ${lName}` }</td>
                    <td className="contact-data">{ contact.email }</td>
                    <td className="contact-data">{ contact.phone }</td>
                    <td className="contact-data">{ contact.status }</td>
                    <td className="contact-data"> 
                        <span className="edit-contact-icon" title="Edit" onClick={()=>{ props.editContact(contact.phone) }}>
                            <img src={require("../../asset/edit-icon24.png")} alt="edit icon"></img>
                        </span>
                        {
                            contact.status === "active"
                            ?
                            <span className="delete-contact-icon" title="Inactivate" onClick={()=>{ props.deleteContact(contact.phone) }} >
                                <img src={require("../../asset/delete-icon-26.png")} alt="inactivate icon"></img>
                            </span>
                            :
                            <span className="delete-contact-icon" ></span>
                        }                        
                    </td>
                </tr>  
            }
        }
        );
        }else{
            return <tr className="contact-row">
                        <td colSpan="5">No contact found, Please click "Create Contact" button to create one.</td>
                    </tr>
        }
}

export default ContactTable;