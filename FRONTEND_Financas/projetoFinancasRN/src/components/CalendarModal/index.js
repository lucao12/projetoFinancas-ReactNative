import React, {useState} from "react";
import { Container, ButtonFilterText, ModalContent,ButtonFilter } from "./styles";
import { TouchableWithoutFeedback, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "./localCalendar";

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarModal({setVisible, handleFilter}){
    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({});

    function handleDayPress(date){
        setDateNow(new Date(date.dateString));

        let markedDate = {};
        markedDate[date.dateString] = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#FFF'
        }

        setMarkedDates(markedDate)
    }
    function handleFilterDate(){
        handleFilter(dateNow);
        setVisible();
    }
    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

            <ModalContent>
                <Calendar
                onDayPress={handleDayPress}
                markedDates={markedDates}
                enableSwipeMonths={true}
                theme={{
                    todayTextColor: '#F00',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#FFF'
                }}/>

                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>
            </ModalContent>
        </Container>
    );
}