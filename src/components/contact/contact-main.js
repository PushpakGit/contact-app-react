
import React, { Component } from 'react';
import './contact-main.css';
import { Button, Modal, Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import MDSpinner from "react-md-spinner";
import Switch from "react-switch";
import Dialog from 'react-bootstrap-dialog';
import { connect } from 'react-redux';
import { createContact } from '../../actions/index';
class ContactApp extends Component{

    constructor(props){
       super(props);
        this.state = {
            contactList : this.props.contactList,
            loading:true,
            open:false,
            show:false,
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            status:'',
            message:'',
            isEditing:false,
            editRowId:'',
            showInactive:false,
            showCardView:false
        }
    }

    renderContactTable = () =>{
        let t = this;
        let list = t.props.contactList;
        if(list.length > 0){
        return list.map(contact => {
            let fName = contact.firstName ? contact.firstName : ''; // handling null value
            let lName = contact.lastName ? contact.lastName : '';

            if(!t.state.showInactive && contact.status === "inactive"){
                return null;
            }else{
                return <tr className="contact-row" key={contact.phone}>
                    <td className="contact-data">{ `${fName} ${lName}` }</td>
                    <td className="contact-data">{ contact.email }</td>
                    <td className="contact-data">{ contact.phone }</td>
                    <td className="contact-data">{ contact.status }</td>
                    <td className="contact-data"> 
                        <span className="edit-contact-icon" title="Edit" onClick={()=>{ this.editContact(contact.phone) }}>
                            <img src={require("../../asset/edit-icon24.png")} alt="edit icon"></img>
                        </span>
                        {
                            contact.status === "active"
                            ?
                            <span className="delete-contact-icon" title="Inactivate" onClick={()=>{ this.deleteContact(contact.phone) }} >
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

    renderContactCards = () => {
        let t = this;
        let list = t.props.contactList;
        if(list.length > 0){
            return list.map((contact,idx) => {
                let fName = contact.firstName ? contact.firstName : ''; // handling null value
                let lName = contact.lastName ? contact.lastName : '';
                if(!t.state.showInactive && contact.status === "inactive"){
                    return null;
                }else{
                    return <div key={idx} className="contact-card col-lg-4"> 
                            <div className="card">
                                <div className="card-contact-name">{`${fName} ${lName}`}</div>
                                <div className="card-contact-email">{contact.email}</div>
                                <div className="card-contact-phone">{contact.phone}</div>
                                <div className="card-contact-phone">{contact.status}</div>
                                <div className="card-contact-action">
                                    <span className="edit-contact-icon" title="Edit" onClick={()=>{ this.editContact(contact.phone) }}>
                                        <img src={require("../../asset/edit-icon24.png")} alt="edit icon"></img>
                                    </span>
                                    {
                                        contact.status === "active"
                                        ?
                                        <span className="delete-contact-icon" title="Inactivate" onClick={()=>{ this.deleteContact(contact.phone) }} >
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

    handleClose = () =>{
        this.resetDialog();
        this.setState({show:false});
    }

    resetDialog = () => {
        this.setState({
            firstName:'',
            lastName:'',
            phone:'',
            email:'',
            status:'',
            isEditing:false,
            editRowId:''
        })
    }

    handleChange = (key,event) =>{
        if(key === 'phone'){ this.setState( {phone:event.target.value.replace(/[^\d]/g, '')} ); } // Allow number only in phone field
        else{ this.setState({[key]: event.target.value}) };
    }

    submitContactForm = (event) =>{
        event.preventDefault();
        let t = this;
        let isValid = t.checkForFormValidation();
        // console.log("Valid", isValid);
        let allContacts = [];
        if(localStorage.contactList){
            allContacts = JSON.parse(localStorage.contactList);
        }
        
        if (isValid) {
            let contactObj = {
                firstName:t.state.firstName.trim(),
                lastName:t.state.lastName.trim(),
                email:t.state.email.trim(),
                phone:t.state.phone,
                status:t.state.isEditing ? t.state.status : "active"
            }
            if(t.state.isEditing){
                allContacts[this.state.editRowId] = contactObj;
                t.notificationDisplay("Contact updated successfully");
            }else{
                // allContacts = [...allContacts,contactObj];
                t.props.dispatchContact(contactObj);
                t.notificationDisplay("Contact created successfully");
            }            
            // localStorage.setItem('contactList', JSON.stringify(allContacts));            
            t.setState({contactList:allContacts,show:false});
            this.resetDialog();
        } 
    }

    isValidEmail = (email) => {
        let mailformat = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.trim().match(mailformat)) {
            return false;
        } else {
            return true;
        }
    }

    checkForFormValidation = () => {
        let t = this;
        let valid = true;
        let list = t.props.contactList;
        let isMailOrPhoneExist = false;
        console.log("List",list)
        list.map((contact,index) =>{
            if(t.state.editRowId == index && t.state.isEditing){
                return false;
            }else if(contact.phone === t.state.phone || contact.email === t.state.email){
                isMailOrPhoneExist = true;
            }
            return '';
        });
        if (!t.state.firstName) {
            valid = false;
            t.notificationDisplay('First name is missing');
        }else if (!t.state.lastName) {
            valid = false;
            t.notificationDisplay('Last name is missing');
        } else if (!t.state.email || !t.isValidEmail(t.state.email)) {
            valid = false;
            t.notificationDisplay('Provide valid email id');
        } else if (!t.state.phone || t.state.phone.length < 10) {
            valid = false;
            t.notificationDisplay('Phone number is not valid');   
        } else if (isMailOrPhoneExist) {
            valid = false;
            t.notificationDisplay('Email or phone number already exist');   
        }
        return valid;
    }

    editContact = (phone) =>{
        let t = this;
        let list = t.props.contactList;
        let selectedContact,idx;
        list.map((contact,index) => {
            if(contact.phone === phone){
                selectedContact = contact;
                idx = index;
            }
            return '';
        });
        t.setState({
            firstName:selectedContact.firstName,
            lastName:selectedContact.lastName,
            phone:selectedContact.phone,
            email:selectedContact.email,
            status:selectedContact.status
        })
        t.setState({isEditing:true,show:true,editRowId:idx});
    }

    deleteContact = (phone) =>{
        let t = this;
        this.okCancelDialog.show({
            body: "Are you sure you want to Inactivate this contact?",
            actions: [
              Dialog.CancelAction(() =>{  }),
              Dialog.OKAction(()=>{ 
                    let list = t.props.contactList;
                    let idx;
                    list.map((contact,index) => {
                        if(contact.phone === phone){
                            idx = index;
                        }
                        return '';
                    });
                    list[idx].status = "inactive";
                    t.setState({contactList:list});
                    // localStorage.setItem('contactList', JSON.stringify(list));
                    t.notificationDisplay("Contact marked as inactive");
                })
            ],
            onHide: (dialog) => {
              dialog.hide();
            }
          });
       
    }

    notificationDisplay(message){
        let t = this
        if(message === ''){
          return
        }
        this.setState({open: true, message: message})
    
        setTimeout(function(){
          t.setState({open: false})
        }, 4000)
      }

    openCreateEditModal = () => {
        this.setState({show:true})
    }

    handleStatusFilterChange = (checked) =>{
        this.setState({ showInactive : checked });
    }

    handleViewFilterChange = (checked) =>{
        this.setState({ showCardView : checked });
    }

    deleteAllContact = () =>{
        let t = this;
        this.okCancelDialog.show({
            body: "Are you sure you want to delete all contacts?",
            actions: [
              Dialog.CancelAction(() =>{  }),
              Dialog.OKAction(()=>{ 
                    // localStorage.removeItem("contactList");
                    t.setState({contactList:[]});
                    t.notificationDisplay("All Contacts are deleted permanently.");
                })
            ],
            onHide: (dialog) => {
              dialog.hide();
            }
          });
    }

    componentDidMount(){  
        this.setState({loading:false});    
        if(localStorage.contactList){
            this.setState({ contactList:  JSON.parse(localStorage.contactList) });
        }  
    }

    render(){
        return(
            <div className="container">
                <div className="create-contact-wrapper col-12">
                    <div className="col-lg-3">
                    <label className="inactive-filter-lable">
                            <span>Show Card View</span>
                            <Switch className="view-filter-swich" onChange={this.handleViewFilterChange} checked={this.state.showCardView} />
                        </label>
                    </div>
                    <div className="col-lg-3">
                        <label className="inactive-filter-lable">
                            <span>Show Inactive Contact</span>
                            <Switch className="inactive-filter-swich" onChange={this.handleStatusFilterChange} checked={this.state.showInactive} />
                        </label>
                    </div>
                    <div className="col-lg-3">
                        <Button className="create-contact-btn" onClick={this.openCreateEditModal}>Create Contact</Button>
                    </div>
                    <div className="col-lg-3">
                        <Button className="delete-all-btn btn-danger" onClick={this.deleteAllContact}>Delete All Contacts</Button>
                    </div>
                    
                </div>
                <div>
                    {
                        this.state.showCardView
                        ?
                        <div className="contact-card-div col-12">
                            {
                                this.renderContactCards()
                            }                        
                        </div>
                        :
                        <div className="contact-table-div">
                            <table className="table contact-table">
                                <thead>
                                    <tr className="contact-thead-tr">
                                        <th className="">Name</th>
                                        <th className="">Email</th>
                                        <th className="">Phone</th>
                                        <th className="">Status</th>
                                        <th className="">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="contact-table-body">
                                    {
                                        this.renderContactTable()
                                    }
                                </tbody>
                            </table>
                        </div>

                    }
                </div>
                

                <Modal show={this.state.show} onHide={this.handleClose} className="contact-modal" backdrop="static">
                    <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title className="modalTitle">Add/Edit Contact</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="padding-md">
                        <Form className="contact-form">
                            <Form.Group controlId="formBasicFName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" maxLength="20" placeholder="Enter first name" value={this.state.firstName} onChange={(e)=>this.handleChange("firstName",e) } />
                            </Form.Group>

                            <Form.Group controlId="formBasicLName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" maxLength="20" placeholder="Enter last name" value={this.state.lastName} onChange={(e)=>this.handleChange("lastName",e) } />
                            </Form.Group>  
                            
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(e)=>this.handleChange("email",e) } />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group> 

                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control type="text" maxLength="10" placeholder="Enter phone number" value={this.state.phone} onChange={(e)=>this.handleChange("phone",e) } />
                            </Form.Group>  

                        </Form>
                    </Modal.Body>            
                    <Modal.Footer className="padding-md-side">                
                        <Button onClick={this.handleClose} className="btndefault">CANCEL</Button>
                        <Button onClick={this.submitContactForm} className="btn-primary save-modal">SAVE</Button>
                    </Modal.Footer>
                </Modal>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<div id="message-id" style={{fontSize : "16px" , textAlign : "center"}}>{this.state.message}</div>}
                />
                <div className={(this.state.loading === true) ? "loader" : "off-loader"} style={{zIndex:1060}}>
                    <MDSpinner size={50} color1="#319DD8" color2="#319DD8" color3="#319DD8" color4="#319DD8"/>
                </div>
                <Dialog ref={(el) => { this.okCancelDialog = el }}/>
            </div>
        );
    }

}


const mapStateToProps = state => {
    console.log("STATE",state)
    return {
        contactList: state.contactList
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        dispatchContact: (contact) => {
            dispatch(createContact(contact))
      }
    }
  } 

export default connect(mapStateToProps, mapDispatchToProps)(ContactApp);