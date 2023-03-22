// External API
import lodashIndex from '!raw-loader!@types/lodash/index.d.ts';
import lodashCommon from '!raw-loader!@types/lodash/common/common.d.ts';
import lodashArray from '!raw-loader!@types/lodash/common/array.d.ts';
import lodashCollection from '!raw-loader!@types/lodash/common/collection.d.ts';
import lodashDate from '!raw-loader!@types/lodash/common/date.d.ts';
import lodashFunction from '!raw-loader!@types/lodash/common/function.d.ts';
import lodashLang from '!raw-loader!@types/lodash/common/lang.d.ts';
import lodashMath from '!raw-loader!@types/lodash/common/math.d.ts';
import lodashNumber from '!raw-loader!@types/lodash/common/number.d.ts';
import lodashObject from '!raw-loader!@types/lodash/common/object.d.ts';
import lodashSeq from '!raw-loader!@types/lodash/common/seq.d.ts';
import lodashString from '!raw-loader!@types/lodash/common/string.d.ts';
import lodashUtil from '!raw-loader!@types/lodash/common/util.d.ts';

// Script API
import space from '!raw-loader!@apitable/widget-sdk/dist/script/space.d.ts';
import datasheetTyping from '!raw-loader!@apitable/widget-sdk/dist/script/datasheet.d.ts';
import viewTyping from '!raw-loader!@apitable/widget-sdk/dist/script/view.d.ts';
import fieldTyping from '!raw-loader!@apitable/widget-sdk/dist/script/field.d.ts';
import recordTyping from '!raw-loader!@apitable/widget-sdk/dist/script/record.d.ts';

// Render API
import input from '!raw-loader!../../render_components/input.interface.ts';
import output from '!raw-loader!../../render_components/output.interface.ts';

const spaceTyping = `
  ${space}
  export = space;
  export as namespace space;
  declare const space: Space;
`;

const inputTyping = `
  ${input}
  export = input;
  export as namespace input;
  declare const input: Input;
`;

const outputTyping = `
  ${output}
  export = output;
  export as namespace output;
  declare const output: Output;
`;

export const allTypes = [
  ['@types/lodash/index.d.ts', lodashIndex],
  ['@types/lodash/common/common.d.ts', lodashCommon],
  ['@types/lodash/common/array.d.ts', lodashArray],
  ['@types/lodash/common/collection.d.ts', lodashCollection],
  ['@types/lodash/common/date.d.ts', lodashDate],
  ['@types/lodash/common/function.d.ts', lodashFunction],
  ['@types/lodash/common/lang.d.ts', lodashLang],
  ['@types/lodash/common/math.d.ts', lodashMath],
  ['@types/lodash/common/number.d.ts', lodashNumber],
  ['@types/lodash/common/object.d.ts', lodashObject],
  ['@types/lodash/common/seq.d.ts', lodashSeq],
  ['@types/lodash/common/string.d.ts', lodashString],
  ['@types/lodash/common/util.d.ts', lodashUtil],
  ['@types/script/space.d.ts', spaceTyping],
  ['@types/script/datasheet.d.ts', datasheetTyping],
  ['@types/script/view.d.ts', viewTyping],
  ['@types/script/field.d.ts', fieldTyping],
  ['@types/script/record.d.ts', recordTyping],
  ['@types/script/input.d.ts', inputTyping],
  ['@types/script/output.d.ts', outputTyping],
];