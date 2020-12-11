function checkData(nonzeroQueryNameArray) {
  let isDataOk = true;
  let queryStateInfoStr = 'Query state:<ul>';
  datasets.sort(function(a, b){return a['queryName'].localeCompare(b['queryName'])}).forEach(function(d) {
    let desc = 'Succeeded';
    let spanclass = 'query_succeeded';
    if(d['state'] !== 'succeeded') {
      isDataOk = false;
      desc = 'Failed';
      spanclass = 'query_failed';
    } else if(nonzeroQueryNameArray.includes(d['queryName']) && d['count'] == 0) {
      isDataOk = false;
      desc = 'Succeeded but returned no row'
      spanclass = 'query_empty';
    }
    queryStateInfoStr += '<li>' + d['queryName'] + ': ' + getElem('span', desc, [spanclass]).outerHTML + '</li>';
  });
  queryStateInfoStr += '</ul>';
  document.getElementById("loadingdiv").innerHTML = getElem('div', queryStateInfoStr, ['queryState']).outerHTML;
  return isDataOk;
}

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