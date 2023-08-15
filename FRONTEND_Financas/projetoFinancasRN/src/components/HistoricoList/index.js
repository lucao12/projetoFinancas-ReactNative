import React from "react";
import { TouchableWithoutFeedback, Alert } from "react-native";
import { Container, TipoText, Tipo, IconView, ValorText } from "./styles";
import Feather from 'react-native-vector-icons/Feather'

export default function HistoricoList({data, deleteItem}){

    function handleDeleteItem(){
        Alert.alert('Atenção', 'Você tem certeza que deseja excluir este registro?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Continuar',
                onPress: () => deleteItem(data.id)
            }
        ]);
    }
    return(
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
            <Container>
            
                <Tipo>
                    <IconView tipo={data.type}>
                        <Feather name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'} size={20} color="#FFF"/>
                        <TipoText>{data.type}</TipoText>
                    </IconView>
                </Tipo>

                <ValorText>
                    R$ {data.value}
                </ValorText>

            </Container>
        </TouchableWithoutFeedback>

    );
}
