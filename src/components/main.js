import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import SelectedCrypto from './selectedCrypto';
import getData from '../helpers/fetch';
import endpoints from '../helpers/endpoint';
import Navigation from './navigation';
import Alert from './alert';

const Main = (x) => {
    const [coins, setCoins] = useState([]);
    const [blur, setBlur] = useState({ filter: "blur(0px)" });
    const [singleCoin, setSingleCoin] = useState();
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        getData(endpoints.get_all)
            .then(d => {
                setCoins(d);
            })
    }, []);
    const onSelectedCryptoHandler = (x) => {
        
        if (x.target.parentNode.tagName !== 'TR' || (!!x.target.parentNode.id !== true)) return;
        if (!user) return;

        getData(endpoints.get_selected + x.target.parentNode.id)
            .then(r => setSingleCoin(...r))
        setBlur({ filter: "blur(5px)" })
    }

    const handleClose = () => {
        setSingleCoin(null);
        blur.filter === 'blur(5px)' ? setBlur({ filter: "blur(0px)" }) : setBlur({ filter: "blur(5px)" })
    }

    return (
        <>
            <Navigation />
           {!user ? <Alert/> : null}
            <Table theme={blur} onClick={onSelectedCryptoHandler} >
                <TableBody >
                    <CoinRow>
                        <TableHeadData>Rank</TableHeadData>
                        <TableHeadData>Name</TableHeadData>
                        <TableHeadData>Price</TableHeadData>
                        <TableHeadData>Price change in 1D</TableHeadData>
                    </CoinRow>


                    {
                        coins.map(x => {
                            return (
                                <CoinRow key={x.id.toString()} id={x.id}>
                                    <CoinRank>{x.rank}</CoinRank>
                                    <CoinName><CoinImg src={x.logo_url} alt={x.currency} />{x.name}</CoinName>
                                    <CoinPrice>{(Number(x.price).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$</CoinPrice>
                                    <OneDayChange>1D change {Number((Number(x["1d"].price_change) / Number(x.price)) * 100).toFixed(2)}%</OneDayChange>
                                </CoinRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            {
                singleCoin ?
                    <>
                        <SelectedCrypto onClick={handleClose} data={singleCoin}></SelectedCrypto>
                    </>
                    :  null
            }
        </>
    )
}

const Table = styled.table`
    filter: ${props => props.theme.filter};
     position: absolute;
    border-collapse: collapse;
    width: 100%;
    tr {
      border-bottom: 1px solid black;
    }
    td, th {
        text-align: left;
        padding: 8px;
    }
    td {
        cursor: pointer;
    }
`;

Table.defaultProps = {
    theme: {
        filter: "blur(0px);"
    }
}

const TableBody = styled.tbody``
const TableHeadData = styled.th``;
const CoinRow = styled.tr`
:hover:not(:first-child) {
   background: darkgrey;
   color: white;
  }
`;

const CoinRank = styled.td``;
const CoinImg = styled.img`
    width: 50px;
    height: 50px;
`;

const CoinName = styled.td`
display: flex;
align-items: center;
 * {
     padding-right: 3px;
 }
  &:before {
  }
`;

const CoinPrice = styled.td``;
const OneDayChange = styled.td``;
export default Main;