import React, { memo, useMemo, FunctionComponent } from 'react'
import mem from 'mem'
import { ascend, path, prop } from 'ramda'

import Badge, { BadgeType } from '../Badge'
import Table, { Column } from '../Table/index'
import { versionDistance } from '../../utils/version-diff'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import { BidaDepartment } from '../../config/types'
import * as routes from '../../routes/routes'

import { useSort } from '../../hooks/useSort'

interface IDependent {
  node: {
    version: string
    repository: {
      name: string
    }
  }
}

interface INormalizedDependent {
  name: string
  version: string
  distance: string
}

interface IProps {
  cacheKey?: string
  dependents: IDependent[]
  libraryVersion: string
  department: BidaDepartment
}

const defaultSort = ascend(prop('name'))

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendProjects,
  [BidaDepartment.FRONTEND]: routes.frontendProjects,
}

const versionBadgeType = {
  MAJOR: BadgeType.DANGER,
  MINOR: BadgeType.WARNING,
}

interface IRenderVersion {
  rowData: {
    distance: string
    version: string
  }
}

const renderVersion = ({
  rowData: { distance, version },
}: IRenderVersion): JSX.Element => (
  <Badge type={versionBadgeType[distance]}>{version}</Badge>
)

/**
 * Flattens and processes a dependent data for easier display and sort operations.
 */
const normalize = mem(
  (dependent: IDependent, libraryVersion: string) => ({
    name: dependent.node.repository.name,
    version: dependent.node.version,
    distance: versionDistance(libraryVersion, dependent.node.version),
  }),
  { cacheKey: path(['node', 'id']) }
)

const NodeLibraryDependentsTable: FunctionComponent<IProps> = ({
  cacheKey,
  dependents,
  libraryVersion,
  department,
}: IProps): JSX.Element => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(
    () => dependents.map(dep => normalize(dep, libraryVersion)),
    cacheKeys
  )

  // state

  const [sorted, setSort, sort] = useSort({
    list,
    cacheKeys,
    defaultSort,
    initial: { sortBy: 'name', sortDirection: 'ASC' },
  })

  // renderers.

  const rowGetter = ({ index }: { index: number }): INormalizedDependent =>
    sorted[index]

  const baseURL = departmentBaseURLs[department]
  const rowRenderer = baseURL
    ? anchorRowRenderer(baseURL, prop('name'))
    : undefined

  return (
    <Table
      sort={setSort}
      sortBy={sort.sortBy}
      sortDirection={sort.sortDirection}
      rowCount={dependents.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} label="Project Name" dataKey="name" />

      <Column
        disableSort
        width={280}
        dataKey="distance"
        label="Used Version"
        cellRenderer={renderVersion}
      />
    </Table>
  )
}

export default memo(NodeLibraryDependentsTable, (prev: IProps, next: IProps) =>
  prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
