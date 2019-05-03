/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SemverOutdateStatus } from "./../../../generated/graphql-types";

// ====================================================
// GraphQL query operation: PROJECT_QUERY
// ====================================================

export interface PROJECT_QUERY_project_npmPackage_dependencies_package {
  __typename: "NPMPackage";
  id: string;
  name: string;
  license: string | null;
  version: string | null;
  updatedAt: string | null;
}

export interface PROJECT_QUERY_project_npmPackage_dependencies {
  __typename: "NPMDependency";
  id: string;
  version: string;
  outdateStatus: SemverOutdateStatus | null;
  package: PROJECT_QUERY_project_npmPackage_dependencies_package;
}

export interface PROJECT_QUERY_project_npmPackage {
  __typename: "NPMPackage";
  id: string;
  dependencies: (PROJECT_QUERY_project_npmPackage_dependencies | null)[];
}

export interface PROJECT_QUERY_project {
  __typename: "Repository";
  id: string;
  /**
   * The HTTP URL for this repository
   */
  url: any;
  /**
   * The name of the repository.
   */
  name: string;
  npmPackage: PROJECT_QUERY_project_npmPackage | null;
}

export interface PROJECT_QUERY {
  /**
   * Lookup a project by name
   */
  project: PROJECT_QUERY_project;
}

export interface PROJECT_QUERYVariables {
  name: string;
}
