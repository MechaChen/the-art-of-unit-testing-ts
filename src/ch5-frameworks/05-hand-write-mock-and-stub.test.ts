describe('Hand write Mock and Stub', () => {

  interface IWebService {
    sendErrorMessage: (error: string) => void;
  }

  interface ILogger {
    logError: (error: string) => void;
  }

  class MockWebService implements IWebService {
    error: string;

    sendErrorMessage(error) {
      this.error = error;
    };
  }

  class StubLogger implements ILogger {
    logError(error) {
      throw new Error('stub exception');
    }
  }

  class LogAnalyzer {
    logger: ILogger;
    webService: IWebService;
    minNameLength: number;

    constructor(logger: ILogger, webService: IWebService) {
      this.logger = logger;
      this.webService = webService;
    }

    analyze(fileName: string) {
      if (fileName.length < this.minNameLength) {
        try {
          this.logger.logError('File name is too short : ' + fileName);
        } catch (err) {
          this.webService.sendErrorMessage(err.message);
        }
      }
    }
  }

  it('should log error message on web service when logger error', () => {
    const mockWebService = new MockWebService();
    const stubLogger = new StubLogger();
    const logAnalyzer = new LogAnalyzer(stubLogger, mockWebService);

    logAnalyzer.minNameLength = 20;
    logAnalyzer.analyze('tooShort.txt');

    expect(mockWebService.error).toBe('stub exception');
  })
});
