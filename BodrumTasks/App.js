import React, {useState, useEffect, useCallback, useRef, useMemo} from "react";
import {
    StyleSheet,
    TextInput,
    View,
    ScrollView, TouchableOpacity, Text
} from "react-native";
import Slider from '@react-native-community/slider';
import AppBar from "./src/components/AppBar";
import TaskList from "./src/components/TaskList";
import {
    Animated,
    Image,
    Platform,
    Easing,
    Dimensions,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import AnimatedTaskList from "./src/components/AnimatedTaskList";

const window = Dimensions.get('window');


export default function App() {
    const [title, setTitle] = useState("");

    // Инициализируем пустые объекты для хранения тасков
    const [task, setTask] = useState({});

    // Инициализируем массивы для хранения тасков
    const [tasks, setTasks] = useState([]);

    const [numSlider, setNumSlider] = useState(0);
    // Функция добавление таска в массив тасков
    const addTask = () => {
        if (title.length > 0) {
            // Добавление таска в массив тасков
            setTasks([...tasks, {
                key: Date.now(),
                name: title,
                complexity: numSlider,
                isChecked: false,
                selected: false
            }]);
            // Очищаем поле ввода
            setTitle("");
        }
    };

    // Функция помечания выполненности тасков
    const checkTask = id => {
        // Бежим по массиву тасков и ищем таск с нужным id
        // и меняем состояние с помощью ф. setTasks
        setTasks(
            tasks.map(task => {
                if (task.key === id) {
                    task.isChecked = !task.isChecked;
                }
                return task;
            })
        );
    };

    // Функция помечания выделения тасков
    const selectTask = id => {
        // Бежим по массиву тасков и ищем таск с нужным id
        // и меняем состояние с помощью ф. setTasks
        setTasks(
            tasks.map(task => {
                if (task.key === id) {
                    task.selected = true;
                } else {
                    task.selected = false;
                }
                return task;
            })
        );
    };

    // Функция удаления таска из массива тасков
    const deleteTask = id => {
        // Бежим по массиву тасков и ищем таск с нужным id
        // и меняем состояние с помощью ф. setTasks
        setTasks(tasks.filter(task => {
            return task.key !== id;
        }));
    };

    useEffect(() => {
        console.log(tasks.length, "TaskList length");
    }, [tasks]);

    const renderRow = useCallback(({data, active}) => {
        return <AnimatedTaskList data={data} active={active} checkTask={checkTask}
                                 deleteTask={deleteTask}
                                 selectTask={selectTask} />;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.statusBar}></View>
            <AppBar />
            <SortableList
                style={styles.list}
                contentContainerStyle={styles.contentContainer}
                data={tasks}
                renderRow={renderRow}
            />
            {/*<ScrollView>*/}
            {/*    {tasks.map(task => (*/}
            {/*        <TaskList*/}
            {/*            key={task.key}*/}
            {/*            task={task}*/}
            {/*            checkTask={checkTask}*/}
            {/*            deleteTask={deleteTask}*/}
            {/*            selectTask={selectTask}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</ScrollView>*/}
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#E95420"
                maximumTrackTintColor="#E9E9ED"
                thumbTintColor="black"
                onValueChange={(num)=> {
                    setNumSlider(num);
                } }
                value={numSlider}
            />
            <Text>{numSlider}</Text>
            <View style={styles.task}>
                <TextInput
                    placeholder="Enter task"
                    value={title}
                    onChangeText={value => setTitle(value)}
                    style={styles.textbox}
                />
                <TouchableOpacity onPress={() => addTask()} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: "#7F39FB",
        color: "#fff",
        width: "100%",
        height: 30
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    task: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    slider: {
        width: "100%"
    },
    textbox: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        padding: 10,
        margin: 10,
        width: "80%"
    },
    button: {
        backgroundColor: "gray",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50
    },
    buttonText: {
        color: "white"
    },

    _container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        ...Platform.select({
            ios: {
                paddingTop: 20,
            },
        }),
    },
    title: {
        fontSize: 20,
        paddingVertical: 20,
        color: '#999999',
    },
    list: {
        flex: 1,
    },
    contentContainer: {
        width: window.width,
        ...Platform.select({
            ios: {
                paddingHorizontal: 30,
            },
            android: {
                paddingHorizontal: 0,
            },
        }),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,
        ...Platform.select({
            ios: {
                width: window.width - 30 * 2,
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: {height: 2, width: 2},
                shadowRadius: 2,
            },
            android: {
                width: window.width - 30 * 2,
                elevation: 0,
                marginHorizontal: 30,
            },
        }),
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25,
    },
    text: {
        fontSize: 24,
        color: '#222222',
    },

});
