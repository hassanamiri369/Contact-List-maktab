import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";


function App() {
  
  const [contacts, setContacts] = useState([]);

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("http://localhost:8000/contacts");
    return response.data;
  };


  const addContactHandler = async (contact) => {

    const request = { id: uuid(), ...contact};
    const response = await api.post("http://localhost:8000/contacts", request);
    setContacts([...contacts, response.data]);
  };


  const updateContactHandler = async (contact) => {
    console.log("contact update",contact)
    const response = await api.put(`http://localhost:8000/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    // console.log(typeof(id))  // string

    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };



  const removeContactHandler = async (id) => {
    await api.delete(`http://localhost:8000/contacts/${id}`);    // این کار حذف کردن از بک اند رو میکنه 

    const newContactList = contacts.filter((contact) => {    // این قسمت هم کار حذف کردن از استیت داخل فرانت رو میکنه 
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  
  useEffect(() => {
    
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);



  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>

          <Route  path="/" exact render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />  )}/>

          <Route path="/add"  render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)}  />

          <Route path="/edit" render={(props) =>(<EditContact  updateContactHandler={updateContactHandler} />  )}  />

          <Route path="/contact/:id" component={ContactDetail} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
