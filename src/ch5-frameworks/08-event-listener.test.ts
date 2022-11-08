describe('Event listener', () => {
  interface IView {
    load: () => void;
  }

  class Renderer {
    view;

    constructor(view: IView) {
      this.view = view;
      this.view.load = this.loadContent;
    }

    loadContent() {
      document.body.innerText = 'Hello world';
    }
  }

  it('should render "Hello World" when view is loaded', () => {
    // Arrange
    const mockView: IView = {
      load: () => {},
    };

    const presenter = new Renderer(mockView);

    // Act
    mockView.load();

    // Assert
    expect(document.body.innerText).toBe('Hello world');
  })
})