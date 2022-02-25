import React from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from "./../components/styles";


const Home = () => {
    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage
                    resizeMode="cover"
                    source={require("../assets/drofamilogo1.jpg")}
                />
                <WelcomeContainer>
                    <PageTitle welcome={true} >Drogueria y Farmacia</PageTitle>
                    <PageTitle welcome={true} >Centroámerica Milenio</PageTitle>
                   <StyledFormArea>
                       <Avatar resizeMode="cover" source={require("../assets/azul.png")} />
                        <StyledButton >
                            <ButtonText>
                                Cerrar Sesion
                            </ButtonText>
                        </StyledButton>

                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};



export default Home;

{
    /* <Button onPress={() => setOpenModal(!openModal)}>
              <Text>Holaa</Text>
          </Button>
          <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
              <Text>Hola Hola Holaaaa</Text>
          </Modal> */
}