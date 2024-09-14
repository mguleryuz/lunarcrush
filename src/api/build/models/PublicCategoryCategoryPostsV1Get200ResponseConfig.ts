/* tslint:disable */
/* eslint-disable */
/**
 * LunarCrush API v4 overview
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 4.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime'
/**
 *
 * @export
 * @interface PublicCategoryCategoryPostsV1Get200ResponseConfig
 */
export interface PublicCategoryCategoryPostsV1Get200ResponseConfig {
  /**
   * The category of the config
   * @type {string}
   * @memberof PublicCategoryCategoryPostsV1Get200ResponseConfig
   */
  category?: string
  /**
   * The type of config
   * @type {string}
   * @memberof PublicCategoryCategoryPostsV1Get200ResponseConfig
   */
  type?: string
  /**
   * The unique ID of the config
   * @type {string}
   * @memberof PublicCategoryCategoryPostsV1Get200ResponseConfig
   */
  id?: string
  /**
   * Timestamp when the config was generated
   * @type {number}
   * @memberof PublicCategoryCategoryPostsV1Get200ResponseConfig
   */
  generated?: number
}

/**
 * Check if a given object implements the PublicCategoryCategoryPostsV1Get200ResponseConfig interface.
 */
export function instanceOfPublicCategoryCategoryPostsV1Get200ResponseConfig(
  value: object
): value is PublicCategoryCategoryPostsV1Get200ResponseConfig {
  return true
}

export function PublicCategoryCategoryPostsV1Get200ResponseConfigFromJSON(
  json: any
): PublicCategoryCategoryPostsV1Get200ResponseConfig {
  return PublicCategoryCategoryPostsV1Get200ResponseConfigFromJSONTyped(
    json,
    false
  )
}

export function PublicCategoryCategoryPostsV1Get200ResponseConfigFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): PublicCategoryCategoryPostsV1Get200ResponseConfig {
  if (json == null) {
    return json
  }
  return {
    category: json['category'] == null ? undefined : json['category'],
    type: json['type'] == null ? undefined : json['type'],
    id: json['id'] == null ? undefined : json['id'],
    generated: json['generated'] == null ? undefined : json['generated'],
  }
}

export function PublicCategoryCategoryPostsV1Get200ResponseConfigToJSON(
  value?: PublicCategoryCategoryPostsV1Get200ResponseConfig | null
): any {
  if (value == null) {
    return value
  }
  return {
    category: value['category'],
    type: value['type'],
    id: value['id'],
    generated: value['generated'],
  }
}
