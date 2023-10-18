(() => {
  "use strict";
  function t(e) {
    return (
      (t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      t(e)
    );
  }
  function e(t, e) {
    if (e.length < t)
      throw new TypeError(
        t +
          " argument" +
          (t > 1 ? "s" : "") +
          " required, but only " +
          e.length +
          " present",
      );
  }
  function n(n) {
    e(1, arguments);
    var a = Object.prototype.toString.call(n);
    return n instanceof Date || ("object" === t(n) && "[object Date]" === a)
      ? new Date(n.getTime())
      : "number" == typeof n || "[object Number]" === a
      ? new Date(n)
      : (("string" != typeof n && "[object String]" !== a) ||
          "undefined" == typeof console ||
          (console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments",
          ),
          console.warn(new Error().stack)),
        new Date(NaN));
  }
  function a(t) {
    if (null === t || !0 === t || !1 === t) return NaN;
    var e = Number(t);
    return isNaN(e) ? e : e < 0 ? Math.ceil(e) : Math.floor(e);
  }
  function i(t) {
    e(1, arguments);
    var a = n(t),
      i = a.getUTCDay(),
      r = (i < 1 ? 7 : 0) + i - 1;
    return a.setUTCDate(a.getUTCDate() - r), a.setUTCHours(0, 0, 0, 0), a;
  }
  function r(t) {
    e(1, arguments);
    var a = n(t),
      r = a.getUTCFullYear(),
      o = new Date(0);
    o.setUTCFullYear(r + 1, 0, 4), o.setUTCHours(0, 0, 0, 0);
    var s = i(o),
      d = new Date(0);
    d.setUTCFullYear(r, 0, 4), d.setUTCHours(0, 0, 0, 0);
    var l = i(d);
    return a.getTime() >= s.getTime()
      ? r + 1
      : a.getTime() >= l.getTime()
      ? r
      : r - 1;
  }
  var o = {};
  function s() {
    return o;
  }
  function d(t, i) {
    var r, o, d, l, c, u, m, h;
    e(1, arguments);
    var f = s(),
      g = a(
        null !==
          (r =
            null !==
              (o =
                null !==
                  (d =
                    null !== (l = null == i ? void 0 : i.weekStartsOn) &&
                    void 0 !== l
                      ? l
                      : null == i ||
                        null === (c = i.locale) ||
                        void 0 === c ||
                        null === (u = c.options) ||
                        void 0 === u
                      ? void 0
                      : u.weekStartsOn) && void 0 !== d
                  ? d
                  : f.weekStartsOn) && void 0 !== o
              ? o
              : null === (m = f.locale) ||
                void 0 === m ||
                null === (h = m.options) ||
                void 0 === h
              ? void 0
              : h.weekStartsOn) && void 0 !== r
          ? r
          : 0,
      );
    if (!(g >= 0 && g <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var p = n(t),
      v = p.getUTCDay(),
      w = (v < g ? 7 : 0) + v - g;
    return p.setUTCDate(p.getUTCDate() - w), p.setUTCHours(0, 0, 0, 0), p;
  }
  function l(t, i) {
    var r, o, l, c, u, m, h, f;
    e(1, arguments);
    var g = n(t),
      p = g.getUTCFullYear(),
      v = s(),
      w = a(
        null !==
          (r =
            null !==
              (o =
                null !==
                  (l =
                    null !==
                      (c = null == i ? void 0 : i.firstWeekContainsDate) &&
                    void 0 !== c
                      ? c
                      : null == i ||
                        null === (u = i.locale) ||
                        void 0 === u ||
                        null === (m = u.options) ||
                        void 0 === m
                      ? void 0
                      : m.firstWeekContainsDate) && void 0 !== l
                  ? l
                  : v.firstWeekContainsDate) && void 0 !== o
              ? o
              : null === (h = v.locale) ||
                void 0 === h ||
                null === (f = h.options) ||
                void 0 === f
              ? void 0
              : f.firstWeekContainsDate) && void 0 !== r
          ? r
          : 1,
      );
    if (!(w >= 1 && w <= 7))
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively",
      );
    var b = new Date(0);
    b.setUTCFullYear(p + 1, 0, w), b.setUTCHours(0, 0, 0, 0);
    var y = d(b, i),
      k = new Date(0);
    k.setUTCFullYear(p, 0, w), k.setUTCHours(0, 0, 0, 0);
    var L = d(k, i);
    return g.getTime() >= y.getTime()
      ? p + 1
      : g.getTime() >= L.getTime()
      ? p
      : p - 1;
  }
  function c(t, e) {
    for (var n = t < 0 ? "-" : "", a = Math.abs(t).toString(); a.length < e; )
      a = "0" + a;
    return n + a;
  }
  const u = function (t, e) {
      var n = t.getUTCFullYear(),
        a = n > 0 ? n : 1 - n;
      return c("yy" === e ? a % 100 : a, e.length);
    },
    m = function (t, e) {
      var n = t.getUTCMonth();
      return "M" === e ? String(n + 1) : c(n + 1, 2);
    },
    h = function (t, e) {
      return c(t.getUTCDate(), e.length);
    },
    f = function (t, e) {
      return c(t.getUTCHours() % 12 || 12, e.length);
    },
    g = function (t, e) {
      return c(t.getUTCHours(), e.length);
    },
    p = function (t, e) {
      return c(t.getUTCMinutes(), e.length);
    },
    v = function (t, e) {
      return c(t.getUTCSeconds(), e.length);
    },
    w = function (t, e) {
      var n = e.length,
        a = t.getUTCMilliseconds();
      return c(Math.floor(a * Math.pow(10, n - 3)), e.length);
    };
  var b = {
    G: function (t, e, n) {
      var a = t.getUTCFullYear() > 0 ? 1 : 0;
      switch (e) {
        case "G":
        case "GG":
        case "GGG":
          return n.era(a, { width: "abbreviated" });
        case "GGGGG":
          return n.era(a, { width: "narrow" });
        default:
          return n.era(a, { width: "wide" });
      }
    },
    y: function (t, e, n) {
      if ("yo" === e) {
        var a = t.getUTCFullYear(),
          i = a > 0 ? a : 1 - a;
        return n.ordinalNumber(i, { unit: "year" });
      }
      return u(t, e);
    },
    Y: function (t, e, n, a) {
      var i = l(t, a),
        r = i > 0 ? i : 1 - i;
      return "YY" === e
        ? c(r % 100, 2)
        : "Yo" === e
        ? n.ordinalNumber(r, { unit: "year" })
        : c(r, e.length);
    },
    R: function (t, e) {
      return c(r(t), e.length);
    },
    u: function (t, e) {
      return c(t.getUTCFullYear(), e.length);
    },
    Q: function (t, e, n) {
      var a = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (e) {
        case "Q":
          return String(a);
        case "QQ":
          return c(a, 2);
        case "Qo":
          return n.ordinalNumber(a, { unit: "quarter" });
        case "QQQ":
          return n.quarter(a, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return n.quarter(a, { width: "narrow", context: "formatting" });
        default:
          return n.quarter(a, { width: "wide", context: "formatting" });
      }
    },
    q: function (t, e, n) {
      var a = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (e) {
        case "q":
          return String(a);
        case "qq":
          return c(a, 2);
        case "qo":
          return n.ordinalNumber(a, { unit: "quarter" });
        case "qqq":
          return n.quarter(a, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return n.quarter(a, { width: "narrow", context: "standalone" });
        default:
          return n.quarter(a, { width: "wide", context: "standalone" });
      }
    },
    M: function (t, e, n) {
      var a = t.getUTCMonth();
      switch (e) {
        case "M":
        case "MM":
          return m(t, e);
        case "Mo":
          return n.ordinalNumber(a + 1, { unit: "month" });
        case "MMM":
          return n.month(a, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return n.month(a, { width: "narrow", context: "formatting" });
        default:
          return n.month(a, { width: "wide", context: "formatting" });
      }
    },
    L: function (t, e, n) {
      var a = t.getUTCMonth();
      switch (e) {
        case "L":
          return String(a + 1);
        case "LL":
          return c(a + 1, 2);
        case "Lo":
          return n.ordinalNumber(a + 1, { unit: "month" });
        case "LLL":
          return n.month(a, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return n.month(a, { width: "narrow", context: "standalone" });
        default:
          return n.month(a, { width: "wide", context: "standalone" });
      }
    },
    w: function (t, i, r, o) {
      var u = (function (t, i) {
        e(1, arguments);
        var r = n(t),
          o =
            d(r, i).getTime() -
            (function (t, n) {
              var i, r, o, c, u, m, h, f;
              e(1, arguments);
              var g = s(),
                p = a(
                  null !==
                    (i =
                      null !==
                        (r =
                          null !==
                            (o =
                              null !==
                                (c =
                                  null == n
                                    ? void 0
                                    : n.firstWeekContainsDate) && void 0 !== c
                                ? c
                                : null == n ||
                                  null === (u = n.locale) ||
                                  void 0 === u ||
                                  null === (m = u.options) ||
                                  void 0 === m
                                ? void 0
                                : m.firstWeekContainsDate) && void 0 !== o
                            ? o
                            : g.firstWeekContainsDate) && void 0 !== r
                        ? r
                        : null === (h = g.locale) ||
                          void 0 === h ||
                          null === (f = h.options) ||
                          void 0 === f
                        ? void 0
                        : f.firstWeekContainsDate) && void 0 !== i
                    ? i
                    : 1,
                ),
                v = l(t, n),
                w = new Date(0);
              return (
                w.setUTCFullYear(v, 0, p), w.setUTCHours(0, 0, 0, 0), d(w, n)
              );
            })(r, i).getTime();
        return Math.round(o / 6048e5) + 1;
      })(t, o);
      return "wo" === i ? r.ordinalNumber(u, { unit: "week" }) : c(u, i.length);
    },
    I: function (t, a, o) {
      var s = (function (t) {
        e(1, arguments);
        var a = n(t),
          o =
            i(a).getTime() -
            (function (t) {
              e(1, arguments);
              var n = r(t),
                a = new Date(0);
              return a.setUTCFullYear(n, 0, 4), a.setUTCHours(0, 0, 0, 0), i(a);
            })(a).getTime();
        return Math.round(o / 6048e5) + 1;
      })(t);
      return "Io" === a ? o.ordinalNumber(s, { unit: "week" }) : c(s, a.length);
    },
    d: function (t, e, n) {
      return "do" === e
        ? n.ordinalNumber(t.getUTCDate(), { unit: "date" })
        : h(t, e);
    },
    D: function (t, a, i) {
      var r = (function (t) {
        e(1, arguments);
        var a = n(t),
          i = a.getTime();
        a.setUTCMonth(0, 1), a.setUTCHours(0, 0, 0, 0);
        var r = i - a.getTime();
        return Math.floor(r / 864e5) + 1;
      })(t);
      return "Do" === a
        ? i.ordinalNumber(r, { unit: "dayOfYear" })
        : c(r, a.length);
    },
    E: function (t, e, n) {
      var a = t.getUTCDay();
      switch (e) {
        case "E":
        case "EE":
        case "EEE":
          return n.day(a, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return n.day(a, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return n.day(a, { width: "short", context: "formatting" });
        default:
          return n.day(a, { width: "wide", context: "formatting" });
      }
    },
    e: function (t, e, n, a) {
      var i = t.getUTCDay(),
        r = (i - a.weekStartsOn + 8) % 7 || 7;
      switch (e) {
        case "e":
          return String(r);
        case "ee":
          return c(r, 2);
        case "eo":
          return n.ordinalNumber(r, { unit: "day" });
        case "eee":
          return n.day(i, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return n.day(i, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return n.day(i, { width: "short", context: "formatting" });
        default:
          return n.day(i, { width: "wide", context: "formatting" });
      }
    },
    c: function (t, e, n, a) {
      var i = t.getUTCDay(),
        r = (i - a.weekStartsOn + 8) % 7 || 7;
      switch (e) {
        case "c":
          return String(r);
        case "cc":
          return c(r, e.length);
        case "co":
          return n.ordinalNumber(r, { unit: "day" });
        case "ccc":
          return n.day(i, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return n.day(i, { width: "narrow", context: "standalone" });
        case "cccccc":
          return n.day(i, { width: "short", context: "standalone" });
        default:
          return n.day(i, { width: "wide", context: "standalone" });
      }
    },
    i: function (t, e, n) {
      var a = t.getUTCDay(),
        i = 0 === a ? 7 : a;
      switch (e) {
        case "i":
          return String(i);
        case "ii":
          return c(i, e.length);
        case "io":
          return n.ordinalNumber(i, { unit: "day" });
        case "iii":
          return n.day(a, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return n.day(a, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return n.day(a, { width: "short", context: "formatting" });
        default:
          return n.day(a, { width: "wide", context: "formatting" });
      }
    },
    a: function (t, e, n) {
      var a = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (e) {
        case "a":
        case "aa":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "aaa":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "aaaaa":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    b: function (t, e, n) {
      var a,
        i = t.getUTCHours();
      switch (
        ((a =
          12 === i ? "noon" : 0 === i ? "midnight" : i / 12 >= 1 ? "pm" : "am"),
        e)
      ) {
        case "b":
        case "bb":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "bbb":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "bbbbb":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    B: function (t, e, n) {
      var a,
        i = t.getUTCHours();
      switch (
        ((a =
          i >= 17
            ? "evening"
            : i >= 12
            ? "afternoon"
            : i >= 4
            ? "morning"
            : "night"),
        e)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "BBBBB":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    h: function (t, e, n) {
      if ("ho" === e) {
        var a = t.getUTCHours() % 12;
        return 0 === a && (a = 12), n.ordinalNumber(a, { unit: "hour" });
      }
      return f(t, e);
    },
    H: function (t, e, n) {
      return "Ho" === e
        ? n.ordinalNumber(t.getUTCHours(), { unit: "hour" })
        : g(t, e);
    },
    K: function (t, e, n) {
      var a = t.getUTCHours() % 12;
      return "Ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : c(a, e.length);
    },
    k: function (t, e, n) {
      var a = t.getUTCHours();
      return (
        0 === a && (a = 24),
        "ko" === e ? n.ordinalNumber(a, { unit: "hour" }) : c(a, e.length)
      );
    },
    m: function (t, e, n) {
      return "mo" === e
        ? n.ordinalNumber(t.getUTCMinutes(), { unit: "minute" })
        : p(t, e);
    },
    s: function (t, e, n) {
      return "so" === e
        ? n.ordinalNumber(t.getUTCSeconds(), { unit: "second" })
        : v(t, e);
    },
    S: function (t, e) {
      return w(t, e);
    },
    X: function (t, e, n, a) {
      var i = (a._originalDate || t).getTimezoneOffset();
      if (0 === i) return "Z";
      switch (e) {
        case "X":
          return k(i);
        case "XXXX":
        case "XX":
          return L(i);
        default:
          return L(i, ":");
      }
    },
    x: function (t, e, n, a) {
      var i = (a._originalDate || t).getTimezoneOffset();
      switch (e) {
        case "x":
          return k(i);
        case "xxxx":
        case "xx":
          return L(i);
        default:
          return L(i, ":");
      }
    },
    O: function (t, e, n, a) {
      var i = (a._originalDate || t).getTimezoneOffset();
      switch (e) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + y(i, ":");
        default:
          return "GMT" + L(i, ":");
      }
    },
    z: function (t, e, n, a) {
      var i = (a._originalDate || t).getTimezoneOffset();
      switch (e) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + y(i, ":");
        default:
          return "GMT" + L(i, ":");
      }
    },
    t: function (t, e, n, a) {
      var i = a._originalDate || t;
      return c(Math.floor(i.getTime() / 1e3), e.length);
    },
    T: function (t, e, n, a) {
      return c((a._originalDate || t).getTime(), e.length);
    },
  };
  function y(t, e) {
    var n = t > 0 ? "-" : "+",
      a = Math.abs(t),
      i = Math.floor(a / 60),
      r = a % 60;
    if (0 === r) return n + String(i);
    var o = e || "";
    return n + String(i) + o + c(r, 2);
  }
  function k(t, e) {
    return t % 60 == 0 ? (t > 0 ? "-" : "+") + c(Math.abs(t) / 60, 2) : L(t, e);
  }
  function L(t, e) {
    var n = e || "",
      a = t > 0 ? "-" : "+",
      i = Math.abs(t);
    return a + c(Math.floor(i / 60), 2) + n + c(i % 60, 2);
  }
  const x = b;
  var C = function (t, e) {
      switch (t) {
        case "P":
          return e.date({ width: "short" });
        case "PP":
          return e.date({ width: "medium" });
        case "PPP":
          return e.date({ width: "long" });
        default:
          return e.date({ width: "full" });
      }
    },
    T = function (t, e) {
      switch (t) {
        case "p":
          return e.time({ width: "short" });
        case "pp":
          return e.time({ width: "medium" });
        case "ppp":
          return e.time({ width: "long" });
        default:
          return e.time({ width: "full" });
      }
    },
    j = {
      p: T,
      P: function (t, e) {
        var n,
          a = t.match(/(P+)(p+)?/) || [],
          i = a[1],
          r = a[2];
        if (!r) return C(t, e);
        switch (i) {
          case "P":
            n = e.dateTime({ width: "short" });
            break;
          case "PP":
            n = e.dateTime({ width: "medium" });
            break;
          case "PPP":
            n = e.dateTime({ width: "long" });
            break;
          default:
            n = e.dateTime({ width: "full" });
        }
        return n.replace("{{date}}", C(i, e)).replace("{{time}}", T(r, e));
      },
    };
  const M = j;
  function S(t) {
    var e = new Date(
      Date.UTC(
        t.getFullYear(),
        t.getMonth(),
        t.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds(),
      ),
    );
    return e.setUTCFullYear(t.getFullYear()), t.getTime() - e.getTime();
  }
  var D = ["D", "DD"],
    P = ["YY", "YYYY"];
  function N(t, e, n) {
    if ("YYYY" === t)
      throw new RangeError(
        "Use `yyyy` instead of `YYYY` (in `"
          .concat(e, "`) for formatting years to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
          ),
      );
    if ("YY" === t)
      throw new RangeError(
        "Use `yy` instead of `YY` (in `"
          .concat(e, "`) for formatting years to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
          ),
      );
    if ("D" === t)
      throw new RangeError(
        "Use `d` instead of `D` (in `"
          .concat(e, "`) for formatting days of the month to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
          ),
      );
    if ("DD" === t)
      throw new RangeError(
        "Use `dd` instead of `DD` (in `"
          .concat(e, "`) for formatting days of the month to the input `")
          .concat(
            n,
            "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
          ),
      );
  }
  var q = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  };
  function E(t) {
    return function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n = e.width ? String(e.width) : t.defaultWidth;
      return t.formats[n] || t.formats[t.defaultWidth];
    };
  }
  var U,
    A = {
      date: E({
        formats: {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        },
        defaultWidth: "full",
      }),
      time: E({
        formats: {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        },
        defaultWidth: "full",
      }),
      dateTime: E({
        formats: {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        },
        defaultWidth: "full",
      }),
    },
    W = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P",
    };
  function Y(t) {
    return function (e, n) {
      var a;
      if (
        "formatting" ===
          (null != n && n.context ? String(n.context) : "standalone") &&
        t.formattingValues
      ) {
        var i = t.defaultFormattingWidth || t.defaultWidth,
          r = null != n && n.width ? String(n.width) : i;
        a = t.formattingValues[r] || t.formattingValues[i];
      } else {
        var o = t.defaultWidth,
          s = null != n && n.width ? String(n.width) : t.defaultWidth;
        a = t.values[s] || t.values[o];
      }
      return a[t.argumentCallback ? t.argumentCallback(e) : e];
    };
  }
  function I(t) {
    return function (e) {
      var n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        a = n.width,
        i = (a && t.matchPatterns[a]) || t.matchPatterns[t.defaultMatchWidth],
        r = e.match(i);
      if (!r) return null;
      var o,
        s = r[0],
        d = (a && t.parsePatterns[a]) || t.parsePatterns[t.defaultParseWidth],
        l = Array.isArray(d)
          ? (function (t, e) {
              for (var n = 0; n < t.length; n++) if (t[n].test(s)) return n;
            })(d)
          : (function (t, e) {
              for (var n in t)
                if (t.hasOwnProperty(n) && t[n].test(s)) return n;
            })(d);
      return (
        (o = t.valueCallback ? t.valueCallback(l) : l),
        {
          value: (o = n.valueCallback ? n.valueCallback(o) : o),
          rest: e.slice(s.length),
        }
      );
    };
  }
  const O = {
    code: "en-US",
    formatDistance: function (t, e, n) {
      var a,
        i = q[t];
      return (
        (a =
          "string" == typeof i
            ? i
            : 1 === e
            ? i.one
            : i.other.replace("{{count}}", e.toString())),
        null != n && n.addSuffix
          ? n.comparison && n.comparison > 0
            ? "in " + a
            : a + " ago"
          : a
      );
    },
    formatLong: A,
    formatRelative: function (t, e, n, a) {
      return W[t];
    },
    localize: {
      ordinalNumber: function (t, e) {
        var n = Number(t),
          a = n % 100;
        if (a > 20 || a < 10)
          switch (a % 10) {
            case 1:
              return n + "st";
            case 2:
              return n + "nd";
            case 3:
              return n + "rd";
          }
        return n + "th";
      },
      era: Y({
        values: {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        },
        defaultWidth: "wide",
      }),
      quarter: Y({
        values: {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
        },
        defaultWidth: "wide",
        argumentCallback: function (t) {
          return t - 1;
        },
      }),
      month: Y({
        values: {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        },
        defaultWidth: "wide",
      }),
      day: Y({
        values: {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        defaultWidth: "wide",
      }),
      dayPeriod: Y({
        values: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
        },
        defaultWidth: "wide",
        formattingValues: {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
        },
        defaultFormattingWidth: "wide",
      }),
    },
    match: {
      ordinalNumber:
        ((U = {
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function (t) {
            return parseInt(t, 10);
          },
        }),
        function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = t.match(U.matchPattern);
          if (!n) return null;
          var a = n[0],
            i = t.match(U.parsePattern);
          if (!i) return null;
          var r = U.valueCallback ? U.valueCallback(i[0]) : i[0];
          return {
            value: (r = e.valueCallback ? e.valueCallback(r) : r),
            rest: t.slice(a.length),
          };
        }),
      era: I({
        matchPatterns: {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/^b/i, /^(a|c)/i] },
        defaultParseWidth: "any",
      }),
      quarter: I({
        matchPatterns: {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
        defaultParseWidth: "any",
        valueCallback: function (t) {
          return t + 1;
        },
      }),
      month: I({
        matchPatterns: {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        },
        defaultParseWidth: "any",
      }),
      day: I({
        matchPatterns: {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        },
        defaultMatchWidth: "wide",
        parsePatterns: {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        },
        defaultParseWidth: "any",
      }),
      dayPeriod: I({
        matchPatterns: {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
        },
        defaultMatchWidth: "any",
        parsePatterns: {
          any: {
            am: /^a/i,
            pm: /^p/i,
            midnight: /^mi/i,
            noon: /^no/i,
            morning: /morning/i,
            afternoon: /afternoon/i,
            evening: /evening/i,
            night: /night/i,
          },
        },
        defaultParseWidth: "any",
      }),
    },
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  };
  var F = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    H = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    z = /^'([^]*?)'?$/,
    B = /''/g,
    Q = /[a-zA-Z]/;
  function G(i, r, o) {
    var d, l, c, u, m, h, f, g, p, v, w, b, y, k, L, C, T, j;
    e(2, arguments);
    var q = String(r),
      E = s(),
      U =
        null !==
          (d =
            null !== (l = null == o ? void 0 : o.locale) && void 0 !== l
              ? l
              : E.locale) && void 0 !== d
          ? d
          : O,
      A = a(
        null !==
          (c =
            null !==
              (u =
                null !==
                  (m =
                    null !==
                      (h = null == o ? void 0 : o.firstWeekContainsDate) &&
                    void 0 !== h
                      ? h
                      : null == o ||
                        null === (f = o.locale) ||
                        void 0 === f ||
                        null === (g = f.options) ||
                        void 0 === g
                      ? void 0
                      : g.firstWeekContainsDate) && void 0 !== m
                  ? m
                  : E.firstWeekContainsDate) && void 0 !== u
              ? u
              : null === (p = E.locale) ||
                void 0 === p ||
                null === (v = p.options) ||
                void 0 === v
              ? void 0
              : v.firstWeekContainsDate) && void 0 !== c
          ? c
          : 1,
      );
    if (!(A >= 1 && A <= 7))
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively",
      );
    var W = a(
      null !==
        (w =
          null !==
            (b =
              null !==
                (y =
                  null !== (k = null == o ? void 0 : o.weekStartsOn) &&
                  void 0 !== k
                    ? k
                    : null == o ||
                      null === (L = o.locale) ||
                      void 0 === L ||
                      null === (C = L.options) ||
                      void 0 === C
                    ? void 0
                    : C.weekStartsOn) && void 0 !== y
                ? y
                : E.weekStartsOn) && void 0 !== b
            ? b
            : null === (T = E.locale) ||
              void 0 === T ||
              null === (j = T.options) ||
              void 0 === j
            ? void 0
            : j.weekStartsOn) && void 0 !== w
        ? w
        : 0,
    );
    if (!(W >= 0 && W <= 6))
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (!U.localize)
      throw new RangeError("locale must contain localize property");
    if (!U.formatLong)
      throw new RangeError("locale must contain formatLong property");
    var Y = n(i);
    if (
      !(function (a) {
        if (
          (e(1, arguments),
          !(function (n) {
            return (
              e(1, arguments),
              n instanceof Date ||
                ("object" === t(n) &&
                  "[object Date]" === Object.prototype.toString.call(n))
            );
          })(a) && "number" != typeof a)
        )
          return !1;
        var i = n(a);
        return !isNaN(Number(i));
      })(Y)
    )
      throw new RangeError("Invalid time value");
    var I = (function (t, i) {
        return (
          e(2, arguments),
          (function (t, i) {
            e(2, arguments);
            var r = n(t).getTime(),
              o = a(i);
            return new Date(r + o);
          })(t, -a(i))
        );
      })(Y, S(Y)),
      G = {
        firstWeekContainsDate: A,
        weekStartsOn: W,
        locale: U,
        _originalDate: Y,
      };
    return q
      .match(H)
      .map(function (t) {
        var e = t[0];
        return "p" === e || "P" === e ? (0, M[e])(t, U.formatLong) : t;
      })
      .join("")
      .match(F)
      .map(function (t) {
        if ("''" === t) return "'";
        var e,
          n,
          a = t[0];
        if ("'" === a) return (n = (e = t).match(z)) ? n[1].replace(B, "'") : e;
        var s,
          d = x[a];
        if (d)
          return (
            (null != o && o.useAdditionalWeekYearTokens) ||
              ((s = t), -1 === P.indexOf(s)) ||
              N(t, r, String(i)),
            (null != o && o.useAdditionalDayOfYearTokens) ||
              !(function (t) {
                return -1 !== D.indexOf(t);
              })(t) ||
              N(t, r, String(i)),
            d(I, t, U.localize, G)
          );
        if (a.match(Q))
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" +
              a +
              "`",
          );
        return t;
      })
      .join("");
  }
  Math.pow(10, 8);
  var R = 36e5;
  function X(t, n) {
    var i;
    e(1, arguments);
    var r = a(
      null !== (i = null == n ? void 0 : n.additionalDigits) && void 0 !== i
        ? i
        : 2,
    );
    if (2 !== r && 1 !== r && 0 !== r)
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    if (
      "string" != typeof t &&
      "[object String]" !== Object.prototype.toString.call(t)
    )
      return new Date(NaN);
    var o,
      s = (function (t) {
        var e,
          n = {},
          a = t.split(J.dateTimeDelimiter);
        if (a.length > 2) return n;
        if (
          (/:/.test(a[0])
            ? (e = a[0])
            : ((n.date = a[0]),
              (e = a[1]),
              J.timeZoneDelimiter.test(n.date) &&
                ((n.date = t.split(J.timeZoneDelimiter)[0]),
                (e = t.substr(n.date.length, t.length)))),
          e)
        ) {
          var i = J.timezone.exec(e);
          i
            ? ((n.time = e.replace(i[1], "")), (n.timezone = i[1]))
            : (n.time = e);
        }
        return n;
      })(t);
    if (s.date) {
      var d = (function (t, e) {
        var n = new RegExp(
            "^(?:(\\d{4}|[+-]\\d{" +
              (4 + e) +
              "})|(\\d{2}|[+-]\\d{" +
              (2 + e) +
              "})$)",
          ),
          a = t.match(n);
        if (!a) return { year: NaN, restDateString: "" };
        var i = a[1] ? parseInt(a[1]) : null,
          r = a[2] ? parseInt(a[2]) : null;
        return {
          year: null === r ? i : 100 * r,
          restDateString: t.slice((a[1] || a[2]).length),
        };
      })(s.date, r);
      o = (function (t, e) {
        if (null === e) return new Date(NaN);
        var n = t.match($);
        if (!n) return new Date(NaN);
        var a = !!n[4],
          i = V(n[1]),
          r = V(n[2]) - 1,
          o = V(n[3]),
          s = V(n[4]),
          d = V(n[5]) - 1;
        if (a)
          return (function (t, e, n) {
            return e >= 1 && e <= 53 && n >= 0 && n <= 6;
          })(0, s, d)
            ? (function (t, e, n) {
                var a = new Date(0);
                a.setUTCFullYear(t, 0, 4);
                var i = 7 * (e - 1) + n + 1 - (a.getUTCDay() || 7);
                return a.setUTCDate(a.getUTCDate() + i), a;
              })(e, s, d)
            : new Date(NaN);
        var l = new Date(0);
        return (function (t, e, n) {
          return (
            e >= 0 && e <= 11 && n >= 1 && n <= (tt[e] || (et(t) ? 29 : 28))
          );
        })(e, r, o) &&
          (function (t, e) {
            return e >= 1 && e <= (et(t) ? 366 : 365);
          })(e, i)
          ? (l.setUTCFullYear(e, r, Math.max(i, o)), l)
          : new Date(NaN);
      })(d.restDateString, d.year);
    }
    if (!o || isNaN(o.getTime())) return new Date(NaN);
    var l,
      c = o.getTime(),
      u = 0;
    if (
      s.time &&
      ((u = (function (t) {
        var e = t.match(Z);
        if (!e) return NaN;
        var n = K(e[1]),
          a = K(e[2]),
          i = K(e[3]);
        return (function (t, e, n) {
          return 24 === t
            ? 0 === e && 0 === n
            : n >= 0 && n < 60 && e >= 0 && e < 60 && t >= 0 && t < 25;
        })(n, a, i)
          ? n * R + 6e4 * a + 1e3 * i
          : NaN;
      })(s.time)),
      isNaN(u))
    )
      return new Date(NaN);
    if (!s.timezone) {
      var m = new Date(c + u),
        h = new Date(0);
      return (
        h.setFullYear(m.getUTCFullYear(), m.getUTCMonth(), m.getUTCDate()),
        h.setHours(
          m.getUTCHours(),
          m.getUTCMinutes(),
          m.getUTCSeconds(),
          m.getUTCMilliseconds(),
        ),
        h
      );
    }
    return (
      (l = (function (t) {
        if ("Z" === t) return 0;
        var e = t.match(_);
        if (!e) return 0;
        var n = "+" === e[1] ? -1 : 1,
          a = parseInt(e[2]),
          i = (e[3] && parseInt(e[3])) || 0;
        return (function (t, e) {
          return e >= 0 && e <= 59;
        })(0, i)
          ? n * (a * R + 6e4 * i)
          : NaN;
      })(s.timezone)),
      isNaN(l) ? new Date(NaN) : new Date(c + u + l)
    );
  }
  var J = {
      dateTimeDelimiter: /[T ]/,
      timeZoneDelimiter: /[Z ]/i,
      timezone: /([Z+-].*)$/,
    },
    $ = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
    Z =
      /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
    _ = /^([+-])(\d{2})(?::?(\d{2}))?$/;
  function V(t) {
    return t ? parseInt(t) : 1;
  }
  function K(t) {
    return (t && parseFloat(t.replace(",", "."))) || 0;
  }
  var tt = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function et(t) {
    return t % 400 == 0 || (t % 4 == 0 && t % 100 != 0);
  }
  function nt(t) {
    e(1, arguments);
    var a = n(t);
    return a.setHours(0, 0, 0, 0), a;
  }
  function at(t, e) {
    var n =
      t.getFullYear() - e.getFullYear() ||
      t.getMonth() - e.getMonth() ||
      t.getDate() - e.getDate() ||
      t.getHours() - e.getHours() ||
      t.getMinutes() - e.getMinutes() ||
      t.getSeconds() - e.getSeconds() ||
      t.getMilliseconds() - e.getMilliseconds();
    return n < 0 ? -1 : n > 0 ? 1 : n;
  }
  function it(t, a) {
    e(2, arguments);
    var i = n(t),
      r = n(a),
      o = at(i, r),
      s = Math.abs(
        (function (t, n) {
          e(2, arguments);
          var a = nt(t),
            i = nt(n),
            r = a.getTime() - S(a),
            o = i.getTime() - S(i);
          return Math.round((r - o) / 864e5);
        })(i, r),
      );
    i.setDate(i.getDate() - o * s);
    var d = o * (s - Number(at(i, r) === -o));
    return 0 === d ? 0 : d;
  }
  const rt = (() => {
      let t = [];
      t =
        null === localStorage.getItem("projects")
          ? [
              {
                title: "First Example Project",
                tasks: [
                  {
                    title: "Finish tic-tac-toe project",
                    description:
                      "finish main container positioning and push all commits",
                    date: "2023-08-08",
                    priority: "high",
                    projectIndex: 0,
                    taskIndex: 0,
                    completed: !1,
                  },
                ],
              },
              {
                title: "Second Example Project",
                tasks: [
                  {
                    title: "Cleaning my room",
                    description:
                      "Remove any item that is not belong to the room, and use vacuum cleaner to clean up the carpet",
                    date: "2023-10-23",
                    priority: "low",
                    projectIndex: 1,
                    taskIndex: 0,
                    completed: !0,
                  },
                  {
                    title: "Cleaning the car",
                    description: "",
                    date: "",
                    priority: "medium",
                    projectIndex: 1,
                    taskIndex: 1,
                    completed: !1,
                  },
                ],
              },
            ]
          : JSON.parse(localStorage.getItem("projects"));
      class e {
        constructor(t) {
          (this.title = t), (this.tasks = []);
        }
      }
      return {
        projectsList: t,
        addProject: function (n) {
          const a = new e(n);
          t.push(a), st.showProjects();
        },
        deleteProject: function (e) {
          t.splice(e, 1), st.showProjects();
        },
        editProject: function (e, n, a) {
          (t[e].title = n), st.showProjects(), st.selectLink(a, e, "edit");
        },
      };
    })(),
    ot = (() => {
      class t {
        constructor(t, e, n, a, i, r) {
          (this.title = t),
            (this.description = e),
            (this.date = n),
            (this.priority = a),
            (this.taskIndex = r),
            (this.completed = !1);
        }
      }
      return {
        addTask: function (e, n, a, i, r) {
          const o = new t(e, n, a, i, r);
          rt.projectsList[r].tasks.push(o), st.showTasks();
        },
        deleteTask: function (t, e) {
          rt.projectsList[t].tasks.splice(e, 1), st.showTasks("all");
        },
        editTask: function (t, e, n, a, i, r, o) {
          (rt.projectsList[i].tasks[r].title = t),
            (rt.projectsList[i].tasks[r].description = e),
            (rt.projectsList[i].tasks[r].date = n),
            (rt.projectsList[i].tasks[r].priority = a),
            o.classList.contains("menu-element")
              ? st.getTasks(i)
              : st.getTasks("project", i);
        },
        toggleCompletedTask: function (t, e, n) {
          let a;
          !0 === rt.projectsList[e].tasks[n].completed
            ? (rt.projectsList[e].tasks[n].completed = !1)
            : (rt.projectsList[e].tasks[n].completed = !0),
            (a = t.classList.contains("project-element")
              ? "project"
              : t.getAttribute("data-title")),
            st.getTasks(a, e);
        },
      };
    })(),
    st = (() => {
      const t = document.querySelector(".toggle-div"),
        e = document.querySelector(".sidebar"),
        n = document.querySelector(".main"),
        a = document.querySelector(".main-title-text"),
        i = document.querySelector(".main-title-icon"),
        r = document.getElementById("add-task"),
        o = document.getElementById("tasks-counter"),
        s = document.querySelector(".tasks-list"),
        d = document.querySelector(".projects-list"),
        l = document.querySelector(".modal"),
        c = document.querySelector(".modal-title"),
        u = document.querySelector(".empty-input-error"),
        m = document.querySelector(".form"),
        h = document.querySelector(".form-title"),
        f = document.querySelector(".form-input"),
        g = document.querySelector(".delete-project-content"),
        p = document.querySelector(".delete-task-content"),
        v = document.querySelector(".modal-task-div"),
        w = document.querySelector(".form-select"),
        b = document.getElementById("task-desc"),
        y = document.getElementById("due-date"),
        k = document.querySelector(".task-info-div");
      function L(t) {
        const e = document
            .querySelectorAll(".icon-link")
            [t].getAttribute("data-icon"),
          n = document.querySelectorAll(".link-text")[t].textContent;
        (a.textContent = n),
          e.split(" ").forEach((t) => {
            t.length > 0 && i.classList.add(t);
          }),
          i.classList.add("main-title-icon"),
          (document.title = `Todo List - ${a.textContent}`);
      }
      function x(t, e) {
        (i.className = ""),
          t.classList.contains("project-element")
            ? (i.classList.add("fa-solid", "fa-list", "main-title-icon"),
              (a.textContent = rt.projectsList[e].title),
              (document.title = `Todo List - ${a.textContent}`))
            : t.classList.contains("menu-element") && L(e);
      }
      function C(t, e, n) {
        const a = G(new Date(), "yyyy-MM-dd");
        let i = 0;
        (o.textContent = 0), (s.textContent = "");
        for (let r = e; r < n; r++)
          for (let e = 0; e < rt.projectsList[r].tasks.length; e++) {
            const n = document.createElement("div"),
              d = document.createElement("div"),
              l = document.createElement("div"),
              c = document.createElement("i"),
              u = document.createElement("p"),
              m = document.createElement("p"),
              h = document.createElement("i"),
              f = document.createElement("i"),
              g = document.createElement("i");
            if (
              ("important" !== t ||
                "high" === rt.projectsList[r].tasks[e].priority) &&
              !(
                ("today" === t && rt.projectsList[r].tasks[e].date !== a) ||
                ("completed" === t &&
                  !1 === rt.projectsList[r].tasks[e].completed)
              )
            ) {
              if ("week" === t) {
                const t = X(rt.projectsList[r].tasks[e].date),
                  n = X(a);
                if (!(it(t, n) <= 7 && it(t, n) >= 0)) continue;
              }
              i++,
                (o.textContent = i),
                n.classList.add("task-div", "flex", "pointer", "task-element"),
                d.classList.add("task-left-side", "flex", "task-element"),
                u.classList.add("task-title", "task-element"),
                !0 !== rt.projectsList[r].tasks[e].completed
                  ? c.classList.add("fa-regular", "fa-circle", "task-element")
                  : (c.classList.add(
                      "fa-regular",
                      "fa-circle-check",
                      "task-element",
                    ),
                    u.classList.add("completed")),
                l.classList.add("task-right-side", "flex"),
                m.classList.add("task-due-date"),
                h.classList.add("fa-regular", "fa-pen-to-square", "task-icon"),
                f.classList.add("fa-regular", "fa-trash-can", "task-icon"),
                g.classList.add("fa-solid", "fa-circle-info", "task-icon"),
                "high" === rt.projectsList[r].tasks[e].priority
                  ? c.classList.add("high-priority")
                  : "medium" === rt.projectsList[r].tasks[e].priority
                  ? c.classList.add("medium-priority")
                  : "low" === rt.projectsList[r].tasks[e].priority &&
                    c.classList.add("low-priority"),
                (u.textContent = rt.projectsList[r].tasks[e].title),
                void 0 !== rt.projectsList[r].tasks[e].date
                  ? (m.textContent = rt.projectsList[r].tasks[e].date)
                  : (m.textContent = ""),
                n.setAttribute("data-project-index", r),
                n.setAttribute("data-task-index", e),
                u.setAttribute("data-project-index", r),
                u.setAttribute("data-task-index", e),
                h.setAttribute("data-project-index", r),
                h.setAttribute("data-task-index", e),
                f.setAttribute("data-project-index", r),
                f.setAttribute("data-task-index", e),
                g.setAttribute("data-project-index", r),
                g.setAttribute("data-task-index", e),
                c.setAttribute("data-project-index", r),
                c.setAttribute("data-task-index", e),
                d.appendChild(c),
                d.appendChild(u),
                l.appendChild(m),
                l.appendChild(h),
                l.appendChild(f),
                l.appendChild(g),
                n.appendChild(d),
                n.appendChild(l),
                s.appendChild(n),
                !1 === rt.projectsList[r].tasks[e].completed
                  ? (u.classList.remove("completed"),
                    c.classList.remove("fa-circle-check"),
                    c.classList.add("fa-circle"))
                  : (u.classList.add("completed"),
                    c.classList.remove("fa-circle"),
                    c.classList.add("fa-circle-check"));
            }
          }
        j("close");
      }
      function T(t, e) {
        let n, a;
        localStorage.setItem("projects", JSON.stringify(rt.projectsList)),
          "project" === t
            ? ((n = e),
              (a = parseInt(e) + 1),
              0 === rt.projectsList[e].tasks.length && (o.textContent = 0))
            : ((n = 0), (a = rt.projectsList.length)),
          C(t, n, a);
      }
      function j(t, e, n, a, i) {
        const r = document.querySelector(".modal-header"),
          o = document.querySelector(".cancel-btn"),
          s = document.querySelector(".confirm-btn"),
          d = document.querySelector(".strong-project-title"),
          L = document.querySelector(".strong-task-title");
        if (
          ((s.className = "confirm-btn"),
          (r.className = "modal-header"),
          (o.className = "cancel-btn"),
          s.classList.add("hide"),
          m.reset(),
          m.classList.add("hide"),
          u.classList.add("hide"),
          g.classList.add("hide"),
          p.classList.add("hide"),
          v.classList.add("hide"),
          k.classList.add("hide"),
          "show" === t)
        )
          if ((l.classList.remove("hide"), "add" === n))
            m.classList.remove("hide"),
              r.classList.add("mixed-teal"),
              s.classList.remove("hide"),
              (s.textContent = "Add"),
              s.classList.add("add-btn", "pointer"),
              o.classList.add("cancel-add", "pointer"),
              (c.textContent = e),
              "Add Task" === e && v.classList.remove("hide");
          else if ("delete" === n)
            r.classList.add("mixed-red"),
              s.classList.remove("hide"),
              (s.textContent = "Delete"),
              s.classList.add("delete-btn", "pointer"),
              o.classList.add("cancel-delete", "pointer"),
              (c.textContent = e),
              "Delete Project" === e
                ? (g.classList.remove("hide"),
                  (d.textContent = rt.projectsList[a].title))
                : (p.classList.remove("hide"),
                  (L.textContent = rt.projectsList[a].tasks[i].title));
          else if ("edit" === n)
            if (
              (m.classList.remove("hide"),
              r.classList.add("mixed-teal"),
              (s.textContent = "Edit"),
              s.classList.add("add-btn", "pointer"),
              o.classList.add("cancel-add", "pointer"),
              (c.textContent = e),
              "Edit Task" === e)
            )
              v.classList.remove("hide"),
                (h.value = rt.projectsList[a].tasks[i].title),
                (b.value = rt.projectsList[a].tasks[i].description),
                (y.value = rt.projectsList[a].tasks[i].date),
                (w.value = rt.projectsList[a].tasks[i].priority);
            else {
              const t = document.querySelector(".selected-link");
              (a = parseInt(t.getAttribute("data-link-index"), 10)),
                (f.value = rt.projectsList[a].title);
            }
          else
            "info" === n &&
              (k.classList.remove("hide"),
              (c.textContent = e),
              o.classList.add("cancel-add", "pointer"),
              r.classList.add("mixed-teal"),
              (function (t, e) {
                const n = document.querySelector(".info-title-text"),
                  a = document.querySelector(".info-desc-text"),
                  i = document.querySelector(".info-date-text"),
                  r = document.querySelector(".info-priority-text"),
                  o = document.querySelector(".info-project-text");
                (n.textContent = rt.projectsList[t].tasks[e].title),
                  (a.textContent = rt.projectsList[t].tasks[e].description),
                  (i.textContent = rt.projectsList[t].tasks[e].date),
                  "low" === rt.projectsList[t].tasks[e].priority
                    ? (r.textContent = "Low Priority")
                    : "medium" === rt.projectsList[t].tasks[e].priority
                    ? (r.textContent = "Medium Priority")
                    : "high" === rt.projectsList[t].tasks[e].priority
                    ? (r.textContent = "High Priority")
                    : (r.textContent = ""),
                  (o.textContent = rt.projectsList[t].title);
              })(a, i));
        else "close" === t && l.classList.add("hide");
      }
      function M(t, e, n) {
        const a = document.querySelectorAll(".link"),
          i = t.getAttribute("data-title"),
          o = document.querySelectorAll(".project-link");
        r.classList.add("hide"),
          a.forEach((t) => {
            t.classList.remove("selected-link");
          }),
          t.classList.contains("link")
            ? (t.classList.add("selected-link"),
              "edit" === n && o[e].classList.add("selected-link"))
            : t.classList.contains("project-element")
            ? (r.classList.remove("hide"),
              t.classList.contains("left-project-div") ||
              t.classList.contains("project-link-icons")
                ? t.parentElement.classList.add("selected-link")
                : (t.classList.contains("fa-list") ||
                    t.classList.contains("fa-trash-can") ||
                    t.classList.contains("fa-pen-to-square") ||
                    t.classList.contains("project-link-title")) &&
                  t.parentElement.parentElement.classList.add("selected-link"))
            : t.classList.contains("menu-element") &&
              (t.classList.contains("menu-icon") ||
                t.classList.contains("link-text")) &&
              t.parentElement.classList.add("selected-link"),
          t.classList.contains("project-element")
            ? (r.classList.remove("hide"), T("project", e))
            : T(i);
      }
      return {
        showProjects: function () {
          const t = document.getElementById("projects-counter");
          (document.querySelector(".projects-list").textContent = ""),
            (t.textContent = rt.projectsList.length),
            localStorage.setItem("projects", JSON.stringify(rt.projectsList));
          for (let t = 0; t < rt.projectsList.length; t++) {
            const e = document.querySelector(".projects-list"),
              n = document.createElement("div"),
              a = document.createElement("p"),
              i = document.createElement("div"),
              r = document.createElement("div"),
              o = document.createElement("i"),
              s = document.createElement("i"),
              d = document.createElement("i");
            n.classList.add(
              "link",
              "project-link",
              "flex",
              "pointer",
              "project-element",
              "select",
            ),
              n.setAttribute("href", "#"),
              n.setAttribute("data-link-index", t),
              e.appendChild(n),
              o.classList.add(
                "fa-solid",
                "fa-list",
                "project-element",
                "select",
                "icon-link",
              ),
              o.setAttribute("data-link-index", t),
              r.appendChild(o),
              r.setAttribute("data-link-index", t),
              a.classList.add(
                "project-link-title",
                "project-element",
                "select",
              ),
              a.setAttribute("data-link-index", t),
              (a.textContent = rt.projectsList[t].title),
              r.appendChild(a),
              r.classList.add("left-project-div", "project-element", "select"),
              n.appendChild(r),
              i.classList.add(
                "project-link-icons",
                "flex",
                "project-element",
                "select",
              ),
              i.setAttribute("data-link-index", t),
              n.appendChild(i),
              s.classList.add(
                "fa-regular",
                "fa-pen-to-square",
                "project-element",
                "project-btn",
                "select",
                "icon-link",
              ),
              s.setAttribute("data-link-index", t),
              i.appendChild(s),
              d.classList.add(
                "fa-regular",
                "fa-trash-can",
                "project-element",
                "project-btn",
                "select",
                "icon-link",
              ),
              d.setAttribute("data-link-index", t),
              i.appendChild(d);
          }
        },
        showMainTitle: L,
        handleModal: j,
        showTasks: C,
        selectLink: M,
        changeMainTitle: x,
        getTasks: T,
        validateModal: function (t, e, n, a) {
          const i = document.querySelector(".link:first-child");
          let o, s, l, c;
          if (
            (a.classList.contains("menu-element") &&
              (c = a.getAttribute("data-title")),
            m.classList.contains("hide") || "" !== h.value)
          )
            if ("" !== h.value && "add" === t)
              if (v.classList.contains("hide")) {
                rt.addProject(h.value);
                const t = d.lastChild,
                  e = d.lastChild.getAttribute("data-link-index");
                M(t, e), x(t, e);
              } else
                (l =
                  "low" === w.value
                    ? "low"
                    : "medium" === w.value
                    ? "medium"
                    : "high" === w.value
                    ? "high"
                    : ""),
                  (s = "" === b.value ? "" : b.value),
                  (o = "" === y.value ? "" : y.value),
                  ot.addTask(h.value, s, o, l, e);
            else
              "delete" === t
                ? g.classList.contains("hide")
                  ? (ot.deleteTask(e, n), T(c, e))
                  : (rt.deleteProject(e), r.classList.add("hide"), M(i, e))
                : "edit" === t &&
                  ("" === n
                    ? (rt.editProject(e, h.value, a), x(a, e))
                    : ((l =
                        "low" === w.value
                          ? "low"
                          : "medium" === w.value
                          ? "medium"
                          : "high" === w.value
                          ? "high"
                          : ""),
                      (s = "" === b.value ? "" : b.value),
                      (o = "" === y.value ? "" : y.value),
                      ot.editTask(h.value, s, o, l, e, n, a)));
          else u.classList.remove("hide");
        },
        toggleMenu: function () {
          const t = document.getElementById("toggleButton");
          e.classList.contains("hide-sidebar")
            ? (e.classList.remove("hide-sidebar"),
              e.classList.add("show-sidebar"),
              n.classList.add("contract-main"),
              n.classList.remove("expand-main"),
              n.classList.add("inactive-main"),
              (t.className = "pointer fa-solid fa-xmark"))
            : e.classList.contains("show-sidebar") &&
              (e.classList.add("hide-sidebar"),
              e.classList.remove("show-sidebar"),
              n.classList.add("expand-main"),
              n.classList.remove("contract-main"),
              n.classList.remove("inactive-main"),
              (t.className = "pointer fa-solid fa-bars"));
        },
        responsiveMenu: function () {
          window.innerWidth <= 1e3
            ? (t.classList.remove("hide"),
              e.classList.remove("show-sidebar"),
              e.classList.add("hide-sidebar"),
              n.classList.remove("contract-main"),
              n.classList.add("expand-main"))
            : (t.classList.add("hide"),
              e.classList.remove("hide-sidebar"),
              e.classList.add("show-sidebar"),
              n.classList.add("contract-main"),
              n.classList.remove("expand-main"),
              n.classList.remove("inactive-main"));
        },
      };
    })(),
    dt = function () {
      let t, e;
      document.addEventListener("click", (n) => {
        const { target: a } = n,
          i = document.querySelector(".selected-link"),
          r = document.querySelector(".delete-project-content"),
          o = document.querySelector(".modal-task-div"),
          s = parseInt(a.getAttribute("data-link-index"), 10);
        (a.classList.contains("toggle-div") ||
          "toggleButton" === a.getAttribute("id")) &&
          st.toggleMenu(),
          a.classList.contains("select") &&
            (st.selectLink(a, s), st.changeMainTitle(a, s)),
          a.classList.contains("add-project-icon")
            ? st.handleModal("show", "Add Project", "add")
            : a.classList.contains("project-btn") &&
              ((t = parseInt(a.getAttribute("data-link-index"), 10)),
              a.classList.contains("fa-pen-to-square")
                ? st.handleModal("show", "Edit Project", "edit", t)
                : a.classList.contains("fa-trash-can") &&
                  st.handleModal("show", "Delete Project", "delete", t)),
          a.classList.contains("add-task-icon") &&
            ((t = parseInt(a.getAttribute("data-project-index"), 10)),
            (e = parseInt(a.getAttribute("data-task-index"), 10)),
            st.handleModal("show", "Add Task", "add", t, e)),
          a.classList.contains("task-icon") &&
            ((t = parseInt(a.getAttribute("data-project-index"), 10)),
            (e = parseInt(a.getAttribute("data-task-index"), 10)),
            a.classList.contains("fa-pen-to-square")
              ? st.handleModal("show", "Edit Task", "edit", t, e)
              : a.classList.contains("fa-trash-can")
              ? st.handleModal("show", "Delete Task", "delete", t, e)
              : a.classList.contains("fa-circle-info") &&
                st.handleModal("show", "Task Info", "info", t, e)),
          (a.classList.contains("cancel-btn") ||
            a.classList.contains("fa-xmark")) &&
            st.handleModal("close"),
          a.classList.contains("task-element") &&
            ((t = parseInt(a.getAttribute("data-project-index"))),
            (e = parseInt(a.getAttribute("data-task-index"))),
            ot.toggleCompletedTask(i, t, e)),
          a.classList.contains("confirm-btn") &&
            ("Add" === a.textContent
              ? ((t = parseInt(i.getAttribute("data-link-index"), 10)),
                st.validateModal("add", t, "", i),
                st.getTasks("project", t))
              : "Delete" === a.textContent
              ? r.classList.contains("hide")
                ? st.validateModal("delete", t, e, i)
                : ((t = parseInt(i.getAttribute("data-link-index"), 10)),
                  st.validateModal("delete", t, "", i),
                  st.showMainTitle(0),
                  st.getTasks("all"))
              : "Edit" === a.textContent &&
                (o.classList.contains("hide")
                  ? ((t = parseInt(i.getAttribute("data-link-index"), 10)),
                    st.validateModal("edit", t, "", i))
                  : st.validateModal("edit", t, e, i)));
      });
    },
    lt = function () {
      window.addEventListener("resize", st.responsiveMenu);
    };
  st.showProjects(),
    st.showMainTitle(0),
    st.getTasks("all"),
    lt(),
    st.responsiveMenu(),
    dt();
})();
//# sourceMappingURL=main.js.map
