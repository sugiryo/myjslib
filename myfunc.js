function readQuery(queryName) {
  let dataSource = null;
  dataSource = datasets.filter(function(d) {
    return d.queryName == queryName;
  })[0];
  if (!dataSource || dataSource.content.length == 0) {
    console.log('ERROR: Empty data. Query: ' + queryName);
  }
  return dataSource;
}