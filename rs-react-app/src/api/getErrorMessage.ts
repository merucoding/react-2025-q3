import HttpStatusCode from '../types/httpStatusCode';

export function getErrorMessage(
  statusCode: number,
  searchText: string
): string {
  if (statusCode === HttpStatusCode.NOT_FOUND) {
    return `Error ${statusCode}: Pokemon "${searchText}" not found`;
  } else if (
    statusCode >= HttpStatusCode.BAD_REQUEST &&
    statusCode < HttpStatusCode.INTERNAL_SERVER_ERROR
  ) {
    return `Client error ${statusCode}`;
  } else if (statusCode >= HttpStatusCode.INTERNAL_SERVER_ERROR) {
    return `Server error ${statusCode}`;
  }
  return `Unexpected error ${statusCode}`;
}
