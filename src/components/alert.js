import styled from "styled-components";

const Alert = () => {
    return(
        <AlerDiv>login to buy coins</AlerDiv>
    )
}

const AlerDiv = styled.div`
    z-index: 20;
    background-color: salmon;
    color: white;
    text-align: center;
    padding: 5px 0px;
`;



export default Alert;