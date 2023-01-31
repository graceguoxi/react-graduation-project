import { Avatar, Button, Grid, Paper, TextField } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState } from "react"
import axios from "axios"


const Login = () => {
  const [inputs, setInputs] = useState({})
  const paperStyle={padding:20, height:'70vh', width:360, margin:'20px auto'}
  const avatarStyle={backgroundColor:"#1bbd7e"}
  const btnstyle={margin:'20px 0'}

  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('inputs',inputs)

    axios.post('http://localhost:8000/api/login', inputs)
    .then(res => {
      console.log(res)
      localStorage.setItem('react-project-token', res.data.token)
      localStorage.setItem(
        'react-project-user',
        JSON.stringify(res.data.user)
      )
    })
    .catch()
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => handleChange(e)}
            name='email'
            id='standard-basic'
            variant='standard'
            label='email'
            placeholder='Enter username'
            fullWidth
            required
          />
          <TextField
            onChange={(e) => handleChange(e)}
            name='password'
            id='standard-basic'
            variant='standard'
            label='Password'
            placeholder='Enter password'
            type='password'
            fullWidth
            required
          />
          <Button
            type='submit'
            color='primary'
            variant='contained'
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}
export default Login