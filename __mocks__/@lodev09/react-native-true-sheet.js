const React = require('react')

const TrueSheet = React.forwardRef(({ children }, ref) => {
  React.useImperativeHandle(ref, () => ({
    present: jest.fn(),
    dismiss: jest.fn(),
  }))
  return React.createElement('View', null, children)
})

module.exports = { TrueSheet }
