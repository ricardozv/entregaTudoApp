import { StyleSheet, Text, View, Image } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import orders from '../../../assets/data/orders.json';
const order = orders[0]

const OrderItem = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style = {{ 
        flexDirection: 'row', 
        borderColor: '#3FC060', 
        borderWidth: 2.3, 
        borderRadius: 12,
        margin: 10,
        }}>
          
          <Image 
              source = {{ uri: order.Restaurant.image}}
              style={{ 
                width:'23%', 
                height: '100%',
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10
                }}
              />
              <View style={{ flex: 1,marginLeft: 10, padding: 4}}>
                   <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '500'}}>
                      {order.Restaurant.name}
                    </Text>
                   <Text style={{ 
                    color: 'grey'}}>
                      {order.Restaurant.address}
                    </Text>
                   <Text style={{ 
                    marginTop: 10}}>
                      Delivery Details
                    </Text>
                   <Text style={{ 
                    color: 'grey' }}>
                      {order.User.name}
                   </Text>
                   <Text style= {{ 
                    color: 'grey' }}>
                      {order.User.address}
                   </Text>
              </View>
              <View style={{ 
                padding:6,
                backgroundColor: '#3FC060', 
                borderBottomRightRadius: 9,
                borderTopRightRadius: 9,
                alignItems:'center',
                justifyContent:'center' }}>
                  <Entypo 
                    name="check" 
                    size={30} 
                    color="white"
                    style ={{ marginLeft: 'auto'}} 
                  />
              </View>
      </View>

    </View>
  );
}

export default OrderItem;

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
