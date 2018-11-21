/**
 * Created by Administrator on 2018/11/6.
 */
import {observable, runInAction, computed, action} from 'mobx'
import {get} from '../common/HttpTool'

class BuycarStore {
    @observable brandList = [];
    @observable carList = [];
    @observable errorMsg = '';
    @observable page = 1;
    @observable pageSize=8;
    @observable isRefreshing = false;
    @observable isNoMore = true;

    constructor(brandId,like) {
        this.brandId = brandId || 0;
        this.like = like || '';
        this.fetchBrandList();
        this.fetchCarList();
    }
    @action
    fetchBrandList = async() => {
        try {
            const url = 'http://app.zdlhcar.com/app/brandlist';
            const responseData = await get({url, timeout: 30}).then(res => res.json());
            const {code, msg, data} = responseData;
            runInAction(() => {
                this.brandList.replace(data);
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
    fetchCarList = async() => {
        try {
            const {code, msg, data} = await this._fetchCarList();
            runInAction(() => {
                // alert(JSON.stringify(data))
                this.isRefreshing = false;
                // this.carList.replace(data);
                this.isNoMore = data.length == 0;
                if (this.page === 1) {
                    this.carList.replace(data)
                } else {
                    this.carList.splice(this.carList.length, 0, ...data);//将data添加到carlist
                }
            })
        } catch (error) {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        }
    }
    _fetchCarList() {
        return new Promise((resolve, reject) => {
            if (this.isRefreshing) this.page = 1;
            const url = `http://app.zdlhcar.com/app/querylist?page=${this.page}&pageSize=${this.pageSize}&like=${this.like}&brandId=${this.brandId}`;
            fetch(url).then(response => {
                if (response.status === 200) return response.json();
            }).then(responseJson  => {
                if (responseJson ) {
                    const {code,msg, data} = responseJson;
                    resolve({code,msg,data})
                } else {
                    reject('请求出错！')
                }
            }).catch(error => {
                reject('网络出错！')
            })
        })
    }
    @computed
    get isFetching() {
        return this.carList.length === 0 && this.errorMsg === ''
    }
    @computed
    get isNoResult() {
        return this.isNoMore
    }
    @computed
    get isLoadMore() {
        return this.page !== 1
    }
}

export default BuycarStore