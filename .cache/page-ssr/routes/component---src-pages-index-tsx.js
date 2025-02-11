"use strict";
exports.id = 691;
exports.ids = [691];
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

/***/ 37200:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57076);
/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18882);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51669);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29009);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4174);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(28498);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(43815);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(65657);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(23872);






const detailOptions = [{
  value: "Fuel",
  label: "Combustible"
}, {
  value: "Tolls",
  label: "Peajes y TAG"
}, {
  value: "PublicTransport",
  label: "Transporte público"
}, {
  value: "Parking",
  label: "Estacionamientos"
}, {
  value: "VehicleMaintenance",
  label: "Mantenimiento vehicular"
}, {
  value: "CarInsurance",
  label: "Seguro automotriz"
}, {
  value: "RideSharing",
  label: "Taxi/Uber/Didi/Cabify"
}, {
  value: "Supermarket",
  label: "Supermercado"
}, {
  value: "Greengrocer",
  label: "Verdulería"
}, {
  value: "Butcher",
  label: "Carnicería"
}, {
  value: "Bakery",
  label: "Panadería"
}, {
  value: "FastFood",
  label: "Comida rápida"
}, {
  value: "Restaurant",
  label: "Restaurante"
}, {
  value: "Delivery",
  label: "Delivery"
}, {
  value: "Rent",
  label: "Arriendo/Dividendo"
}, {
  value: "Water",
  label: "Agua"
}, {
  value: "Electricity",
  label: "Luz"
}, {
  value: "Gas",
  label: "Gas"
}, {
  value: "Internet",
  label: "Internet"
}, {
  value: "MobilePhone",
  label: "Teléfono móvil"
}, {
  value: "CommonExpenses",
  label: "Gastos comunes"
}, {
  value: "HomeInsurance",
  label: "Seguro hogar"
}, {
  value: "HealthInsurance",
  label: "Isapre/Fonasa"
}, {
  value: "MedicalConsultation",
  label: "Consulta médica"
}, {
  value: "MedicalTests",
  label: "Exámenes médicos"
}, {
  value: "Medicines",
  label: "Medicamentos"
}, {
  value: "Dental",
  label: "Dentista"
}, {
  value: "Optical",
  label: "Óptica/Lentes"
}, {
  value: "AlcoholTobacco",
  label: "Alcohol y tabaco"
}, {
  value: "Entertainment",
  label: "Salidas"
}, {
  value: "CinemaTheater",
  label: "Cine/Teatro/Eventos"
}, {
  value: "Subscriptions",
  label: "Suscripciones"
}, {
  value: "Travel",
  label: "Viajes"
}, {
  value: "SportsGym",
  label: "Deportes y gimnasio"
}, {
  value: "Games",
  label: "Juegos"
}, {
  value: "Other",
  label: "Otro"
}];
const getDefaultMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
};
const formatNumber = value => {
  const numberValue = typeof value === "number" ? value : Number(value.replace(/\D/g, ""));
  return numberValue.toLocaleString("es-CL");
};
const getDetailLabel = value => {
  const option = detailOptions.find(opt => opt.value === value);
  return option ? option.label : value;
};
const CustomTooltip = ({
  active,
  payload
}) => {
  if (active && payload && payload.length) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "custom-tooltip"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "label"
    }, `${payload[0].name}: ${new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP"
    }).format(payload[0].payload.total)}`));
  }
  return null;
};
const IndexPage = () => {
  const {
    0: user,
    1: setUser
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    0: expenses,
    1: setExpenses
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    0: selectedCard,
    1: setSelectedCard
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Itau");
  const {
    0: card,
    1: setCard
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Itau");
  const {
    0: totalAmountRaw,
    1: setTotalAmountRaw
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const {
    0: totalAmountInput,
    1: setTotalAmountInput
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    0: installments,
    1: setInstallments
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const {
    0: firstPaymentMonth,
    1: setFirstPaymentMonth
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getDefaultMonth());
  const {
    0: detailOption,
    1: setDetailOption
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    0: customDetail,
    1: setCustomDetail
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const {
    0: chartData,
    1: setChartData
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const unsubscribe = _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I8.onAuthStateChanged(usr => {
      if (usr) {
        setUser(usr);
      } else {
        (0,gatsby__WEBPACK_IMPORTED_MODULE_1__.navigate)("/login");
      }
    });
    return () => unsubscribe();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user) {
      const unsubscribe = _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .firestore */ .RZ.collection("expenses").where("userId", "==", user.uid).onSnapshot(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setExpenses(data);
      });
      return () => unsubscribe();
    }
  }, [user]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const totals = {};
    expenses.forEach(exp => {
      const label = getDetailLabel(exp.detail);
      totals[label] = (totals[label] || 0) + exp.totalAmount;
    });
    const data = Object.keys(totals).map(key => ({
      name: key,
      total: totals[key]
    }));
    setChartData(data);
  }, [expenses]);
  const handleLogout = () => {
    _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .auth */ .I8.signOut().then(() => {
      (0,gatsby__WEBPACK_IMPORTED_MODULE_1__.navigate)("/login");
    });
  };
  const handleTotalAmountChange = e => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = Number(rawValue);
    setTotalAmountRaw(numericValue);
    const formatted = numericValue ? formatNumber(numericValue) : "";
    setTotalAmountInput(formatted);
  };
  const handleAddExpense = async e => {
    e.preventDefault();
    if (!user) return;
    const finalDetail = (detailOption === null || detailOption === void 0 ? void 0 : detailOption.value) === "Other" ? customDetail : detailOption === null || detailOption === void 0 ? void 0 : detailOption.value;
    if (!finalDetail) {
      alert("Seleccione un detalle o ingrese uno si eligió 'Otro'.");
      return;
    }
    if (totalAmountRaw <= 0 || installments < 1) {
      alert("Verifique que el monto y las cuotas sean válidos.");
      return;
    }
    const data = {
      card,
      totalAmount: totalAmountRaw,
      installments,
      firstPaymentMonth,
      detail: finalDetail,
      userId: user.uid
    };
    try {
      await _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .firestore */ .RZ.collection("expenses").add(data);
      setCard("Itau");
      setTotalAmountRaw(0);
      setTotalAmountInput("");
      setInstallments(1);
      setFirstPaymentMonth(getDefaultMonth());
      setDetailOption(null);
      setCustomDetail("");
    } catch (error) {
      console.error(error);
    }
  };
  const getNextBillingDate = () => {
    const today = new Date();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    if (today.getDate() < 24) {
      return `24 de ${monthNames[today.getMonth()]}`;
    } else {
      let nextMonth = today.getMonth() + 1;
      if (nextMonth > 11) {
        nextMonth = 0;
      }
      return `24 de ${monthNames[nextMonth]}`;
    }
  };
  const calculateSummary = () => {
    const filtered = expenses.filter(exp => exp.card === selectedCard);
    const totalCard = filtered.reduce((acc, exp) => acc + exp.totalAmount, 0);
    const summary = {};
    filtered.forEach(exp => {
      const monthlyPayment = exp.totalAmount / exp.installments;
      let [year, month] = exp.firstPaymentMonth.split("-").map(Number);
      for (let i = 0; i < exp.installments; i++) {
        const current = new Date(year, month - 1 + i, 1);
        const key = `${current.getFullYear()}-${(current.getMonth() + 1).toString().padStart(2, "0")}`;
        summary[key] = (summary[key] || 0) + monthlyPayment;
      }
    });
    return {
      summary,
      totalCard
    };
  };
  const {
    summary,
    totalCard
  } = calculateSummary();
  const sortedMonths = Object.keys(summary).sort();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("header", {
    className: "header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "Mis Pagos Mensuales"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: handleLogout
  }, "Cerrar Sesi\xF3n")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "filter-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Selecciona Tarjeta para Resumen:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
    value: selectedCard,
    onChange: e => setSelectedCard(e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Itau"
  }, "Itau"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Banco de Chile"
  }, "Banco de Chile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Tenpo"
  }, "Tenpo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Banco Estado"
  }, "Banco Estado"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "form-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Agregar Gasto"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleAddExpense
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Tarjeta:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
    value: card,
    onChange: e => setCard(e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Itau"
  }, "Itau"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Banco de Chile"
  }, "Banco de Chile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Tenpo"
  }, "Tenpo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
    value: "Banco Estado"
  }, "Banco Estado"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Monto Total (CLP):"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    value: totalAmountInput,
    onChange: handleTotalAmountChange,
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Cuotas:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "number",
    value: installments,
    onChange: e => setInstallments(parseInt(e.target.value)),
    min: "1",
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Mes de la Primera Cuota:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "month",
    value: firstPaymentMonth,
    onChange: e => setFirstPaymentMonth(e.target.value),
    required: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Detalle del Gasto:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP, {
    options: detailOptions,
    value: detailOption,
    onChange: option => setDetailOption(option),
    isSearchable: true,
    placeholder: "Seleccione detalle..."
  }), detailOption && detailOption.value === "Other" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    value: customDetail,
    onChange: e => setCustomDetail(e.target.value),
    placeholder: "Ingrese detalle"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit"
  }, "Agregar Gasto"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "purchases-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Gastos Registrados"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Tarjeta"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Monto Total"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Cuotas"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Mes Primera Cuota"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Detalle"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Acciones"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", null, expenses.filter(exp => exp.card === selectedCard).map(exp => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
    key: exp.id
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, exp.card), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(exp.totalAmount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, exp.installments), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, exp.firstPaymentMonth), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, getDetailLabel(exp.detail)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: async () => {
      await _firebase_config__WEBPACK_IMPORTED_MODULE_2__/* .firestore */ .RZ.collection("expenses").doc(exp.id).delete();
    }
  }, "Eliminar")))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "summary-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Resumen Mensual"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "summary-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "total-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", null, "Total acumulado para ", selectedCard, ": ", new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(totalCard))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "billing-summary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", null, "Pr\xF3xima fecha de facturaci\xF3n: ", getNextBillingDate())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "table-summary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", null, sortedMonths.map(month => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    key: month
  }, month)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", null, sortedMonths.map(month => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
    key: month
  }, new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(summary[month]))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "chart-section"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Gr\xE1fico de gastos"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      width: "100%",
      height: 300
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__/* .ResponsiveContainer */ .h, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__/* .PieChart */ .u, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(recharts__WEBPACK_IMPORTED_MODULE_6__/* .Pie */ .b, {
    data: chartData,
    dataKey: "total",
    nameKey: "name",
    cx: "50%",
    cy: "50%",
    outerRadius: 80
  }, chartData.map((entry, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(recharts__WEBPACK_IMPORTED_MODULE_7__/* .Cell */ .b, {
    key: `cell-${index}`,
    fill: ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#87cefa"][index % 5]
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(recharts__WEBPACK_IMPORTED_MODULE_8__/* .Tooltip */ .u, {
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CustomTooltip, null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(recharts__WEBPACK_IMPORTED_MODULE_9__/* .Legend */ .D, null))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-tsx.js.map