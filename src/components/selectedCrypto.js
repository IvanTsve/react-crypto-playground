import styled from "styled-components";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getData from "../helpers/fetch";
import ENDPOINTS from "../helpers/endpoint";


const SelectedCrypto = (d) => {
    const history = useHistory();
    const [singleCrypto, setSingleCrypto] = useState({});
    useEffect(() => {
        setSingleCrypto(d.data)
    }, [d.data]);
    const onClosingSelectedCrypto = () => {
        d.onClick();
    }
    const onBuySelectedCrypto = (x) => {
        x.preventDefault();
        if (x.target.amount.value <= 0) return;
        const data = {
            name: singleCrypto.name,
            amount: x.target.amount.value,
            price: (Number(singleCrypto.price).toFixed(2)),
            img: d.data.logo_url,
            uid: (JSON.parse(localStorage.getItem('user'))).id,
            coinId: singleCrypto.id,
        }
        const payLoad = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        getData(`${ENDPOINTS.post_data}${(JSON.parse(localStorage.getItem('user'))).id}.json`, payLoad)
            .then(r => {
                history.push({
                    pathname: '/user/profile',
                    data: r
                });
            })
    }
    return (
        <>
            {
                singleCrypto ?
                    <SelectedCoinForm onSubmit={onBuySelectedCrypto}>
                        <CoinHeadContainer>
                            <CoinImage src={singleCrypto.logo_url} alt={singleCrypto.currency} ></CoinImage>
                            <CoinName>{singleCrypto.name}</CoinName>
                        </CoinHeadContainer>
                        <CoinList>
                            <CoinListItem><strong>Rank</strong> {singleCrypto.rank}</CoinListItem>
                            <CoinListItemAmountLabel><strong>Amount</strong></CoinListItemAmountLabel>
                            <CoinListItemAmountInput type="number" name="amount" />
                            <CoinListItem><strong>Price</strong> {(Number(singleCrypto.price).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$</CoinListItem>
                            <CoinListItem><strong>Date</strong> {singleCrypto.price_date}</CoinListItem>
                            <CoinListItem><strong>Market cap</strong> {singleCrypto.market_cap}</CoinListItem>
                        </CoinList>
                        <CloseButton onClick={onClosingSelectedCrypto}>Close</CloseButton>
                        <BuyButton>Buy</BuyButton>
                    </SelectedCoinForm>
                    : null
            }
        </>
    )
}

const SelectedCoinForm = styled.form`
    width:  25rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 20px;
    background-color: white;
    background-color: whitesmoke;

    button {
        border: 1px solid black;
        text-decoration: none;
        color: black;
        background-color: white;
        padding: 5px 10px;
        margin: 10px 15px 10px 0px;
        cursor: pointer;
    }
`;
const CoinHeadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CoinName = styled.h1`
    text-align: center;
    margin-left: 5px;

`;
const CoinImage = styled.img`
    width: 50px;
    height: 50px;
`;
const CoinList = styled.ul`
    list-style: none outside;
    padding-left: 0;
`;
const CoinListItem = styled.li`
    margin-bottom: 5px;
`;
const CoinListItemAmountLabel = styled.label``;
const CoinListItemAmountInput = styled.input`
    margin-left: 10px;
    width: 3rem;
    border: 1px solid grayt;
    background: white;
    padding: 2px;
`;
const CloseButton = styled.button``;
const BuyButton = styled.button``;
export default SelectedCrypto;