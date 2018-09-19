var miniExcludes = {
  "mauve_viewer/README.md": 1,
  "mauve_viewer/webpack.config": 1,
  "mauve_viewer/app.profile": 1,
  "mauve_viewer/package-lock.json": 1
};
var isDemoRe = /\/demo\//;
var isSrcRe = /\/src\/(.*js)?$/;
var copyOnlyRe = [
  /\/dist/,
  /\/src/
];

var profile = {
  resourceTags: {
    miniExclude: function (filename, mid) {
      return isDemoRe.test(filename) || isSrcRe.test(filename) || mid in miniExcludes;
    },
    amd: function (filename, mid) {
      return /\.js$/.test(filename);
    // },
    // copyOnlyRe: function (filename, mid) {
    //   for (var i = copyOnlyRe.length; i--;) {
    //     if (copyOnlyRe[i].test(mid)) {
    //       return true;
    //     }
    //   }
    //   return false;
    }
  }
};