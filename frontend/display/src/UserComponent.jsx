import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'

const UserComponent = () => {
    const [users,setUsers]=useState([]);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');


    const fetchUsers = async ()=>{
       const respone = await axios.get('http://localhost:5000/users');
       setUsers(respone.data);
    }

    const addUser = async ()=>{
        const response = await axios.post('http://localhost:5000/users',{name,email});
        setUsers([...users,response.data]);
        setName('');
        setEmail('');
    }

    useEffect(()=>{
        fetchUsers();
    },[]);
  return (
    <div>
       <h1>Users</h1>
       <input type="text" placeholder="value" value={name} onChange={(e)=>setName(e.target.value)}/>
       <input type="EMAIL" placeholder="value" value={email} onChange={(e)=>setEmail(e.target.value)}/>
       <button onClick={addUser}>add User</button>
        <ul>
            {users.map(user=>(<li key={user.id}>{user.name} - {user.email}</li>))}
        </ul>
    </div>
  )
}

export default UserComponent
