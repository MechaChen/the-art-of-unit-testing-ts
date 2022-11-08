describe('return object', () => {
  interface IWebService {
    info: {
      severity: number;
      message: string;
    }
    sendErrorMessage: (error: string) => void;
  }

  interface ILogger {
    logError: (error: string) => void;
  }

  class LogAnalyzer {
    webService: IWebService;
    logger: ILogger;
    minFileNameLength: number;

    constructor(logger, webService) {
      this.logger = logger;
      this.webService = webService;
    }

    analyze(fileName: string) {
      if (fileName.length < this.minFileNameLength) {
        try {
          this.logger.logError('File name is too short : ' + fileName);
        } catch (err) {
          this.webService.sendErrorMessage(err.message);
        }
      }
    }
  }

  it('should show severity and get error message when logger crashes', () => {
    // Arrange
    const mockWebService: IWebService = {
      info: {
        severity: 0,
        message: '',
      },
      sendErrorMessage: jest.fn((error) => {
        mockWebService.info.message = error;
        mockWebService.info.severity = 1000;
      })
    };

    const stubLogger: ILogger = {
      logError: jest.fn(() => {
        throw new Error('stub exception');
      })
    };

    const logAnalyzer = new LogAnalyzer(stubLogger, mockWebService);

    // Act
    logAnalyzer.minFileNameLength = 20;
    logAnalyzer.analyze('tooShort.txt');

    // Assert
    expect(mockWebService.info).toEqual({
      severity: 1000,
      message: 'stub exception',
    });
  })
})