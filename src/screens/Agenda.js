import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList
} from 'react-native';
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import baseStyles from '../styles'
import Task from './../components/Task'

export default class Agenda extends Component {

    state = {
        tasks: [
            { id: Math.random(), desc: 'Comprar curso de ract native', estimateAt: new Date, doneAt: new Date },
            { id: Math.random(), desc: 'Concluir o curso', estimateAt: new Date, doneAt: null },
            { id: Math.random(), desc: 'Comprar curso de ract native', estimateAt: new Date, doneAt: new Date },
            { id: Math.random(), desc: 'Lavar banheiro', estimateAt: moment().add(1, 'days'), doneAt: null },
            { id: Math.random(), desc: 'Comprar curso de ract native', estimateAt: new Date, doneAt: new Date },
            { id: Math.random(), desc: 'Concluir o curso', estimateAt: new Date, doneAt: null },
            { id: Math.random(), desc: 'Comprar curso de ract native', estimateAt: new Date, doneAt: new Date },
            { id: Math.random(), desc: 'Lavar banheiro', estimateAt: moment().add(5, 'days'), doneAt: null },
            { id: Math.random(), desc: 'Comprar curso de ract native', estimateAt: new Date, doneAt: new Date },
            { id: Math.random(), desc: 'Concluir o curso', estimateAt: new Date, doneAt: null },
            { id: Math.random(), desc: 'Comprar curso de ract native', estimateAt: new Date, doneAt: new Date },
            { id: Math.random(), desc: 'Lavar banheiro', estimateAt: moment().add(7, 'days'), doneAt: null },
        ]
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-BR').format('ddd, D [De] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} />}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: baseStyles.fontFamily,
        color: baseStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: baseStyles.fontFamily,
        color: baseStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    tasksContainer: {
        flex: 7
    }
})