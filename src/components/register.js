import styled from "styled-components";
import ENDPOINTS from "../helpers/endpoint";
import fb from "../helpers/fb"
import getData from "../helpers/fetch";
import Navigation from "./navigation";
const Register = (x) => {

    const onRegisterHandler = (x) => {
        x.preventDefault();

        const data = {
            email: x.target.uname.value,
            password: x.target.psw.value,
        }
        const payLoad = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        getData(ENDPOINTS.register + fb.apiKey, payLoad)
            .then(r => console.log('Registered new user'));

    }
    return (
        <>
            <Navigation />
            <RegisterForm onSubmit={onRegisterHandler}>
                <RegisterFormHeader>Register</RegisterFormHeader>
                <FormCointainer className="container">
                    <UsenameLabel htmlFor="uname"><strong>Username</strong></UsenameLabel>
                    <UsernameInput type="text" placeholder="Enter Username" name="uname" required />
                    <PasswordLabel htmlFor="psw"><strong>Password</strong></PasswordLabel>
                    <PasswordInput type="password" placeholder="Enter Password" name="psw" required />
                </FormCointainer>
                <RegisterButton type="submit">Register</RegisterButton>
            </RegisterForm>
        </>
    )
}
const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
    height: 100vh;
    
`;
const RegisterFormHeader = styled.h1`
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
const RegisterButton = styled.button`
    border: none;
    padding: 5px 10px;
    margin: 10px 0px;
    background-color: white;
    border-radius: 5px;
`;
export default Register;