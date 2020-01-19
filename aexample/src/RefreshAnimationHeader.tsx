import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
    RefreshLayout,
    RefreshHeader,
    RefreshState,
  } from 'react-native-refresh';
import  LottieView from 'lottie-react-native';

interface State {
 
}

interface Props {
  refreshing: boolean;
  onRefresh: () => void;
  source?:any,
  children?:any
  title?:string
}

export default class RefreshAnimationHeader extends Component<Props, State> {
    _lottieViewRef=React.createRef<LottieView>();
    // _progressRef=React.createRef<any>();
    _currentState:string;
  constructor(p: Props) {
    super(p);
    // this._progressRef=new Animated.Value(1);
    this._currentState=RefreshState.Idle;
  }

  render() {
      const {refreshing,children,title} =this.props;
    return (
      <RefreshLayout
        refreshing={refreshing}
        onChangeOffset={this._onChangeOffsetCallBack}
        onPullingRefresh={this._onPullingRefreshCallBack}
        onRefresh={this._onRefreshCallBack}
        onEndRefresh={this._onEndRefreshCallBack}
        onIdleRefresh={this._onIdleRefreshCallBack}
      >
        <RefreshHeader style={styles.container} >
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <LottieView
            ref={this._lottieViewRef}
            style={styles.lottery}
            resizeMode={'cover'}
            loop={true}
            autoSize={false}
            autoPlay={false}
            speed={2}
            source={require('./assets/walking-man.json')}
            hardwareAccelerationAndroid={true}
            cacheStrategy={'strong'}
            // progress={this._progressRef.current.interpolate({
            //   inputRange: [0, 200],
            //   outputRange: [0, 1],
            //   extrapolate: 'clamp',
            // })}
          />
       {title&&<Text style={styles.title}>{title}</Text>}
          </View>
        
        </RefreshHeader>
        {children}
      </RefreshLayout>
    );
  }

   _onPullingRefreshCallBack = (state) => {
    this._currentState = state;
  };

   _onRefreshCallBack = (state) => {
     const {onRefresh} =this.props;
      setTimeout(() => {
        this._lottieViewRef.current.play();
      }, 0);
      onRefresh && onRefresh();
      this._currentState = state;
    };

  _onEndRefreshCallBack = (state) => {
    this._currentState = state;
  };

   _onIdleRefreshCallBack = (state) => {
    if (this._currentState === RefreshState.End) {
      setTimeout(() => {
        this._lottieViewRef.current.reset();
      }, 0);
    }
    this._currentState = state;
  }

   _onChangeOffsetCallBack = (event) => {
    const { offset } = event.nativeEvent;
    if (
      this._currentState !== RefreshState.Refreshing &&
      this._currentState !== RefreshState.End
    ) {
      // this._progressRef.current.setValue(offset);
    }
  }
}
const styles = StyleSheet.create({
    container: {
      height: 110,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottery: {
      height: 50,
    },
    title:{
      fontSize:10,
      color:'#AAB0BB',
    }
  });
