// StubWebService to throw error
// MockEmailService to catch error and send email
// LogAnalyzer to handle StubService error and send it to MockEmailService

describe('Mock and Stub', () => {
  interface EmailElements {
    to: string;
    subject: string;
    body: string;
  }

  interface IWebService {
    logError: (error: string) => void;
  }

  interface IEmailService {
    send: ({ to, subject, body }: EmailElements) => void;
  }

  class StubWebService implements IWebService {
    logError() {
      throw new Error('stub exception');
    }
  }

  class MockEmailService implements IEmailService {
    to: string;
    subject: string;
    body: string;

    send({ to, subject, body }) {
      this.to = to;
      this.subject = subject;
      this.body = body;
    }
  }

  class LogAnalyzer {
    webService: IWebService;
    emailService: IEmailService;

    constructor(webService: IWebService, emailService: IEmailService) {
      this.webService = webService;
      this.emailService = emailService;
    }

    analyze(fileName: string) {
      if (fileName.length < 20) {
        try {
          this.webService.logError('File name is too short : ', );
        } catch (err) {
          this.emailService.send({
            to: 'someone@trendmicro.com',
            subject: "can't log",
            body: err.message,
          })
        }
      }
    }
  }

  test('SHOULD send an log fail email WHEN web service crashes', () => {
    // Arrange
    const stubWebService = new StubWebService();
    const mockEmailService = new MockEmailService();
    const logAnalyzer = new LogAnalyzer(stubWebService, mockEmailService);

    // Act
    logAnalyzer.analyze('tooShort.txt');

    // Assert
    expect(mockEmailService.to).toBe('someone@trendmicro.com');
    expect(mockEmailService.subject).toBe("can't log");
    expect(mockEmailService.body).toBe('stub exception');
  })
})