describe('Event listener', () => {
  interface IView {
    content: string;
    load: () => void;
  }

  class Renderer {
    view: IView;

    constructor(view: IView) {
      this.view = view;
      this.view.load = () => this.loadContent(this.view.content);
    }

    loadContent(content: string) {
      document.body.innerText = content;
    }
  }

  it('should render "Hello World" when view is loaded', () => {
    // Arrange
    const mockView: IView = {
      content: 'Hello world',
      load: () => {},
    };

    const presenter = new Renderer(mockView);

    // Act
    mockView.load();

    // Assert
    expect(document.body.innerText).toBe('Hello world');
  })
})