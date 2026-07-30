/**
 * List row from the TMS API mirrors CourseResponseDto on GET /api/v2/courses.
 * ASP.NET Core defaults to camelCase JSON (id, maxCapacity, ..).
 */
export interface Course {
  id: number;
  code: string;
  title: string;
  maxCapacity: number;
  enrollmentCount: number;
}

/**
 * Hypermedia link object returned in V2 responses.
 */
export interface CourseLink {
  href: string;
  rel: string;
  method: string;
}

/**
 * Pagination metadata returned inside the V2 response wrapper.
 */
export interface PagedMeta {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/** 
 * Hypermedia links returned on the GET /api/v2/courses catalogue wrapper.
 */
export interface CatalogueLinks {
  self: string;
  next: string | null;
  prev: string | null;
  enroll: string;
}

/** 
 * Envelope for GET /api/v2/courses (V2 API contract List shape).
 */
export interface PagedResponse<T> {
  data: T[];
  items?: T[];
  meta?: PagedMeta;
  links?: CatalogueLinks;
}

/** 
 * Detail payload mirrors CourseDetailDto (includes course details + hypermedia links). 
 */
export interface CourseDetail extends Course {
  links: readonly CourseLink[];
}