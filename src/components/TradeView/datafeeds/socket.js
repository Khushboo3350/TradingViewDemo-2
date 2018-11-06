/*
 * @Author: tonyTang 
 * @Date: 2018-11-05 18:31:13 
 * @Last Modified by: tonyTang
 * @Last Modified time: 2018-11-06 13:47:42
 */

class socket {
    constructor(url = 'wss://api.fcoin.com/v2/ws', options) {
        this.heartBeatimer = null;
        this.options = options;
        this.messageMap = {};
        this.connState = 0;
        this.socket = null;
        this.url = url;
    }

    send(data){
        this.socket.send(JSON.stringify(data));
    }
    emit(data) {
        return new Promise(function(resolve){
            this.socket.send(JSON.stringify(data));
            this.on('message',data => {
                resolve(data);
            });       
        });
    }
    checkHeartbeat() {
        const data = {
            'cmd': 'ping',
            'args': [Date.parse(new Date())],
            'id': '1314',
        };
        this.send(data);
    }
    onReceiver(data) {
        const callback = this.messageMap[data.Event];
        if(callback) callback(data.Data);
    }
    onOpen() {
        this.connState = 2;
        this.heartBeatimer = setInterval(this.checkHeartbeat.bind(this),20000);
        this.onReceiver({Event: 'open'});
    }
    checkOpen() {
        return this.connState === 2;
    }
    onClose() {
        this.connState = 0;
        if(this.connState){
            this.onReceiver({Event: 'close'});
        }
    }
    onMessage(message) {
        try {
            const data = JSON.parse(message);
            console.log(data);
            this.onReceiver({Event: 'message',Data: data});
        } catch (err) {
            console.error('>> Data parsing error: ',err);
        }
    }
    onError(err) {
        console.log('>> WebSocket error: ',err);
    }
    on(name, handler) {
        this.messageMap[name] = handler;
    }
    doOpen() {
        if(this.connState) return ;
        this.connState = 1;
        this.afterOpenEmit = [];
        const BrowserWebSocket = window.WebSocket || window.MozWebsocket;
        const socket = new BrowserWebSocket(this.url);
        socket.binaryType = 'arraybuffer';
        socket.onopen = evt => this.onOpen(evt);
        socket.onclose = evt => this.onClose(evt);
        socket.onmessage = evt => this.onMessage(evt.data);
        socket.onerror = err => this.onError(err);
        this.socket = socket;
    }
    doClose() {
        this.socket.close();
    }
    destroyed() {
        if(this.heartBeatimer){
            clearInterval(this.heartBeatimer);
            this.heartBeatimer = null;
        }
        this.doClose();
        this.connState = 0;
        this.socket = null;
    }
    
}

export default socket