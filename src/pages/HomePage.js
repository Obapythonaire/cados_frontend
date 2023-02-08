import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const HomePage = () => {
  const [advocates, setAdvocates] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState(null)

  useEffect(() =>{
    getData()
  }, []) 

  let getData = async (query='') => {
    // let response = await axios.get('http://localhost:8000/advocates/')
    // let response = await axios.get(`http://localhost:8000/advocates?query=${query}`)
    let response = await axios.get(`https://alldev.pythonanywhere.com/advocates/?query=${query}`)
    console.log('RESPONSE:', response)
    setAdvocates(response.data)
    // setAdvocates(response.data.advocates)
	  // setTotal(advocates.length)
    setTotal(response.data.length)
	  // setPagination(response.data.pagination)
    setPagination(response.data.pagination)
  }

  let searchData = (e) =>{
    e.preventDefault()
    let query = e.target.query.value
    getData(query)
  }

  return (
	
    <div className='main__container'>
		<p><Link to={'/'}>AllDev</Link></p>
        <h2>A List of {total} Developer Advocates All Over The World (From Twitter)!</h2>

		<div className='form--wrapper'>
			<form onSubmit={searchData} id='search-form'>
				<input type='text' name='query' placeholder='Search Advocates...' />
				<input className='btn--primary' type='submit' value='Search' />
			</form>
		</div>

        <div className='advocate__list'>
          {advocates.map((advocate, index) => (
            <div className='advocate__preview__wrapper' key={index}>

				<div className='advocate__preview__header'>
					<Link to={`/advocate/${advocate.username}`}>
							<img className='advocate_preview_image' alt='{advocate.username}' src={advocate.profile_pic}/>
					</Link>
					<div>
						<strong>{advocate.name}</strong>
						<br/>
						<a href={advocate.twitter} target="_blank" >@{advocate.username}</a>  
					</div>
          <div>
          <strong>Followers: {advocate.followers}</strong>
						<br/>
					<strong>Joined Since: {advocate.joined}</strong> 
          </div>
					{/* <Link to={`/advocate/${advocate.username}`}> View</Link> */}             
					{/* <Link to={`/advocate/${advocate.username}`}> View Advocate </Link> */}
					
				  </div>
					<small className='bio--preview'><p>{advocate.bio}</p></small>
          </div>
          ))}
        </div>
    </div>
  )
}

export default HomePage