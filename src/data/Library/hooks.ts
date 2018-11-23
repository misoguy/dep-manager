import React from 'react'
import { LIBRARIES_QUERY } from './queries'
import { useQuery } from '../../utils/apollo-hooks'
import { useProjects } from '../Repository'

import { ApolloQueryResult } from 'apollo-boost'
import {
  LibrariesQuery_libraries_nodes,
  LibrariesQuery
} from './__generated-types/LibrariesQuery'
import { Department } from '../../config/types'
import { NodeLibrary } from './__generated-types/NodeLibrary'
import { AndroidLibrary } from './__generated-types/AndroidLibrary'
import { IOSLibrary } from './__generated-types/IOSLibrary'

export function useLibraries (
  department: Department
): ApolloQueryResult<LibrariesQuery_libraries_nodes[] | null> {
  const projectsResult = useProjects(department)
  if (projectsResult.loading || projectsResult.errors || !projectsResult.data) {
    return projectsResult as ApolloQueryResult<null>
  }
  const { data, ...rest } = useQuery<LibrariesQuery>(LIBRARIES_QUERY)
  return React.useMemo(
    () => ({
      ...rest,
      data: data.libraries.nodes.filter(departmentFilter(department))
    }),
    [data, rest.errors, department]
  )
}

const departmentFilter = (department: Department) => (
  node: LibrariesQuery_libraries_nodes
) => {
  switch (department) {
    case Department.FRONTEND:
      return isNodeLibrary(node)
    case Department.ANDROID:
      return isAndroidLibrary(node)
    case Department.IOS:
      return isIOSLibrary(node)
    default:
      return false
  }
}

const isNodeLibrary = (
  node: LibrariesQuery_libraries_nodes
): node is NodeLibrary => node.__typename === 'NodeLibrary'
const isAndroidLibrary = (
  node: LibrariesQuery_libraries_nodes
): node is AndroidLibrary => node.__typename === 'AndroidLibrary'
const isIOSLibrary = (
  node: LibrariesQuery_libraries_nodes
): node is IOSLibrary => node.__typename === 'IOSLibrary'
