import React, { Fragment } from 'react';
import './Details.css';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const Details = function() {
    const [movieDetails,setMovieDetails] = React.useState({});
    const [artists,setArtists] = React.useState([]);

    const getMovieById =  async function(id){
        try{
            const rawResponse = await fetch('http://localhost:8085/api/v1/movies/'+id,{
            method:'GET',
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json;charset=UTF-8",
                "id": {id}
            }
            });
            const result = await rawResponse.json();
            if(rawResponse.ok){
              //upcomingMovieList = result.movies;
                const tempValue = result;
                tempValue.trailer_url = tempValue.trailer_url.split("?v=")[1]
                setMovieDetails(tempValue);
                console.log(tempValue.artists);
                setArtists(tempValue.artists)
            }else{
                const error = new Error();
                error.message = result.message || "default error messgae";
                throw error;
            }
        }catch(e){
            alert(`Error: ${e.message}` )

        }   
    }
    React.useEffect(()=>{
        getMovieById("009ae262-a234-11e8-b475-720006ceb890");
      },[])

      const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const _onReady =  function(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    return (
        <Fragment>
            <button id= "back"> &lt; Back to home </button>
            <div className="main-container">
                <div className = "left-part">
                    <img src={movieDetails.poster_url}></img>
                </div>
                <div className = "middle-part">
                     <Typography variant="headline" component="h2">
                     {movieDetails.title}
                    </Typography>
                    <Typography variant="subtitle2" component="h3">
                     Genres: <Typography component="h3">{movieDetails.genres}</Typography>
                    </Typography>
                    <Typography variant="subtitle2" component="h3">
                     Duration: <span className="detailValues">{movieDetails.duration}</span>
                    </Typography>
                    <Typography variant="subtitle2" component="h3">
                     Release Date: <span className="detailValues">{movieDetails.release_date}</span>
                    </Typography>
                    <Typography variant="subtitle2" component="h3">
                     Rating: <span className="detailValues">{movieDetails.rating}</span>
                    </Typography>
                    <Typography variant="subtitle2" component="h3">
                    Plot: <span className="detailValues">{movieDetails.storyline}</span>
                    </Typography>
                    <Typography variant="subtitle2" component="h3">
                    Trailer: 
                    </Typography>
                    <YouTube videoId={movieDetails.trailer_url} opts={opts} onReady={_onReady} />;
                    
                </div>
                <div className ="right-part">   
                    <Typography variant="subtitle2" component="h3">
                    Rate this movie: 
                    </Typography>    
                    <StarBorderIcon/> 
                    <StarBorderIcon/>  
                    <StarBorderIcon/>  
                    <StarBorderIcon/>  
                    <StarBorderIcon/>    
                    <Typography variant="subtitle2" component="h3">
                    Artist: 
                    </Typography>     
                    {/* {artists.artists.map(sub => {
                      return <div>
                          <img src= {sub.profile_url}></img>
                          <p>{sub.first_name} {sub.last_name}</p>
                          </div>

                    })}   */}
                </div>
            </div>
        </Fragment>
    )
}

export default Details;