import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    DatePickerIOS,
    DatePickerAndroid,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';

import moment from 'moment'
import 'moment/locale/pt-br'
import BaseStyles from './../styles'

const initState = { desc: '', date: new Date() }

export default class AddTask extends Component {

    state = { ...initState }

    save = () => {
        if (!this.state.desc || this.state.desc === ' ') {
            Alert.alert('Dados inválidos!', 'Informe uma descrição para a tarefa.')
            return
        }
        const data = { ...this.state }
        this.props.onSave(data)
        this.setState({ ...initState })
    }

    handleDateAndroidChange = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: this.state.date
            })
            if (action !== DatePickerAndroid.dismissedAction) {
                const momentdate = moment(this.state.date)
                momentdate.date(day)
                momentdate.month(month)
                momentdate.year(year)
                this.setState({ date: momentdate.toDate() })
            }
        } catch ({ code, message }) {
            Alert.alert('Cannot open date picker', message)
        }
    }

    render() {
        let datePicker = null
        if (Platform.OS === 'ios') {
            datePicker = (
                <DatePickerIOS mode='date' date={this.state.date}
                    onDateChange={date => this.setState({ date })} />
            )
        } else {
            datePicker = (
                <TouchableOpacity onPress={this.handleDateAndroidChange}>
                    <Text style={styles.date}>
                        {moment(this.state.date).locale('pt-BR').format('ddd, D [De] MMMM [De] YYYY')}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide'
                transparent={true}>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Nova tarefa</Text>

                    <TextInput placeholder='Descrição ...' style={styles.input}
                        onChangeText={(desc) => this.setState({ desc })}
                        value={this.state.desc} />

                    {datePicker}

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    date: {
        fontFamily: BaseStyles.fontFamily,
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: BaseStyles.colors.default
    },
    header: {
        fontFamily: BaseStyles.fontFamily,
        backgroundColor: BaseStyles.colors.default,
        color: BaseStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    input: {
        fontFamily: BaseStyles.fontFamily,
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    }
})
