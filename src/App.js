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
import backgroundImage from '../src/assets/background.jpg';
import logo from '../src/assets/logo.png';


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
    getStarShips();
  },[])

  useEffect(()=>{
    if(data.length > 0){
       const arr = data.map((ele)=> {return (ele.films).length;});
       console.log(Math.max(...arr));
       setMax(Math.max(...arr));
    }
  },[data])

  return (
    <Grid style={{backgroundImage: `url(${backgroundImage})`, backgroundSize:'cover'}}>
        <Grid style={{top:'3%'}}>
          <Box
          display="flex"
          justifyContent="center"
          flexDirection={'row'}
          style={{
            // backgroundColor:"rgb(234, 237, 242)",
          }}>
            
           <img src={logo} width={400} height={150} alt='logo' />
          </Box>
          <Box
          display="flex"
          justifyContent="center"
          flexDirection={'row'}
          style={{
            // backgroundColor:"rgb(234, 237, 242)",
          }}>
            <Typography variant='h4' color={'#ffffff'}>
              Sample React Project
            </Typography>

          </Box>
          <Box
          display="flex"
          justifyContent="center"
          flexDirection={'row'}
          style={{
            // backgroundColor:"rgb(234, 237, 242)",
          }}>
            <Typography variant='h5' color={'#ffd600'}>
                Results are sorted which crew size <br /> lessthan or equal to 10
            </Typography>

          </Box>
        </Grid>
        <Box
        display="flex"
        justifyContent="center"
        flexDirection={'row'}
        style={{
          // backgroundColor:"rgb(234, 237, 242)", 
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
          // backgroundColor:"rgb(234, 237, 242)",
        }}
        key={i}
      >
        <Grid item lg={10} md={10} sm={10} xs={10} justifyContent="center" alignItems="center" sx={{ width: '80%', marginTop: '2%', marginBottom:'2%' }}>
            <Card sx={{ minWidth: 275, backgroundColor:'#ffd600' }}>
              <CardContent>
                <Grid container>
                  <Grid item lg={10} xs={12} md={10} sm={12}>
                    <Typography variant={'h5'} color="text.primary">
                      {ele.name}
                    </Typography>
                    <Typography variant={'h7'} color="text.secondary">
                      Model: {ele.model}
                    </Typography>
                  </Grid>
                  <Grid item lg={2} xs={12} md={2} sm={12}>
                    <Typography color="text.secondary">
                      No of Films: {(ele.films).length}
                     </Typography><br /> 
                    <Typography color="text.secondary">
                     {(ele.films).length == max ? <EmojiEventsIcon fontSize={'20'} style={{color:'red', fontSize:30, marginLeft:"25%"}} /> : ""}
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
