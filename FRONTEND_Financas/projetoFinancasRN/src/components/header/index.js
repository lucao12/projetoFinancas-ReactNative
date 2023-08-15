import React from "react";
import { Container, Title, ButtonMenu } from "./styles";
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

export default function Header({ title }){
    const navigation = useNavigation();
    return(
        <Container>

            <ButtonMenu onPress={()=> navigation.openDrawer()}>
                <Feather name="menu" color="#121212" size={35}/>
            </ButtonMenu>

            {title && (
                <Title>
                    {title}
                </Title>
            )}
        </Container>
    );
}