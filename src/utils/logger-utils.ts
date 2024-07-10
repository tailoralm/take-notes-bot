export default class LoggerUtils {
  constructor(private tag: string) {}
  logError(message: string, error: Error) {
    const date = new Date().toISOString();
    console.error(`[${date}] ${this.tag} - ${message}: ${error.message}`);
  }

  logInfo(message: any, ...optionalParams: any[]) {
    const date = new Date().toISOString();
    console.log(`[${date}] ${this.tag}: ${message}`, ...optionalParams);
  }
}
