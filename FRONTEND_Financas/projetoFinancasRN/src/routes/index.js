import React, {useContext} from "react";
import { View, ActivityIndicator } from "react-native";
import AuthRoutes from "./authroutes";
import AppRoutes from "./approutes";
import {AuthContext} from '../contexts/auth'
export default function Routes(){
    const {signed, loading} = useContext(AuthContext);

    if(loading){
        return(
            <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F0F4FF'
            }}>
                <ActivityIndicator
                size="large"
                color="#131313"/>
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    );
}