import {
  append,
  concat,
  cond,
  curry,
  equals,
  filter,
  flip,
  map,
  memoizeWith,
  mergeRight,
  mergeWith,
  mergeWithKey,
  nthArg,
  path,
  pathOr,
  pick,
  pipe,
  prop,
  propOr,
  reduce,
  reduceBy,
  reverse,
  sortBy,
  take,
  uniqBy,
  T
} from 'ramda'

const setter = curry(
  (key: string, mapper: (obj: object) => any, obj: object) => ({
    ...obj,
    [key]: mapper(obj)
  })
)

const merger = (mergeMap: object) =>
  mergeWithKey(
    cond(
      // @ts-ignore
      Object.keys(mergeMap)
        .map(key => [
          equals(key),
          (k: string, l: any, r: any) => mergeMap[key](l, r)
        ])
        // default merge-left.
        .concat([[T, nthArg(2)]])
    )
  )

const getLibraries = pipe(
  pathOr([], ['npmPackage', 'dependencies']),
  map(prop('package'))
)

const getOutdated = pipe(
  // @ts-ignore
  propOr([], 'libraries'),
  // @ts-ignore
  filter(prop('outdated'))
)

const getOutdates = pipe(
  getOutdated,
  // @ts-ignore
  reduceBy(
    flip(append),
    // @ts-ignore
    [],
    prop('outdated')
  )
)

// this operation can be expensive... memoization for the rescue.
const buildLibrariesInfo = memoizeWith(
  prop('cursor'),
  pipe(
    // @ts-ignore
    prop('node'),
    // @ts-ignore
    setter('libraries', getLibraries),
    setter('outdates', getOutdates),
    pick(['libraries', 'outdates'])
  )
)

const mergeLibrariesInfo = pipe(
  merger({
    libraries: concat,
    outdates: mergeWith(pipe(concat))
  }),
  mergeRight({ libraries: [], outdates: {} })
)

const getUniqueLibraries = pipe(
  // @ts-ignore
  propOr([], 'libraries'),
  // @ts-ignore
  uniqBy(prop('name'))
)

const getRecentlyUpdated = pipe(
  // @ts-ignore
  prop('uniqueLibraries'),
  // @ts-ignore
  sortBy(path(['analysis', 'collected', 'metadata', 'date'])),
  // @ts-ignore
  reverse,
  // @ts-ignore
  take(10)
)

const extractLibrariesInfo = pipe(
  // @ts-ignore
  prop('edges'),
  map(buildLibrariesInfo),
  reduce(mergeLibrariesInfo, {}),
  setter('uniqueLibraries', getUniqueLibraries),
  setter('recentlyUpdated', getRecentlyUpdated)
)

export { extractLibrariesInfo }
