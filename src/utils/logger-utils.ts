import * as GeneralUtils from './general-utils';

export default class LoggerUtils {
  constructor(private tag: string) {}
  logError(message: string, error: Error) {
    const date = GeneralUtils.formatFullDateTime(new Date());
    console.error(`[${date}] ${this.tag}:`, message, error.message);
  }

  logWarn(message: any, ...optionalParams: any[]) {
    const date = GeneralUtils.formatFullDateTime(new Date());
    console.warn(`[${date}] ${this.tag}:`, message, ...optionalParams);
  }

  logInfo(message: any, ...optionalParams: any[]) {
    const date = GeneralUtils.formatFullDateTime(new Date());
    console.log(`[${date}] ${this.tag}:`, message, ...optionalParams);
  }
}
