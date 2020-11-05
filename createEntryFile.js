'use strict';

const fs = require('fs-extra');

module.exports = (outputPath, componentName, viewFileName) => {
  fs.outputFileSync(
    outputPath,
    `import renderView from '../../src/view/renderView';
import ${componentName} from '../../src/view/${viewFileName}';

export default renderView(${componentName});`
  );
};
