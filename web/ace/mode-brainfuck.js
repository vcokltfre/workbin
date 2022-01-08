define(
  "ace/mode/brainfuck_highlight_rules",
  ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"],
  function (e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function () {
        (this.$rules = {
          start: [
            {
              token: "comment",
              regex: /[^,\.<>\[\]+-]/,
            },
            {
              token: "paren.lparen",
              regex: /\[/,
            },
            {
              token: "paren.rparen",
              regex: /\]/,
            },
            {
              token: "constant.numeric",
              regex: /[+-]/,
            },
            {
              token: "keyword",
              regex: /[<>]/,
            },
            {
              token: "string",
              regex: /[\.,]/,
            },
          ],
        }),
          this.normalizeRules();
      };
    (s.metaData = { fileTypes: ["brainfuck"], name: "Brainfuck" }), r.inherits(s, i), (t.BrainfuckHighlightRules = s);
  },
),
  define(
    "ace/mode/brainfuck",
    ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/brainfuck_highlight_rules"],
    function (e, t, n) {
      "use strict";
      var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./brainfuck_highlight_rules").BrainfuckHighlightRules,
        o = function () {
          (this.HighlightRules = s), (this.$behaviour = this.$defaultBehaviour);
        };
      r.inherits(o, i),
        function () {
          (this.lineCommentStart = "#"), (this.$id = "ace/mode/brainfuck");
        }.call(o.prototype),
        (t.Mode = o);
    },
  );
(function () {
  window.require(["ace/mode/brainfuck"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
