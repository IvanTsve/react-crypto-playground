import styled from "styled-components";
import { Link } from "react-router-dom";

const Navigation = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const logOut = () => {
       return localStorage.removeItem('user');
    }

    return (
        <NavigationContainer>
            {
                user ?
                    <>
                        <Home><Link to="/"> Main</Link></Home>
                        <Profile><Link to="/user/profile">Profile</Link></Profile>
                        <LogOut onClick={logOut}><Link to="/">LogOut</Link></LogOut>
                    </>
                    :
                    <>
                        <Home><Link to="/"> Main</Link></Home>
                        <Login><Link to="/user/login">Login</Link></Login>
                        <Register><Link to="/user/register">Register</Link></Register>
                    </>
            }

        </NavigationContainer>


    )
}

const NavigationContainer = styled.nav`
display: flex;
justify-content: end;
padding: 10px 0px;
background: gray;
 
a {
    margin-right: 10px;
    color: white;
    text-decoration: none;
}
`;
const Login = styled.span``;

const Register = styled.span``;
const Profile = styled.span``;
const Home = styled.span``;
const LogOut = styled.span``;


export default Navigation;

