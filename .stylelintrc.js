module.exports = {
  rules: {
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["blockless-after-same-name-blockless", "first-nested"],
        ignore: ["after-comment"]
      }
    ],
    "at-rule-name-case": "lower",
    "at-rule-name-space-after": "always-single-line",
    "at-rule-semicolon-newline-after": "always",
    "block-closing-brace-empty-line-before": "never",
    "block-closing-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always",
    "block-opening-brace-newline-after": "always",
    "block-opening-brace-newline-before": "never-single-line",
    "declaration-bang-space-before": "always",
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-semicolon-newline-after": "always",
    "declaration-block-single-line-max-declarations": 1,
    "declaration-no-important": true,
    "function-calc-no-invalid": true,
    "function-calc-no-unspaced-operator": true,
    "function-comma-space-after": "always",
    "function-comma-space-before": "never",
    "function-linear-gradient-no-nonstandard-direction": true,
    "indentation": 2,
    "length-zero-no-unit": true,
    "max-empty-lines": 1,
    "media-feature-name-no-unknown": true,
    "no-duplicate-selectors": true,
    "no-extra-semicolons": true,
    "property-no-unknown": true,
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "shorthand-property-no-redundant-values": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "unit-no-unknown": true,
    "value-list-comma-space-after": "always",
    "value-list-comma-space-before": "never",
  }
}
