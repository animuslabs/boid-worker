
export class Timer {
  public startTime:number = 0
  public endTime:number = 0

  public start() {
    this.startTime = Date.now()
    return this
  }

  public stop() {
    this.endTime = Date.now()
    return this
  }

  public get elapsed() {
    return this.endTime - this.startTime
  }
}
