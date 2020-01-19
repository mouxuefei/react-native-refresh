import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import RefreshNormalHeader from './src/RefreshNormalHeader';
import RefreshAnimateHeader from './src/RefreshAnimateHeader';
import RefreshAnimationHeader from './src/RefreshAnimationHeader';

const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
interface State{
  refreshing:boolean
}
interface Props{

}
export default class  App extends Component<Props,State>{
  constructor(p:Props){
    super(p)
    this.state={
      refreshing:false
    }
  }
  
  render(){
    console.log(data)
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <FlatList
          style={styles.container}
          refreshControl={
            <RefreshAnimationHeader
              title={'书中自有颜如玉，书中自有黄金屋'}
              refreshing={this.state.refreshing}
              onRefresh={() => {
                console.log("onRefresh")
                this.setState({refreshing:true})
                setTimeout(() => {
                  this.setState({refreshing:false})
                }, 3000);
              }}
            />
          }
          keyExtractor={(item, index) => index + ''}
          data={data}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ height: 100 ,backgroundColor:'red'}}
                onPress={() => {
                  alert('点击');
                }}
              >
                <Text>{'Item' + item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
        }
}
 

// function App() {
//   const [refreshing, setRefreshing] = useState(false);
//   const [data, setData] = useState(dataTemp);

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

// export default React.memo(App);
