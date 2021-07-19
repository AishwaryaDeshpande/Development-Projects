import React, { Fragment } from 'react';
import './Home.css';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GridListTile  from "@material-ui/core/GridListTile";
import GridListTileBar  from "@material-ui/core/GridListTileBar";
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';

const Home = function(){

    const [upcomingMovieList,setMovieList] = React.useState([]);
    const [releasedMovieList,setReleasedMovieList] = React.useState([]);
    const [genresList,setGenresList] = React.useState([]);
    const [artistList,setArtistList] = React.useState([]);
    //let upcomingMovieList = [];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchor2, setAnchor2] = React.useState(null);
    const open = Boolean(anchor2);

    const handleGenreClick = (event) => {
      if(anchorEl == null){
        setAnchorEl(event.currentTarget);
      }else{
        setAnchorEl(null);
      }
      
    };
    const handleArtistClick = (event) => {
      if(anchor2 == null){
        setAnchor2(event.currentTarget);
        console.log(event.currentTarget)
      }else{
        setAnchor2(null);
      }
      
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleArtistClose = () => {
      setAnchor2(null);
    };

    const getArtistList = async function(){
      try{
        const rawResponse = await fetch('http://localhost:8085/api/v1/artists?page=1&limit=10',{
        method:'GET',
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json;charset=UTF-8"
        }
        });
        const result = await rawResponse.json();
        if(rawResponse.ok){
          //upcomingMovieList = result.movies;
            
            const tempArray = []
            for(var i=0;i < result.artists.length ;i++){
              tempArray.push(result.artists[i].first_name+" "+result.artists[i].last_name)
            }
            setArtistList(tempArray);
            console.log(tempArray);
        }else{
            const error = new Error();
            error.message = result.message || "default error messgae";
            throw error;
        }
      }catch(e){
          alert(`Error: ${e.message}` )

      }   
    }

    const getUpcomingMovies =  async function(){
        try{
            const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=8',{
            method:'GET',
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json;charset=UTF-8"
            }
            });
            const result = await rawResponse.json();
            if(rawResponse.ok){
              //upcomingMovieList = result.movies;
                setMovieList(result.movies);
                console.log(result.movies);
            }else{
                const error = new Error();
                error.message = result.message || "default error messgae";
                throw error;
            }
        }catch(e){
            alert(`Error: ${e.message}` )

        }   
    }

    const getReleasedMoviesWithFilters = async function(){
      try{
        const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1',{
        method:'GET',
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json;charset=UTF-8"
        }
        });
        const result = await rawResponse.json();
        if(rawResponse.ok){
          //upcomingMovieList = result.movies;
          setReleasedMovieList(result.movies);
            console.log(result.movies);
        }else{
            const error = new Error();
            error.message = result.message || "default error messgae";
            throw error;
        }
      }catch(e){
          alert(`Error: ${e.message}` )

      }   
      
    }

    const getGenreList = async function(){
      try{
        const rawResponse = await fetch('http://localhost:8085/api/v1/genres',{
        method:'GET',
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json;charset=UTF-8"
        }
        });
        const result = await rawResponse.json();
        if(rawResponse.ok){
          //upcomingMovieList = result.movies;
            setGenresList(result.genres);
            console.log(result.genres);
        }else{
            const error = new Error();
            error.message = result.message || "default error messgae";
            throw error;
        }
      }catch(e){
          alert(`Error: ${e.message}` )

      }   
    }
    const options = ["test"]
    React.useEffect(()=>{
      getUpcomingMovies();
      getReleasedMoviesWithFilters();
      getGenreList();
      getArtistList();
    },[])
    //
    const [movieFilters, setmovieFilters] = React.useState({
      moviename:"",
      genres:"",
      artist :"",
      releaseStartDate:"",
      releaseEndDate:""
    });

    const filterChangedHandler = (e) =>{
      const filters = movieFilters;
      filters[e.target.name] = e.target.value;
      setmovieFilters({...filters});

    }
    const {moviename,genres,artist,releaseStartDate,releaseEndDate} = movieFilters;
    return (
        <Fragment>
            <div className = "sub_header">
                <p>Upcoming Movies</p>
            </div>

            <div className="grid-scrollMenu">
              {
                upcomingMovieList.map(sub => {
                  return <GridListTile key={sub.id} className="grid-container row-container">
                    <img src= {sub.poster_url}></img>
                    <div className="movie-details">
                          <p className= "title">{sub.title}</p>
                    </div>
                    <GridListTileBar><p>{sub.title}</p></GridListTileBar>
                    </GridListTile> 
                })
              }
            </div>
            <div className="main-container">
              <div className="released-movies">
              <Grid container spacing={0} >
                {
                    releasedMovieList.filter(movie => movie.status == "RELEASED").map(sub => {
                      return <Grid key={sub.id} className="released-movie row-container" >
                          <GridListTile>
                          <img src= {sub.poster_url}></img>
                          <div className="movie-details">
                            <p className= "title">{sub.title}</p>
                            <p className= "release-date">Release Date: {sub.release_date}</p></div>
                          </GridListTile>
                                          
                        </Grid> 
                    })
                  }                  
                </Grid>
              
              </div>
              <div className = "filters">
              <Card >
                <CardContent>
                  <p className="filter-title">
                  FIND MOVIES BY
                  </p>
                  <form  className="subscriber-form" onSubmit = {getReleasedMoviesWithFilters}>
                      <TextField id="moviename" type="text" name = "moviename"
                            label="Movie Name" 
                            defaultValue = {moviename}  onChange = {filterChangedHandler}>
                      </TextField>
                      <TextField id="genres" type="text" name = "genres"
                          label="Genres" 
                          defaultValue = {genres} onClick = {handleGenreClick} onChange = {filterChangedHandler}>
                          <Menu id="long-menu" anchorEl={anchorEl}
                            keepMounted  onClose={handleClose}
                            PaperProps={{
                              style: {
                                maxHeight: 48 * 4.5,
                                width: '20ch',
                              },
                            }}>
                            {genresList.map((option) => (
                              <FormControlLabel
                              value={option}
                              control={<Checkbox color="primary" />}
                              label={option}
                              labelPlacement="end"
                              />
                            ))}
                          </Menu>
                      </TextField>
                      <div>
                          <TextField id="artists" type="text" name = "artists"
                              label="Artists" 
                              defaultValue = {artist}  onClick = {handleArtistClick} onChange = {filterChangedHandler}>
                              </TextField>  
                                <Menu id="long-menu" anchor2={anchor2}
                                  open={open} onClose={handleArtistClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                  },
                                }}>
                                { artistList.map((option) => (
                                  <FormControlLabel
                                  value={option.first_name}
                                  control={<Checkbox color="primary" />}
                                  label={option}
                                  labelPlacement="end"
                                  key= {option.id} />
                                  // <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                  //   {option}
                                  // </MenuItem>
                                ))}
                              </Menu>
                      </div>
                      <TextField id="releaseStartDate" label="Release Start Date" type="date"
                        defaultValue="yyyy-mm-dd" InputLabelProps={{
                          shrink: true, 
                        }}> 
                        
                      </TextField>
                      <TextField id="releaseEndDate" label="Release End Date" type="date"
                        defaultValue="yyyy-mm-dd" InputLabelProps={{
                          shrink: true,
                        }}/> 
                                           
                      <Button type="submit" variant="contained" color="primary">Apply</Button>
                    </form >
                </CardContent>
              </Card>
              </div>
            </div>
            
        </Fragment>
    )
}

export default Home;

