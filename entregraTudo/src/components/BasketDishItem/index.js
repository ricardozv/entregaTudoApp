import { View, Text, StyleSheet, FlatList } from 'react-native';



const BasketDishItem = ({ basketDish }) => {
    return (
        <View style={styles.row}>
        <View style = {styles.quantityContainer}>
            <Text> 1 </Text>
        </View>
        <Text style = {{fontWeight: "600"}}>{basketDish.name} </Text>
        <Text style = {{ marginLeft: "auto" }}> R$ {basketDish.price} </Text>
    </View>

    );
};

export default BasketDishItem;

const styles = StyleSheet.create({

    row:{
        flexDirection:"row",
        alignItems: "center",
        marginVertical: 15,   
    },

    quantityContainer: {
        backgroundColor: "lightgray",
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginRight: 10,
        borderRadius: 3
    }  
});

