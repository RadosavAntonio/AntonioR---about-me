const React = require('react')

module.exports = {
  withStallion: Component => Component,
  useStallionUpdate: () => ({
    isRestartRequired: false,
    newReleaseBundle: null,
  }),
  useStallionModal: () => ({
    showModal: jest.fn(),
  }),
  sync: jest.fn(),
  restart: jest.fn(),
}
