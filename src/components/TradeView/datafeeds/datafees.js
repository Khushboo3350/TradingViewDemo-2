/*
 * @Author: tonyTang 
 * @Date: 2018-11-05 18:31:36 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-11-06 10:07:57
 */

import dataUpdater from './dataUpdater'

class datafees {
    
    constructor(vue) {
        this.self = vue;
        this.barsUpdater = new dataUpdater(this);
    }
    
    onReady(callback){
        return new Promise((resolve,reject) => {
            let configuration = this.defaultConfiguration();
            if(this.self.getConfig){
                configuration = Object.assign(this.defaultConfiguration(),this.self.getConfig());
            }
            resolve(configuration);
        }).then(data => callback(data));;
    }

    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        return new Promise((resolve,reject) => {
            let symbolInfo = this.defaultSymbol();
            if(this.self.getSymbol){
                symbolInfo = Object.assign(this.defaultSymbol(), this.self.getSymbol());
            }
            resolve(symbolInfo);
        }).then(data => onSymbolResolvedCallback(data)).catch(err => onResolveErrorCallback(err));
    }

    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
        const onLoadedCallback = data => {
            data && data.length ? onDataCallback(data, { noData: true }) : onDataCallback([], { noData: true });
        }
        this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback,onErrorCallback);
    }

    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        this.barsUpdater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback);
    }

    unsubscribeBars(subscriberUID) {
        this.barsUpdater.unsubscribeBars(subscriberUID)
    }


    /**
    * 默认配置
    */
    defaultConfiguration() {
        return {
            supports_search: true,
            supports_group_request: false,
            supported_resolutions: ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M'],
            supports_marks: true,
            supports_timescale_marks: true,
            supports_time: true
        }
    }

    /**
     * 默认商品信息
     */
    defaultSymbol() {
        return {
            'name': 'BTCUSDT',
            'timezone': 'Asia/Shanghai',
            'minmov': 1,
            'minmov2': 0,
            'pointvalue': 1,
            'fractional': false,
            'session': '24x7',
            'has_intraday': true,
            'has_no_volume': false,
            'description': 'BTCUSDT',
            'pricescale': 1,
            'ticker': 'BTCUSDT',
            'supported_resolutions': ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M']
        }
    }

}

export default datafees

 

