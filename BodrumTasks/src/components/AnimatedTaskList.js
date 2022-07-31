import React, {useEffect, useRef} from "react";
import {StyleSheet, Text, View, ScrollView, Animated, Platform, Easing, Image} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DoubleClick from "double-click-react-native";

export default function AnimatedTaskList(props) {
    const {active, data} = props;

    const activeAnim = useRef(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(activeAnim.current, {
            duration: 300,
            easing: Easing.bounce,
            toValue: Number(active),
            useNativeDriver: true,
        }).start();
    }, [active]);

    return (
        <Animated.View style={styles.listTile}>
            <Icon
                name="format-list-bulleted"
                style={styles.bars}
                size={20}
                color="white"
            />
            <DoubleClick
                singleTap={() => {
                    props.selectTask(data.key)
                }}
                doubleTap={() => {
                    props.checkTask(data.key)
                }}
                delay={300}
                style={styles.title}
            >
                <Text style={
                    data.isChecked ?
                        data.selected ? styles.titleTextUnderlineSelected : styles.titleTextUnderline :
                        data.selected ? styles.titleTextSelected : styles.titleText
                }>{data.name}</Text>
            </DoubleClick>
            <Icon
                name="delete"
                style={styles.trailing}
                size={20}
                color="#666666"
                onPress={() => props.deleteTask(data.key)}
            />
            <Text
                style={[styles.complexity, data.complexity > 5 ? styles.red : styles.green]}>{data.complexity}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    listTile: {
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#343F4B",
        padding: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: "#666666",
        borderRadius: 10,
        marginBottom: 5
    },
    title: {
        width: "65%",
        backgroundColor: "#343F4B",
        paddingLeft: 15
    },
    titleText: {
        fontSize: 18,
        color: "white",
        textDecorationLine: "none"
    },
    titleTextUnderline: {
        fontSize: 18,
        color: "white",
        textDecorationLine: "line-through"
    },
    titleTextSelected: {
        fontSize: 18,
        color: "yellow",
        textDecorationLine: "none"
    },
    titleTextUnderlineSelected: {
        fontSize: 18,
        color: "yellow",
        textDecorationLine: "line-through"
    },
    trailing: {
        width: "5%"
    },
    complexity: {
        width: "20%",
        height: "100%",
        color: "white",
        borderRadius: 10,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 24,
        paddingLeft: 10,
    },
    bars: {
        width: "5%",
        color: "white"
    },
    purple: {
        backgroundColor: "#976DD0"
    },
    yellow: {
        backgroundColor: "#FFBA5C"
    },
    green: {
        backgroundColor: "#77D353"
    },
    red: {
        backgroundColor: "#F95F62"
    }

});
