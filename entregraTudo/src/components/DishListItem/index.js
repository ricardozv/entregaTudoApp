import { View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DishListItem = ({ dish }) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress = {() => navigation.navigate("Dish", {id: dish.id})} style = { styles.container }>
            <View style = {{ flex: 1}}>
                <Text style ={styles.name}>{dish.name}</Text>
                <Text style = {styles.description} numberOfLines={2}>{dish.description}</Text>
                <Text style = {styles.price}> R$ {dish.price}</Text>
            </View>
            {dish.image && (
            <Image source = {{ uri: dish.image }} style = {styles.image} />
            )}
            </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        flexDirection:"row"
    },
    name: {
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.5

    },
    description: {
        color: "gray",
        marginVertical: 10
    },
    price: {
        fontSize: 17
    },
    image: {
        height: 100,
        aspectRatio: 1,
        borderRadius: 50
    }
});

export default DishListItem;