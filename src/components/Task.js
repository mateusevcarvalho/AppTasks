import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import baseStyles from './../styles'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-swipeable'

const task = props => {
    let check = null
    if (props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={baseStyles.colors.secondary} />
            </View>
        )
    } else {
        check = <View style={styles.pending} />
    }

    const descStyle = props.doneAt !== null ? { textDecorationLine: 'line-through' } : {}

    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#FFF' />
            <Text style={styles.textEclude}>Excluir</Text>
        </View>
    )

    const rightContent = [
        <TouchableOpacity style={[styles.exclude, { justifyContent: 'flex-start', paddingLeft: 20, }]}
            onPress={() => props.onDelete(props.id)}>
            <Icon name='trash' size={30} color='#FFF' />
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.edit, { justifyContent: 'flex-start', paddingLeft: 20, }]}
            onPress={() => props.onDelete(props.id)}>
            <Icon name='pencil' size={30} color='#FFF' />
        </TouchableOpacity>,
    ]

    return (
        <Swipeable LeftActionActivationDistance={200}
            onLeftActionActivate={() => props.onDelete(props.id)}
            rightButtons={rightContent}
            leftContent={leftContent}>

            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>{check}</View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.description, descStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>
                        {moment(props.estimateAt).locale('pt-BR').format('ddd, D [De] MMMM [De] YYYY')}
                    </Text>
                </View>
            </View>

        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%'
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontFamily: baseStyles.fontFamily,
        color: baseStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: baseStyles.fontFamily,
        color: baseStyles.colors.subtext,
        fontSize: 12
    },
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    edit: {
        flex: 1,
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textEclude: {
        fontFamily: 'Lato',
        color: 'white',
        fontSize: 20,
        margin: 10,
    }
})

export default task;
