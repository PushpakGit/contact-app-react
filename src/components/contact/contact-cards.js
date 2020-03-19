import React from 'react';

const ContactCards = props =>{
    let t = this;
        let list = props.contactList;
        if(list.length > 0){
            return list.map((contact,idx) => {
                let fName = contact.firstName ? contact.firstName : ''; // handling null value
                let lName = contact.lastName ? contact.lastName : '';
                if(!props.showInactive && contact.status === "inactive"){
                    return null;
                }else{
                    return <div key={idx} className="contact-card col-lg-4"> 
                            <div className="card">
                                <div className="card-contact-name">{`${fName} ${lName}`}</div>
                                <div className="card-contact-email">{contact.email}</div>
                                <div className="card-contact-phone">{contact.phone}</div>
                                <div className="card-contact-phone">{contact.status}</div>
                                <div className="card-contact-action">
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
                                </div>
                            </div>
                        </div>
                    }
            });
            
        }else{
            return <div className="contact-card col-lg-4"> 
            <div className="card">
             No contact found click "Create Contact" button to create one.</div>
            </div>
        }
}

export default ContactCards;