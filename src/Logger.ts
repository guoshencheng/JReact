export type Logable = {
  log(message?: any, ...optionalParams: any[]): void,
  error(message?: any, ...optionalParams: any[]): void,
  warn(message?: any, ...optionalParams: any[]): void,
}

export type LoggerLevel = 3 | 2 | 1;

export default class Logger {

  static logable: Logable = console;

  static level: LoggerLevel

  static log(message?: any, ...optionalParams: any[]): void {
    if (this.logable && this.level <= 1) {
      try {
        this.logable.log(message, ...optionalParams);
      } catch (error) {
        console.log(`logable log with error: `, error)
      }
    }
  }
  static error(message?: any, ...optionalParams: any[]): void {
    if (this.logable && this.level <= 3) {
      try {
        this.logable.error(message, ...optionalParams);
      } catch (error) {
        console.log(`logable log with error: `, error)
      }
    }
  }
  static warn(message?: any, ...optionalParams: any[]): void {
    if (this.logable && this.level <= 2) {
      try {
        this.logable.warn(message, ...optionalParams);
      } catch (error) {
        console.log(`logable log with error: `, error)
      }
    }
  }
}