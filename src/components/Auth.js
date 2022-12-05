import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 
const Auth = () => {

    const authCtx = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(true)
 
    const changeName = (e) => {
        setUsername(e.target.value)
    } 

    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const changeRegisterState = (e) => {
        setRegister(!register)
    }
    const submitHandler = e => {
        e.preventDefault()
        // const baseUrl = 'https://socialmtn.devmountain.com'
        const baseUrl = 'http://localhost:3111'

        const body = {
            username,
            password,
        }

        let url = register ? `${baseUrl}/register` : `${baseUrl}/login`

        axios
        .post(url, body)
        .then((res) => {
            console.log(res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
            
        })
        .catch((err) =>{
            setUsername("")
            setPassword("")
            console.error(err)
        })
    }
 
    return (
        <main>
            <h1>Welcome!</h1>
            <form className='form auth-form' onSubmit={submitHandler}>
                <input
                    className='form-input' type = "text" placeholder ="type username" value={username} onChange={changeName}/>
                <input
                    className='form-input' type = "password" placeholder= "enter password" value={password} onChange={changePassword}/>
                <button type = "submit" className='form-btn'>
                    {register ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <button className='form-btn' onClick={changeRegisterState}>Need to {register ? 'Login' : 'Sign Up'}?</button>
        </main>
    )
}
 
export default Auth