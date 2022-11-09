module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/src/tests/setupEnv.ts',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/tests/setup.ts',
  ],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^core(.*)$': '<rootDir>/src/core$1',
    '^helpers(.*)$': '<rootDir>/src/helpers$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^data(.*)$': '<rootDir>/src/data$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^api(.*)$': '<rootDir>/src/api$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^tests(.*)$': '<rootDir>/src/tests$1',
    '\\.(png|webp)$': '<rootDir>/src/tests/fileMock.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
