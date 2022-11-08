describe('Jest mock utils to create Mock and Stub object', () => {
  interface IWebService {
    sendErrorMessage: (error: string) => void;
  }

  interface ILogger {
    logError: (error: string) => void;
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
    const mockWebService = {
      sendErrorMessage: jest.fn((error) => mockWebService.error = error)
    };
  
    const stubLogger = {
      logError: jest.fn((error) => {
        throw new Error('stub exception')
      }),
    }

    const logAnalyzer = new LogAnalyzer(stubLogger, mockWebService);

    logAnalyzer.minNameLength = 20;
    logAnalyzer.analyze('tooShort.txt');

    expect(mockWebService.sendErrorMessage).toHaveBeenCalledTimes(1);
    expect(mockWebService.error).toBe('stub exception');
  })
});
