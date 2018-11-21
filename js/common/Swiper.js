/**
 * Created by Administrator on 2018/10/22.
 */
import React,{ Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
type props = {}
export default class ImgSwiper extends Component<>{
    constructor(props) {
        super(props);
        this.state = {
            swiperShow:false,
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                swiperShow:true
            });
        },0)
    }
    componentWillUnmount(){
        this.setTimeout && clearTimeout(this.setTimeout);
    }
    render() {
        if(this.state.swiperShow) {
            return (
                    <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={2}
                            dot={<View style={styles.dot}/>}
                            activeDot={<View style={styles.activeDot}/>}
                            paginationStyle={{
                                bottom: -23, left: '50%', marginLeft: -21
                            }} loop>
                        <View>
                            <Image source={ require('../../res/images/b1.jpg')} style={styles.image} />
                        </View>
                        <View>
                            <Image source={ require('../../res/images/b2.jpg')} style={styles.image} />
                        </View>
                        <View>
                            <Image source={ require('../../res/images/b3.jpg')} style={styles.image} />
                        </View>
                    </Swiper>
            );
        }else{
            return (
                <View style={{height:200}}>
                    <Image source={ require('../../res/images/b2.jpg')} style={styles.image} />
                </View>
            );

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        height:200,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    dot:{
        backgroundColor: '#ddd',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot:{
        width: 5,
        height: 5,
        borderRadius: '50%',
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
        borderWidth:3,
        borderStyle:'solid',
        borderColor:'yellow'
    },

    image: {
        width:width,
        height:300,
        flex: 1
    }
});