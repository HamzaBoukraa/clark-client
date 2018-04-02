/**
 * Breaks Path string into array of paths. Removes last element assuming last element is file name.
 *
 * @private
 * @param {string} path
 * @returns {string[]}
 * @memberof UploadComponent
 */
export function getPaths(path: string): string[] {
  const paths: string[] = path.split('/');
  if (paths[0] === '') paths.slice(0, 0);
  //Remove file
  paths.pop();
  return paths;
}
