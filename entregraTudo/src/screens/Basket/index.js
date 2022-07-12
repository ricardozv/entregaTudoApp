import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import BasketDishItem from "../../components/BasketDishItem";
import { useBasketContext} from "../../components/Contexts/BasketContext"
import { useOrderContext } from '../../components/Contexts/OrderContext';
import { useNavigation } from '@react-navigation/native';



const Basket = () => {
    const { restaurant, basketDishes, totalPrice } = useBasketContext();
    const { createOrder } = useOrderContext();
    const navigation = useNavigation();

    const onCreateOrder = async () => {
        await createOrder();
        navigation.goBack();
    }

    return (
        <View style = {styles.page}>
            <Text style = {styles.name}>{restaurant?.name}</Text>
            <Text style = {{ 
                fontWeight: "bold", 
                marginTop: 20, 
                fontSize: 22
                }}>
                Seu pedido
            </Text>
            <FlatList 
                data = {basketDishes}
                renderItem = {({ item }) => <BasketDishItem basketDish = {item} />} 
                showsVerticalScrollIndicator = {false}
                />

       
            <View style= {styles.separator} />
            
            <Pressable onPress = { onCreateOrder }style = {styles.button}>
                <Text style = {styles.buttonText}>
                    Fazer pagamento R$ {totalPrice.toFixed(2)}
                </Text>
            </Pressable>
        </View>
    );
};

export default Basket;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        width: "100%",
        paddingVertical: 40,
        padding: 10

    },

    name:{
        fontSize: 30,
        fontWeight: "600",
        marginVertical: 10,
    },

    description:{
        color:"gray"
    },
    separator:{
        height: 1,
        backgroundColor: "gray",
        marginVertical: 10
    },
    row:{
        flexDirection:"row",
        alignItems: "center",
        marginVertical: 15,   
    },
    quantity: {
        fontSize: 25,
        marginHorizontal: 20
    }, 
    button: {
        backgroundColor: "black",
        marginTop:"auto",
        padding: 20,
        alignItems: "center"
    },
    buttonText:{
        color: "white",
        fontWeight:"600",
        fontSize: 18, 

    }, 
    quantityContainer: {
        backgroundColor: "lightgray",
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginRight: 10,
        borderRadius: 3
    }  
});

