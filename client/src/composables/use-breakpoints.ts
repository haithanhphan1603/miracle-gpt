import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export default function () {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const smallerThanLg = breakpoints.smaller('lg') // only smaller than lg

  return { smallerThanLg }
}
