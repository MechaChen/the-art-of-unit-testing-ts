describe('Event listener', () => {
  interface IView {
    content: string;
    load: () => void;
  }

  interface ILogger {
    error: string;
    sendErrorMessage: (error: string) => void;
  }

  class Renderer {
    view: IView;
    logger: ILogger;

    constructor(view: IView, logger: ILogger) {
      this.view = view;
      this.logger = logger;
    }

    loadContent() {
      try {
        this.view.load();
      } catch (err) {
        this.logger.sendErrorMessage(err.message);
      }
    }
  }

  it('should render call logger when view fails to load', () => {
    // Arrange
    const stubView: IView = {
      content: 'Hello world',
      load: () => {
        throw new Error('stub load error');
      },
    };

    const mockLogger: ILogger = {
      error: '',
      sendErrorMessage: jest.fn((error) => mockLogger.error = error),
    };

    const presenter = new Renderer(stubView, mockLogger);

    // Act
    presenter.loadContent();

    // Assert
    expect(mockLogger.error).toBe('stub load error');
  })
})