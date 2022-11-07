describe('LogAnalyzer', () => {
  interface IWebService {
    logError(message: string): void;
  }
  
  class LogAnalyzer {
    private service;
  
    constructor(service: IWebService) {
      this.service = service;
    }
  
    analyze(fileName: string) {
      if (fileName.length < 8) {
        this.service.logError("Filename too short: " + fileName);
      }
    }
  }
  
  it('should call logError when filename is too short', () => {
    const mockService = {
      logError: jest.fn(),
    }
    const logAnalyzer = new LogAnalyzer(mockService);

    logAnalyzer.analyze('k.csv');

    expect(mockService.logError).toHaveBeenCalledTimes(1);
    expect(mockService.logError).toHaveBeenCalledWith('Filename too short: k.csv');
  })
})
