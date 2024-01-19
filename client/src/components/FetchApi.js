



import React, { useEffect, useState } from 'react';
import '../components/table.css';

function FetchApi() {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [userID, setUserID] = useState(null)

  const handeSubmit = async (e) => {
    e.preventDefault()
    try {

      const data = await fetch('http://localhost:5600/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phone, description }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const result = await data.json();
      console.log(result)
    } catch (error) {
      console.error('data was not sent!')
    }

    setName('')
    setEmail('');
    setPassword('')
    setPhone('')
    setDescription('')
  }









  const [showdata, setShowData] = useState([])


  const getData = async () => {
    const data = await fetch('http://localhost:5600/user')
    const result = await data.json();
    console.log(result)
    setShowData(result)

  }
  useEffect(() => {
    getData()
  }, [])



  const deleteUser = async (id) => {
    const data = await fetch(`http://localhost:5600/user/${id}`, {
      method: 'DELETE'
    })
    const result = await data.json()
    console.log(result)
    getData()


  }





  const updateUser = (id) => {
    // Find the user by id in showdata
    const userToUpdate = showdata.find((item) => item._id === id);

    // Populate the state variables with user data
    setUserID(userToUpdate._id);
    setName(userToUpdate.name);
    setEmail(userToUpdate.email);
   setPassword(userToUpdate.password);
   setPhone(userToUpdate.phone);
   setDescription(userToUpdate.description)
  };



  const saveUpdate = async (e) => {
    e.preventDefault()
    try {
      const data = await fetch(`http://localhost:5600/user/${userID}`, {
        method: 'PUT',
        body: JSON.stringify({name, email, password, phone, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await data.json();
      console.log(result);
     
      getData();
      
      // Clear the input fields after a successful update
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setDescription('');
    } catch (error) {
      console.error('Failed to update data!');
    }
  };
  







  return (
    <>

      <div>

        <label htmlFor="Name"> Name:<input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> </label><br />


        <label htmlFor="Email"> Email:<input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /></label><br />


        <label htmlFor="password"> Password:<input type="email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /></label><br />


        <label htmlFor="Phone">Phone:<input type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /></label><br />


        <label htmlFor="Description">Description<input type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /></label><br />


        <button type='submit' onClick={handeSubmit}>Submit</button>
        <button onClick={saveUpdate}>Save</button>

      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Update</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {showdata.map((item) => {
            return <tr key={item._id} id='one'>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.phone}</td>
              <td>{item.description}</td>
              <td><button onClick={() => updateUser(item._id)}>Update</button></td>
              <td><button onClick={() => deleteUser(item._id)}>delete</button></td>
            </tr>
          })}
        </tbody>
      </table>

    </>
  )
}

export default FetchApi