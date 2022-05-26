import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderListItem = ({ order }) => {
    const navigation = useNavigation();

    return (
        <Pressable 
            onPress={() => navigation.navigate("Order", { id:order.id })}
            style = {{ flexDirection: "row", margin: 10, alignItems: "center" }}>
            <Image 
                source = {{ uri: order.Restaurant.image }}
                style = {{ borderRadius: 50, width: 75, height: 75, marginRight: 10 }}

            />

            <View>
                <Text style = {{ fontWeight: "600", fontSize: 16 }}>{order.Restaurant.name}</Text>
                <Text> 3 items $38.50 </Text>
                <Text> 2 dais ago &#8226; {order.status} </Text>
            </View>
        </Pressable>
    )
}

export default OrderListItem;