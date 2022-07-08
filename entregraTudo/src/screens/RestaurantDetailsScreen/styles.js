import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    page:{
        flex:1
    },
    iconContainer:{
        position: 'absolute',
        top: 40,
        left: 10,
        borderRadius: 50,

    },
    image: {
        width:'100%',
        aspectRatio: 5 / 3
    },
    title:{
        fontSize: 35,
        fontWeight:"600",
        marginVertical: 10,
        margin: 10
    },
    subtitle: {
        color: "grey",
        fontSize: 16
    }, 
    container: {
        margin: 10
    },
    menuTitle: {
        marginTop: 20,
        fontSize: 24,
        letterSpacing:0.3
    },
    button: {
        backgroundColor: "black",
        marginTop:"auto",
        padding: 20,
        alignItems: "center",
        margin: 10,
    },
    buttonText:{
        color: "white",
        fontWeight:"600",
        fontSize: 18, 

    }   

});

