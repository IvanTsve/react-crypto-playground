import styled from "styled-components";
import Navigation from "./navigation";
import getData from "../helpers/fetch";
import ENDPOINTS from '../helpers/endpoint';
import { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";


const UserProfile = (e) => {
   
    const history = useHistory();
    // let user = JSON.parse(localStorage.getItem('user'));
    const [myCoins, setMyCoins] = useState([]);

    useEffect(() => {
        getData(`${ENDPOINTS.get_data}${(JSON.parse(localStorage.getItem('user'))).id}.json`)
            .then(r => {
                setMyCoins(r)
            })
    }, [])

    const onSellingCoinHandler = (x) => {
        if (x.target.tagName !== "BUTTON") return;
        const coinId = x.target.parentNode.id;
        const payload = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }, 
        }

        getData(`${ENDPOINTS.get_data}${(JSON.parse(localStorage.getItem('user'))).id}/${coinId}.json`,payload)
        .then(r => {
            history.push("/");
        })
    }

    return (
        <>
            <Navigation />
            {
                myCoins ?
                    <CoinsContainer onClick={onSellingCoinHandler}>
                        {
                            Object.entries(myCoins).map(x => {
                                return (
                                    <Coin key={x[0]} id={x[0]}>
                                        <CoinImage src={x[1].img} />
                                        <CoinName>{x[1].name}</CoinName>
                                        <CoinAmout>Amount: {x[1].amount}</CoinAmout>
                                        <CointPrice>Price: {(Number(x[1].price * x[1].amount).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$</CointPrice>
                                        <SellButton>Sell</SellButton>
                                    </Coin>
                                )
                            })
                        }
                    </CoinsContainer>
                    : <h1>No coins found</h1>
            }
        </>
    )
}

const CoinsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Coin = styled.div`
    border: 2px solid black;
    margin: 15px 20px;
    padding: 20px;

`;

const CoinName = styled.h3``;
const CoinAmout = styled.p``;
const CointPrice = styled.p``;
const CoinImage = styled.img`
    width:50px;
    height: 50px;
`;

const SellButton = styled.button``;


export default UserProfile;