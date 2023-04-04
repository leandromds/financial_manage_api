module.exports = {
  hooks: {
    readPackage(pkg) {
      const newPkgConf = pkg || {};

      if (pkg.name === 'pino') {
        newPkgConf.peerDependencies = newPkgConf.peerDependencies || {};
        newPkgConf.peerDependencies['pino-pretty'] = '*';
      }

      return newPkgConf;
    },
  },
};
