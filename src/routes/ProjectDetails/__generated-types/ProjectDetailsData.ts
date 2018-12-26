/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../data/__generated-types'

// ====================================================
// GraphQL query operation: ProjectDetailsData
// ====================================================

export interface ProjectDetailsData_recentLibraries_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  name: string
  version: string
  date: string
}

export interface ProjectDetailsData_recentLibraries {
  __typename: 'BidaLibraryCollection'
  id: string
  outdatedDependentsCount: number
  totalCount: number
  nodes: ProjectDetailsData_recentLibraries_nodes[]
}

export interface ProjectDetailsData_project_BidaIOSProject {
  __typename: 'BidaIOSProject' | 'BidaAndroidProject'
}

export interface ProjectDetailsData_project_BidaNodeProject_dependencies_library {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  license: string | null
}

export interface ProjectDetailsData_project_BidaNodeProject_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
  library: ProjectDetailsData_project_BidaNodeProject_dependencies_library
}

export interface ProjectDetailsData_project_BidaNodeProject {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  url: string
  dependencies: ProjectDetailsData_project_BidaNodeProject_dependencies[]
}

export type ProjectDetailsData_project =
  | ProjectDetailsData_project_BidaIOSProject
  | ProjectDetailsData_project_BidaNodeProject

export interface ProjectDetailsData {
  /**
   * Lookup a collection of library by department and range or project name
   */
  recentLibraries: ProjectDetailsData_recentLibraries
  /**
   * Lookup a project by department and id
   */
  project: ProjectDetailsData_project
}

export interface ProjectDetailsDataVariables {
  department: BidaDepartment
  from: any
  id: string
}