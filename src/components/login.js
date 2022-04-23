import styled from "styled-components";
import getData from "../helpers/fetch";
import ENDPOINTS from "../helpers/endpoint";
import fb from "../helpers/fb"
import {  useHistory } from "react-router-dom";
import Navigation from "./navigation";


const Login = (e) => {
    const history = useHistory();
    const onLoginHandler = (x) => {
        x.preventDefault();
        const data = {
            email: x.target.uname.value,
            password: x.target.psw.value,
        }
        const payload = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
        getData(ENDPOINTS.login + fb.apiKey, payload)
            .then(r => {
                if (r.error) return;
                let user = {
                    'isLogged': r.registered,
                    'id': r.localId,
                    'username': (r.email).split('@')[0]
                }
                localStorage.setItem('user', JSON.stringify(user));
                history.push(
                    {
                        pathname: '/user/profile',
                        data: r
                    }
                    );
            })
            .catch(e => console.error(e))
    }
    return (
        <>
            <Navigation/>
            <LoginForm onSubmit={onLoginHandler}>
                <LoginFormHeader>Login</LoginFormHeader>
                <FormCointainer className="container">
                    <UsenameLabel htmlFor="uname"><strong>Username</strong></UsenameLabel>
                    <UsernameInput type="text" id="uname" placeholder="Enter Username" name="uname" required />
                    <PasswordLabel htmlFor="psw"><strong>Password</strong></PasswordLabel>
                    <PasswordInput type="password"  id="psw" placeholder="Enter Password" name="psw" required />
                </FormCointainer>
                <LoginButton type="submit">Login</LoginButton>
            </LoginForm>
        </>
    )

}
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
    height: 100vh;
    
`;
const LoginFormHeader = styled.h1`
    margin-top: 0;
    padding: 10px 0px;

`;
const FormCointainer = styled.div`
    display: flex;
    flex-direction: column;
    input {
        width: 15rem;
        padding: 5px;
        border: 1px solid black;
        border-radius: 5px;
        margin-bottom: 5px;
    };
    label {
        padding-bottom: 5px;
    };
`;
const UsenameLabel = styled.label``;
const UsernameInput = styled.input``;
const PasswordLabel = styled.label``;
const PasswordInput = styled.input``;
const LoginButton = styled.button`
    border: none;
    padding: 5px 10px;
    margin: 10px 0px;
    background-color: white;
    border-radius: 5px;

`;
export default Login;
