export class WebStorageUtil {
  static get(key: string): any {
    if (localStorage.getItem(key) == null){
      this.set(key, []);
    }
    return JSON.parse(localStorage.getItem(key)!);
  }

  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

}