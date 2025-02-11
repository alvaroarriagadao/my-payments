"use strict";
exports.id = 47;
exports.ids = [47];
exports.modules = {

/***/ 18882:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I8: () => (/* binding */ auth),
/* harmony export */   RZ: () => (/* binding */ firestore),
/* harmony export */   wC: () => (/* reexport safe */ firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__.Z)
/* harmony export */ });
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(75159);
/* harmony import */ var firebase_compat_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34602);
/* harmony import */ var firebase_compat_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90523);
const firebaseConfig={apiKey:"AIzaSyCcHPzYuLv_BjFgp-6pE7VnItDl_LNnmbk",authDomain:"mispagoscloud.firebaseapp.com",projectId:"mispagoscloud",storageBucket:"mispagoscloud.firebasestorage.app",messagingSenderId:"118418899592",appId:"1:118418899592:web:4c1f9737dfa24159b5553d",measurementId:"G-Q6F0NKSZHP"};if(!firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.apps.length){firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.initializeApp(firebaseConfig);}const auth=firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.auth();const firestore=firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.firestore();

/***/ }),

/***/ 32493:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57076);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18882);




const LoginPage = () => {
  const {
    0: email,
    1: setEmail
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    0: password,
    1: setPassword
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    0: remember,
    1: setRemember
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: error,
    1: setError
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const handleSubmit = async e => {
    e.preventDefault();
    await _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I8.setPersistence(remember ? _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .firebase */ .wC.auth.Auth.Persistence.LOCAL : _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .firebase */ .wC.auth.Auth.Persistence.SESSION);
    _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I8.signInWithEmailAndPassword(email, password).then(() => (0,gatsby__WEBPACK_IMPORTED_MODULE_1__.navigate)("/")).catch(err => {
      setError("Correo o contraseña incorrectos.");
      console.error(err);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "login-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Iniciar Sesi\xF3n"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Correo Electr\xF3nico:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Contrase\xF1a:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group checkbox-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "checkbox",
    checked: remember,
    onChange: e => setRemember(e.target.checked),
    id: "remember"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "remember"
  }, "Recu\xE9rdame")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit"
  }, "Iniciar Sesi\xF3n")), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      color: "red"
    }
  }, error));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginPage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-login-tsx.js.map