class EventEmitter<T extends (...params: Parameters<T>[]) => void> {
  private eventsMap: Record<string, T[]> = {};

  public subscribe(eventName: string, callback: T): void {
    if (!(eventName in this.eventsMap)) {
      this.eventsMap[eventName] = [];
    }

    this.eventsMap[eventName].push(callback);
  }

  public unsubscribe(eventName: string, callback: T): void {
    this.eventsMap[eventName] = this.eventsMap[eventName].filter((cb) => cb !== callback);
  }

  public emit(eventName: string, ...params: Parameters<T>[]): void {
    this.eventsMap[eventName].forEach((cb) => {
      if (params.length) {
        cb(...params);
      } else {
        cb();
      }
    });
  }
}

export default new EventEmitter();
