import React, {useRef, useState} from "react";
import { TouchableWithoutFeedback, SafeAreaView, Alert, Keyboard } from "react-native";
import {Background,Input,SubmitButton, SubmitText } from './styles';
import Header from "../../components/header";
import RegisterTyper from "../../components/RegisterTypes";
import api from "../../services/api";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

export default function New(){

    const inputDescricao = useRef(null);
    const inputValor = useRef(null);
    const [labelInput, setLabelInput] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [type, setType] = useState('receita');
    const navigation = useNavigation();
    function removeFocus(){
        inputDescricao.current?.blur();
        inputValor.current?.blur();
    }
    function handleSubmit(){
        Keyboard.dismiss();
        if(isNaN(parseFloat(valueInput)) || type === null || labelInput === ''){
            Alert.alert('ERRO!', 'Preencha todos os campos');
            return;
        }
        Alert.alert('Confirmando dados!', `Tipo: ${type} - Valor: R$${valueInput}`, [
            {text: 'Cancelar', style: 'cancel'}, {text: 'Continuar', onPress: ()=> handleAdd()}
        ])
    }

    async function handleAdd(){
        Keyboard.dismiss();
        await api.post('/receive', {
            description: labelInput,
            value: Number(valueInput),
            type: type,
            date: format(new Date(), 'dd/MM/yyyy')
        })

        setLabelInput('');
        setValueInput('');
        navigation.navigate('Home');
    }
    return(
        <TouchableWithoutFeedback
        onPress={removeFocus}>
            <Background>
            <Header title="Registrando"/>
            <SafeAreaView style={{marginTop: 14, alignItems: "center"}}>
                <Input
                placeholder="Descrição desse registro"
                placeholderTextColor="#121212"
                ref={inputDescricao}
                value={labelInput}
                onChangeText={(text)=> setLabelInput(text)}
                />
                <Input
                placeholder="Valor desejado"
                placeholderTextColor="#121212"
                keyboardType="numeric"
                ref={inputValor}
                value={valueInput}
                onChangeText={(text)=> setValueInput(text)}
                />

                <RegisterTyper type={type} sendTypeChanged={(item) => setType(item)}/>

                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Registrar</SubmitText>
                </SubmitButton>
            </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    );
}