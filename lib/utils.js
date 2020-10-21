exports.parseOdooArgs = (args = []) => {
  const regexp = /((?<f>(.*))((?<o>(?:<=|>=|<|>|=)))(?<l>(.*)))/g;

  const argSplit = args.map(elm => {
    const array = [...elm.matchAll(regexp)];
    const groups = array[0].groups;
    return [groups.f.trim(), groups.o.trim(), groups.l.trim()]
  })

  return [argSplit]
}
