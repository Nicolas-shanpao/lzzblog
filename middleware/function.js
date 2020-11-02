function geom(val) {
  let data = []
  val.map((v, k) => {
    v.geom = 'POINT(' + v.lng + ' ' + v.lat + ')'
    data.push(v)
  })
  return data
}

exports.geom = geom
