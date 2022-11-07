/*
 _____          _       _   _              ______                                           _    
|_   _|        | |     | | (_)             |  ___|                                         | |   
  | | ___  ___ | | __ _| |_ _  ___  _ __   | |_ _ __ __ _ _ __ ___   _____      _____  _ __| | __
  | |/ __|/ _ \| |/ _` | __| |/ _ \| '_ \  |  _| '__/ _` | '_ ` _ \ / _ \ \ /\ / / _ \| '__| |/ /
 _| |\__ \ (_) | | (_| | |_| | (_) | | | | | | | | | (_| | | | | | |  __/\ V  V / (_) | |  |   < 
 \___/___/\___/|_|\__,_|\__|_|\___/|_| |_| \_| |_|  \__,_|_| |_| |_|\___| \_/\_/ \___/|_|  |_|\_\

 */
                                                                                                 

interface IWebService {
  logError(message: string): void;
}

class FakeWebService implements IWebService {
  lastError: string;

  logError(message: string) {
    this.lastError = message;
  }
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

describe("LogAnalyzer", () => {
  it("should call logError when filename is too short", () => {
    // Arrange
    const fakeService = new FakeWebService();
    const analyzer = new LogAnalyzer(fakeService);

    // Act
    analyzer.analyze("a.txt");

    // Assert
    expect(fakeService.lastError).toBe("Filename too short: a.txt");
  });
});