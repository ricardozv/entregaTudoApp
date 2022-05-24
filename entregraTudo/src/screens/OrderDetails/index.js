import { View, Text, Image, FlatList } from 'react-native';
import BasketDishItem from '../../components/BasketDishItem';

import orders from "../../../assets/data/orders.json";
import restaurants from "../../../assets/data/restaurants.json";
import styles from './styles';


const order = orders[0];

const OrderDetailsHeader = () => {
    return ( 
        <View>
           <View style={styles.page}>
            <Image 
                source={{uri: order.Restaurant.image}} 
                style={styles.image}
            />
                 
            <View style={styles.container}>
            <Text style = {styles.title}>{order.Restaurant.name}</Text>
            <Text style = {styles.subtitle}>{order.Restaurant.status} &#82286; 2 dias atrás
              
            </Text>
            <Text style = {styles.menuTitle}> Suas compras </Text>
            </View>
        </View>
        </View>
    )
}


const OrderDetails = () => {
    return (
        <FlatList 
            ListHeaderComponent={OrderDetailsHeader}
            data = { restaurants[0].dishes} 
            renderItem = {({ item }) => <BasketDishItem basketDish = {item} /> }/>
    )
}

export default OrderDetails;