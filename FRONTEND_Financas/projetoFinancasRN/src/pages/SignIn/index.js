import React, {useRef, useState, useContext} from "react";
import { View, Text, Platform, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from "./styles";
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from "../../contexts/auth";

export default function SignIn(){
    const navigation = useNavigation();
    const inputEmail = useRef(false);
    const inputSenha = useRef(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {signIn, loadingAuth} = useContext(AuthContext);

    function removeFocus(){
        inputEmail.current?.blur();
        inputSenha.current?.blur();
    }
    function handleLogin(){
        signIn(email, senha)
    }
  return(
    <TouchableWithoutFeedback
    onPress={removeFocus}
    >
        <Background>

            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
            >

                <Logo
                source={require('../../assets/Logo.png')}
                />

                <AreaInput>
                    <Input
                    placeholder="Seu Email"
                    placeholderTextColor="#121212"
                    ref={inputEmail}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                    placeholder="Sua Senha"
                    placeholderTextColor="#121212"
                    ref={inputSenha}
                    value={senha}
                    onChangeText={(text) => setSenha(text)}
                    secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton
                activeOpacity={0.8}
                onPress={handleLogin}>
                    {
                    loadingAuth?(
                        <ActivityIndicator size={20} color="#FFF"/>
                    )
                    :
                    (
                        <SubmitText>Acessar</SubmitText>
                    )
                    }
                </SubmitButton>

                <Link
                onPress={()=> navigation.navigate('SignUp')}>
                    <LinkText>Criar uma conta!</LinkText>
                </Link>


            </Container>

        </Background>
    </TouchableWithoutFeedback>
  );
}