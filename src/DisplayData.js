import React, { useState } from 'react'
import { useQuery,useLazyQuery, gql, useMutation } from '@apollo/client'

const QUERY_ALL_USERS = gql`
query getusers{
users {
  id
  age
  name
  nationality
  username
}
}
`
const QUERY_ALL_MOVIES = gql`
query getMovies {
  movies {
  name
  yearOfPublication
  isInTheaters
  }
}
`
const QUERY_A_MOVIE = gql`
query Movie($name:String!) {
  movie(name:$name) {
  name
  yearOfPublication
  }
}
`

const CREATE_USER_MUTATION = gql`
mutation CreateUser($input:createUserInput!) {
  createUser(input:$input) {
  name
  username
  age 
  nationality
  }
}
`

function DisplayData() {
    const [movieSearched,setMovieSearched] = useState("");
    const [name,setName] = useState("");
    const [username,setUserName] = useState("");
    const [age,setAge] = useState(0);
    const [nationality,setNationality] = useState("");

    const { data, loading, error,refetch } = useQuery(QUERY_ALL_USERS)
    const { data:moviesData } = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovies, {data:movieData,error:movieError}] = useLazyQuery(QUERY_A_MOVIE)
    const [createUser] = useMutation(CREATE_USER_MUTATION)
    if (loading) {
        <h1>Data is loading...</h1>
    }

    if (error) {
        console.log(error)
    }
    if (movieError)
    {
        console.log("err",movieError)
    }
     
    return (
        <div>
              <input type="text" placeholder='name' onChange={(event)=>{setName(event.target.value)}}/>
              <input type="text" placeholder=' usename' onChange={(event)=>{setUserName(event.target.value)}}/>
              <input type="number" placeholder='age' onChange={(event)=>{setAge(Number(event.target.value))}}/>
              <input type="text" placeholder='nationality' onChange={(event)=>{setNationality(event.target.value.toUpperCase())}}/>

            <button onClick={()=>{
                createUser({variables:{
                    input:{
                      name,
                      username,
                      age,
                      nationality
                    }
                }})
                refetch()
            }}>Add User</button>
            <h1> Display Users</h1>
            <div>{data && data.users.map((user) => (
                <div style={{ marginBottom: 10, backgroundColor: "beige" }}>
                    <h3>name: {user.name}</h3>
                    <h3>username: {user.username}</h3>
                    <h3>age: {user.age}</h3>
                </div>
            ))}</div>

            <h1> Display Movies</h1>

            <div>{moviesData && moviesData.movies.map((movie) => (
                <div style={{ marginBottom: 10, backgroundColor: "beige" }}>
                    <h3>name: {movie.name}</h3>
                    <h3>year of publication: {movie.yearOfPublication}</h3>
                    <h3>is in theaters: {movie.isInTheaters?"true":"false"}</h3>
                </div>
            ))}</div>

            <input type="text" placeholder='movie name' onChange={(event)=>{setMovieSearched(event.target.value)}}/>
            <button onClick={()=>{
                fetchMovies({variables:{
                   name:movieSearched
                }})
            }}>Fetch movie data</button>
            <div>
                {movieData && 
                <div>
                 <h3> name: {movieData.movie.name} </h3>
                 <h3> yearOfPublication: {movieData.movie.yearOfPublication} </h3>
                </div>}
                {movieError && <h3>An error occured</h3>}
            </div>
        </div>
    )
}

export default DisplayData