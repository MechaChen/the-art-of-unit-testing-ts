describe('Event listener', () => {
  document.body.innerHTML = `
    <div>
      <div id="contentWrapper"></div>
      <button id="btn"></button>
    </div>
  `
  
  it('should render "Hello World" when view is loaded', () => {
    // Arrange
    let isClickFired = false;
    const button = document.getElementById('btn');
    if (button) {
      button.addEventListener('click', () => {
        isClickFired = true;
      })
    }

    // Act
    button?.click();

    // Assert
    expect(isClickFired).toBe(true);
  })
})