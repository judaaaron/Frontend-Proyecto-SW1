import React from 'react';
import { useState } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import {Colors} from '../components/styles';


const CartScreen = ({navigation}) =>{
    const [counter, setCounter] = useState(1);

  const handleAdd = ()=>{
     setCounter(counter+1);
  }

  const handleSubstract = ()=>{
      counter!=1 ? setCounter(counter-1): counter
  }
    const CartCard = ({item}) =>{
        return <View style = {style.cartCard}>
            <Image source = {item.image} style ={{height : 80, width : 80}} />
            <View style={{
                height: 100,
                marginLeft:10,
                paddingVertical:20,
                flex: 1,
            }}>
                <Text style={{fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                <Text style={{fontSize: 13, color: Colors.darkLight }}>{item.marca}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 17, color: Colors.white}}>L.{item.price}</Text>
            </View>
            <View style={{marginRight:20, alignItems:'center'}}>
                <Text style={{fontWeight: 'bold', fontSize : 18, color: Colors.white}}>{counter}</Text>
                <View style={style.actionBtn}>
                    <Icon 
                    name = "remove"  
                    size ={25} 
                    color = {Colors.blue}
                    onPress={handleSubstract}
                    />
                    <Icon 
                    name = "add"  
                    size ={25} 
                    color = {Colors.blue}
                    onPress={handleAdd}
                    />
                </View>
            </View>
        </View>
    }
    return (
        <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
                <View>
                <Text style={{fontWeight: 'bold', fontSize: 32 }}>Tu Lista de Productos</Text>
                </View>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 80}}
                    data = {"foods"}
                    renderItem = {({item}) => <CartCard item = {item}/>}
                    ListFooterComponentStyle={{paddingHorizontal:20, marginTop:20}}
                    ListFooterComponent={() => (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginVertical: 15,
                            }}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                              Total Price
                            </Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>$50</Text>
                          </View>
                          <View style={{marginHorizontal: 30}}>
                            {/* <PrimaryButton title="CHECKOUT" /> */}
                          </View>
                        </View>
                      )}

                />
        </SafeAreaView>
    )};

const style = StyleSheet.create({
    header:{
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:20,
    },
    cartCard:{
        height : 100,
        elevation: 15,
        borderRadius:10,
        backgroundColor: Colors.blue,
        marginVertical:10,
        marginHorizontal:20,
        paddingHorizontal:10,
        flexDirection: 'row',
        alignItems:'center',
    },
    actionBtn:{
        width: 80,
        height: 30,
        backgroundColor : Colors.white,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    }
});


export default CartScreen;