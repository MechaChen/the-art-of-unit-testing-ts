describe('Event listener', () => {
  document.body.innerHTML = `
    <div>
      <div id="contentWrapper"></div>
      <button id="btn"></button>
    </div>
  `
  
  interface IView {
    content: string;
  }

  class Renderer {
    view: IView;

    constructor(view: IView) {
      this.view = view;
      const button = document.getElementById('btn');
      button?.addEventListener('click', this.loadContent)
    }

    loadContent = () => {
      const contentWrapper = document.getElementById('contentWrapper');
      if (contentWrapper) {
        contentWrapper.innerText = this.view.content
      }
    }
  }

  it('should render "Hello World" when view is loaded', () => {
    // Arrange
    const mockView: IView = {
      content: 'Hello world',
    };

    const presenter = new Renderer(mockView);

    // Act
    document.getElementById('btn')?.click();

    // Assert
    expect(document.getElementById('contentWrapper')?.innerText).toBe('Hello world');
  })
})