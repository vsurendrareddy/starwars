import React, { useState, useEffect } from 'react';
import Api from './Helpers/Api';
import { GET_ALL_SHIPS } from './Helpers/EndPoints';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


function App() {
  const [data, setData] = useState([]);
  const api = new Api();
  const [max, setMax] = useState(0);

  const getStarShips = async() =>{
    let url = 'https://swapi.dev/api/starships';
    await api.get(url).then((response) => {
      console.log(response);
      let data = response.data.results;
      let sorted = data.filter((ele) => {return ele.crew <= 10;});
      console.log(JSON.stringify(sorted));
      setData(sorted);
    }).catch((err) => console.log(err));
  }

  
  useEffect(()=>{
    if(data.length > 0){
       const arr = data.map((ele)=> {return (ele.films).length;});
       console.log(Math.max(...arr));
       setMax(Math.max(...arr));
    }
  },[data])

  return (
    <Grid>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection={'row'}
        style={{
          backgroundColor:"rgb(234, 237, 242)",
        }}>
          <Typography variant='h3'>
            Starwars
          </Typography>

        </Box>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection={'row'}
        style={{
          backgroundColor:"rgb(234, 237, 242)",
        }}>
          <Typography variant='h4'>
            Sample React Project
          </Typography>

        </Box>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection={'row'}
        style={{
          backgroundColor:"rgb(234, 237, 242)",
        }}>
          <Typography variant='h5'>
              Results are sorted which crew size lessthan or equal to 10
          </Typography>

        </Box>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection={'row'}
        style={{
          backgroundColor:"rgb(234, 237, 242)", 
        }}>
           <Button variant="contained" onClick={() => getStarShips()} sx={{margin:'2%'}}>Get StarShips</Button>
        </Box>
      
        {
      data.map((ele, i)=>{
        return <Box
        display="flex"
        justifyContent="center"
        flexDirection={'row'}
        style={{
          backgroundColor:"rgb(234, 237, 242)",
        }}
        key={i}
      >
        <Grid item lg={10} md={10} sm={10} xs={10} justifyContent="center" alignItems="center" sx={{ width: '80%', marginTop: '2%', marginBottom:'2%' }}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Grid container>
                  <Grid item lg={10}>
                    <Typography variant={'h5'} color="text.primary">
                      {ele.name}
                    </Typography>
                    <Typography variant={'h7'} color="text.secondary">
                      Model: {ele.model}
                    </Typography>
                  </Grid>
                  <Grid item lg={2}>
                    <Typography variant={'h7'} color="text.secondary">
                      No of Films: {(ele.films).length}{(ele.films).length == max ? <EmojiEventsIcon color='yellow' /> : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
      </Box>
      })
    }
    </Grid>
    
        
    
    
  );
}

export default App;
