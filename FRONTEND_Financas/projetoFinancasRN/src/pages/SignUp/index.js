import React, { useRef, useContext, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Platform, Alert, ActivityIndicator } from "react-native";
import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles'
import { AuthContext } from "../../contexts/auth";

export default function SignUp(){
  const inputEmail = useRef(false);
  const inputSenha = useRef(false);
  const inputNome = useRef(false);
  const {signUp, loadingAuth} = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  



  function handleSignUp(){
    if(nome === ''){
      Alert.alert('ERRO!', 'Preencha o campo nome para prosseguir');
      return;
    }
    else if(email === ''){
      Alert.alert('ERRO!', 'Preencha o campo email para prosseguir');
      return;
    }
    else if(senha === ''){
      Alert.alert('ERRO!', 'Preencha o campo senha para prosseguir');
      return;
    }  
    signUp(nome, email, senha);
  }

  function removeFocus(){
      inputEmail.current?.blur();
      inputSenha.current?.blur();
      inputNome.current?.blur();
  }
  return(
    <TouchableWithoutFeedback
    onPress={removeFocus}>

      <Background>

        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        >

          <AreaInput>

            <Input
            placeholder="Nome"
            placeholderTextColor="#121212"
            ref={inputNome}
            value={nome}
            onChangeText={(text) => setNome(text)}
            />

          </AreaInput>

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
          onPress={handleSignUp}>
            {
              loadingAuth?(
                <ActivityIndicator size={20} color="#FFF"/>
              )
              :
              (
                <SubmitText>Cadastrar</SubmitText>
              )
            }
          </SubmitButton>

        </Container>

      </Background>

    </TouchableWithoutFeedback>
  );
}