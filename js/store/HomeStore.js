/**
 * Created by Administrator on 2018/11/6.
 */
import {observable, runInAction, computed, action} from 'mobx'
import {get} from '../common/HttpTool'

class HomeStore {
    @observable bannerList = [];
    @observable hotCarList = [];
    @observable errorMsg = '';
    constructor() {
        this.fetchBannerList();
        this.fetchHotCarList();
    }
    @action
    fetchBannerList = async() => {
        try {
            const url = 'http://app.zdlhcar.com/app/queryswiperdata';
            const responseData = await get({url, timeout: 30}).then(res => res.json());
            const {code, msg, data} = responseData;
            runInAction(() => {
                this.bannerList.replace(data);
                this.errorMsg = msg;
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }
    @action
    fetchHotCarList = async() => {
        try {
            const url = 'http://app.zdlhcar.com/app/queryhotlist';
            const responseData = await get({url, timeout: 30}).then(res => res.json());
            const {code, msg, data} = responseData;
            runInAction(() => {
                this.hotCarList.replace(data);
                this.errorMsg = msg;
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }
    @computed
    get isFetching() {
        return this.hotCarList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isNoResult() {
        return this.hotCarList.length === 0
    }
}

export default HomeStore