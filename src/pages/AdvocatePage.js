import React, {useState, useEffect} from 'react'
import { useParams  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'

const AdvocatePage = () => {
    const params = useParams()
    const username = params.username

    const [advocate, setAdvocate] = useState([null])
  useEffect(() =>{
    getData()

  }, [username]) 

  let getData = async () => {
    // cados.up.railway.app/advocates
    // let response = await axios.get(`http://localhost:8000/advocates/${username}`)
    // let response = await axios.get(`http://localhost:8000/advocates/${username}`)
    let response = await axios.get(`https://alldev.pythonanywhere.com/advocates/${username}`)
    console.log('RESPONSE:', response)
    setAdvocate(response.data)
  }

  return (
    <>
        {advocate && (
            <div className='advocate__preview__wrapper' >
            <p><Link to={'/'}>Home</Link></p>
            {/* <Link to={`/advocate/${advocate.username}`}> */}
                      <img className='advocate_preview_image' alt='{advocate.username}' src={advocate.profile_pic}/>
            {/* </Link> */}
            <strong>{advocate.name}</strong>
            <br/>
                  <a href={advocate.twitter}>@{advocate.username}</a>
                  <br/>
                  <strong>Followers: {advocate.followers}</strong>
						      <br/>
					        <strong>Joined Since: {advocate.joined}</strong> 
                  {/* <Link to={`/advocate/${advocate.username}`}> View</Link> */}             
                  {/* <Link to={`/advocate/${advocate.username}`}> View Advocate </Link> */}
            <small><p>{advocate.bio}</p></small>
                </div>
        )}          
    </>
  )
}

export default AdvocatePage