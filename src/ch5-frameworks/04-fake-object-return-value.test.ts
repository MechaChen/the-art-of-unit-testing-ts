describe('Mock return value', () => {
  interface IFileNameRules {
    isValidLogFileName: (fileName: string) => boolean;
  }

  it('should works for any string argument by default', () => {
    const fakeRules: IFileNameRules = {
      isValidLogFileName: jest.fn((fileName: string) => true)
    }

    expect(fakeRules.isValidLogFileName('randomFileName.json')).toBe(true);
  })
});

describe('Mock throw Error', () => {
  interface IFileNameRules {
    isValidLogFileName: (fileName: string) => void;
  }

  it('should throw error by default', () => {
    const fakeRules: IFileNameRules = {
      isValidLogFileName: jest.fn((fileName: string) => {
        throw new Error('fake error')
      })}

    expect(fakeRules.isValidLogFileName).toThrow();
  })
})