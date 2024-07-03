console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('test/features/user-visits-root-test.js', 'utf8');

describe('Syntax Error, on ', function () {
  it('step 2', function() {
    let structureSelector = function() {
      describe($descriptionOuter, () => {
        describe($descriptionInner, () => {
          it($itMsg, () => {
            browser.url($root)
          });
        });
      });
    };
      
    let varCallbacks = [
      function($root){
        if ($root.value !=='/'){
          return {failure: "Set your `browser.url()` path to '/'"};
        }
        return true;
      }
    ]
      
   let isMatchSelector = Structured.match(code, structureSelector,{varCallbacks: varCallbacks});
   let failureMessage = varCallbacks.failure || 'Did you add an `it` block inside the nested `describe` blocks?';
    
    assert.isOk(isMatchSelector , failureMessage)
  })
})