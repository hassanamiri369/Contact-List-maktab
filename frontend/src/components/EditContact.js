import React from "react";
import {useHistory , useLocation} from "react-router-dom"

const EditContact =({updateContactHandler })=> {
 
  const history = useHistory()
  const location = useLocation()
    
    const { id : myId, name : MyName, email : myEmail } = location.state.contact;

    const [id , setId ] = React.useState(myId)
    const [name , setName ] = React.useState(MyName)
    const [email , setEmail ] = React.useState(myEmail)
  

    const editData = {id , name , email} 
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }

    updateContactHandler(editData);
    setName("")
    setEmail("")
    setId(null)
    history.push("/");
  };


  
    return (
      <div className="ui main">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) =>setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
  
}

export default EditContact;
