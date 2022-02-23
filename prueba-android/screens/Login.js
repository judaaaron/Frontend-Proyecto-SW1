import react from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";

import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle
} from '../components/styles';

export const Login = ()=>{
    const [openModal, setOpenModal] = useState(false);
    return(
        <StyledContainer>
            <InnerContainer>
                <PageLog  resizeMode = "cover" source ={require('../assets/drofamilogo1.jpg')}/>
                <PageTitle>Drogueria y Farmacia Centroámerica Milenio</PageTitle>
            </InnerContainer>
        <Button onPress={() => setOpenModal(!openModal)}>
            <Text>Holaa</Text>
        </Button>
        <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
            <Text>Hola Hola Holaaaa</Text>
        </Modal>
        </StyledContainer>
    );
}

export default Login;