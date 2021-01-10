import { EventEmitter } from 'events';

export default class SFevent {
  private static ee = new EventEmitter();

  //绑定时间
  static ee_on(eventName: string, func: any) {
    this.ee.on(eventName, func);
  }

  //触发事件
  static ee_emit(eventName: string, arg?: any) {
    this.ee.emit(eventName, arg);
  }
}
