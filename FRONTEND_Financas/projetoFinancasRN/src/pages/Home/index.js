import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Modal } from 'react-native';
import { Background, ListBalance, Area, Title, List } from './styles';
import Header from '../../components/header';
import api from '../../services/api';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import HistoricoList from '../../components/HistoricoList';
import CalendarModal from '../../components/CalendarModal';

export default function Home(){
    const [listBalance, setListBalance] = useState([]);
    const [movements, setMovements] = useState([]);
    const [dateMovement, setDateMovement] = useState(new Date());
    const isFocus = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{

        let isActived = true;
        async function getMovement(){
            let date = new Date(dateMovement);
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, 'dd/MM/yyyy');

            console.log(dateFormated);

            const receives = await api.get('/receives', {
                params:{
                    date: dateFormated
                }
            })

            const balance = await api.get('/balance', {
                params:{
                    date: dateFormated
                }
            })
            if(isActived){
                setMovements(receives.data);
                setListBalance(balance.data);
            }
        }
        getMovement();

        return () => isActived = false;

    }, [isFocus, dateMovement]);

    async function handleDelete(id){
        try {
            await api.delete('/receives/delete', {
                params:{
                    item_id: id
                }
            })

            setDateMovement(new Date());
        } catch (error) {
            console.log(error);
        }
    }

    function filterDateMovements(dateSelected){
        setDateMovement(dateSelected);
    }

    return(
        <Background>
            <Header title="Minhas movimentações"/>

            <ListBalance
            data={listBalance}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.tag}
            renderItem={({item}) => (<BalanceItem data={item}/>)} 
            />

            <Area>
                <TouchableOpacity
                onPress={()=> setModalVisible(true)}>
                    <MaterialIcon name="event" size={30} color="#121212"/>
                </TouchableOpacity>
                <Title>Últimas movimentações</Title> 
            </Area>

            <List
            data={movements}
            keyExtractor={item => item.id}
            renderItem={({item}) => <HistoricoList data={item} deleteItem={handleDelete}/>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}/>

            <Modal visible={modalVisible} animationType='fade' transparent={true}>
                <CalendarModal 
                setVisible={()=> setModalVisible(false)}
                handleFilter={filterDateMovements}
                />
            </Modal>
        </Background>
    );
}