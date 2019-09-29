import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    Platform,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import baseStyles from '../styles'
import Task from './../components/Task'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'

export default class Agenda extends Component {

    state = {
        tasks: [],
        tasksPending: false,
        tasksVisible: [],
        showAddTask: false,
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)
    }

    addTask = (task) => {
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            desc: task.desc,
            estimateAt: task.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    toggleTask = (id) => {
        const tasks = [...this.state.tasks]
        tasks.forEach((task) => {
            if (task.id === id) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks }, this.filterTasks)
    }

    filterTasks = () => {
        const tasks = [...this.state.tasks]
        if (this.state.tasksPending) {
            const functionFilter = (task) => !task.doneAt
            const tasksPending = tasks.filter(functionFilter)
            this.setState({ tasksVisible: tasksPending })
        } else {
            this.setState({ tasksVisible: this.state.tasks })
        }
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }

    toggleFilter = () => {
        this.setState({ tasksPending: !this.state.tasksPending }, this.filterTasks)
    }

    componentDidMount = async () => {
        const data = await AsyncStorage.getItem('tasks')
        const tasks = JSON.parse(data) || []
        this.setState({ tasks }, this.filterTasks)
    }

    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => { this.setState({ showAddTask: false }) }} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <TouchableOpacity onPress={this.toggleFilter} style={styles.iconFilter}>
                        <Icon name={this.state.tasksPending ? 'eye-slash' : 'eye'}
                            color={baseStyles.colors.secondary} />
                    </TouchableOpacity>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-BR').format('ddd, D [De] MMMM [De] YYYY')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksContainer}>
                    <FlatList data={this.state.tasksVisible}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => {
                            return (
                                <Task {...item} onDelete={this.deleteTask} toggleTask={this.toggleTask} />
                            )
                        }} />
                </View>
                <ActionButton buttonColor={baseStyles.colors.today}
                    onPress={() => { this.setState({ showAddTask: true }) }} />
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
    },
    iconFilter: {
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})