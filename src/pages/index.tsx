// src/pages/IndexPage.tsx
import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { auth, firestore, firebase } from "../firebase/config";
import ReactSelect from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/global.css";

import { ChartSection } from "../components/charSection";

// Tipos e interfaces
interface Expense {
  id: string;
  card: string;
  totalAmount: number;
  installments: number;
  firstPaymentMonth: string; // Formato "YYYY-MM"
  detail: string;
  userId: string;
  registrationDate: string;
}

// Bancos y opciones de detalle
const bankOptions = [
  "Itau",
  "Banco de Chile",
  "Banco Santander Chile",
  "Banco BCI",
  "BancoEstado",
  "Tenpo",
  "MercadoPago",
  "Scotiabank Chile",
  "Banco Security",
  "Banco Falabella",
  "Banco Ripley",
  "Banco BICE"
];

const detailOptions = [
  { value: "Fuel", label: "Combustible" },
  { value: "Supermarket", label: "Supermercado" },
  { value: "MercadoLibre", label: "Mercado Libre" },
  { value: "Butcher", label: "Carnicería" },
  { value: "Entertainment", label: "Carrete" },
  { value: "Water", label: "Agua" },
  { value: "Electricity", label: "Luz" },
  { value: "Gas", label: "Gas" },
  { value: "Internet", label: "Internet" },
  { value: "Tolls", label: "Peajes y troncales" },
  { value: "Restaurant", label: "Restaurante" },
  { value: "PublicTransport", label: "Transporte público" },
  { value: "Parking", label: "Estacionamientos" },
  { value: "VehicleMaintenance", label: "Mantenimiento vehicular" },
  { value: "CarInsurance", label: "Seguro automotriz" },
  { value: "RideSharing", label: "Uber/Didi" },
  { value: "Greengrocer", label: "Verdulería" },
  { value: "Bakery", label: "Panadería" },
  { value: "FastFood", label: "Comida rápida" },
  { value: "Delivery", label: "Delivery" },
  { value: "Rent", label: "Arriendo/Dividendo" },
  { value: "MobilePhone", label: "Teléfono móvil" },
  { value: "CommonExpenses", label: "Gastos comunes" },
  { value: "HomeInsurance", label: "Seguro hogar" },
  { value: "HealthInsurance", label: "Isapre/Fonasa" },
  { value: "MedicalConsultation", label: "Consulta médica" },
  { value: "MedicalTests", label: "Exámenes médicos" },
  { value: "Medicines", label: "Medicamentos" },
  { value: "Dental", label: "Dentista" },
  { value: "Optical", label: "Óptica/Lentes" },
  { value: "AlcoholTobacco", label: "Bebestibles" },
  { value: "CinemaTheater", label: "Cine/Teatro/Eventos" },
  { value: "Subscriptions", label: "Suscripciones" },
  { value: "Travel", label: "Viajes" },
  { value: "SportsGym", label: "Deportes y gimnasio" },
  { value: "Games", label: "Juegos" },
  { value: "Clothing", label: "Ropa" },
  { value: "Gifts", label: "Regalos" },
  { value: "Supplies", label: "Insumos" },
  { value: "Education", label: "Educación" },
  { value: "Hygiene", label: "Higiene" },
  { value: "Beauty", label: "Belleza" },
  { value: "Childcare", label: "Cuidado Infantil" },
  { value: "PetExpenses", label: "Gastos de Mascota" },
  { value: "OfficeSupplies", label: "Suministros de Oficina" },
  { value: "Furniture", label: "Muebles" },
  { value: "CableTV", label: "Cable/TV" },
  { value: "BankingFees", label: "Comisiones Bancarias" },
  { value: "Taxes", label: "Impuestos" },
  { value: "InternetStreaming", label: "Streaming" },
  { value: "Fitness", label: "Fitness" },
  { value: "TravelExpenses", label: "Gastos de Viaje" },
  { value: "MedicalCoPay", label: "Copago Médico" },
  { value: "PersonalCare", label: "Cuidado Personal" },
  { value: "Books", label: "Libros" },
  { value: "Charity", label: "Caridad" },
  { value: "Other", label: "Otro" }
];

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

/**
 * Devuelve un YYYY-MM por defecto para la primera cuota según el día de facturación.
 */
const getDefaultFirstPaymentMonth = (billingDay: number): string => {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // 0-indexed
  if (today.getDate() >= billingDay) {
    month = month + 1;
    if (month > 11) {
      month = 0;
      year++;
    }
  }
  return `${year}-${(month + 1).toString().padStart(2, "0")}`;
};

/**
 * Formatea un número a CLP con separadores.
 */
const formatNumber = (value: number | string): string => {
  const numberValue = typeof value === "number" ? value : Number(value.replace(/\D/g, ""));
  return numberValue.toLocaleString("es-CL");
};

/**
 * Convierte una fecha a formato dd-mm-yyyy (CL).
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Devuelve el label en español para un detalle.
 */
const getDetailLabel = (value: string): string => {
  const option = detailOptions.find((opt) => opt.value === value);
  return option ? option.label : value;
};

/**
 * Calcula el ciclo de facturación. 
 * Si el día de la fecha es mayor que el día de facturación, se asigna al siguiente mes.
 */
const getBillingCycle = (date: Date, billingDay: number): string => {
  const day = date.getDate();
  let cycleDate = new Date(date);
  if (day > billingDay) {
    cycleDate.setMonth(cycleDate.getMonth() + 1);
  }
  const year = cycleDate.getFullYear();
  const month = (cycleDate.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
};

/**
 * Calcula el resumen acumulado repartido por ciclo.
 * Se reparte cada cuota (totalAmount / installments) en su ciclo correspondiente.
 * Luego, se suma el total pendiente (sólo de ciclos no liquidados).
 */
const calculateSummary = (
  expenses: Expense[],
  billingDay: number,
  liquidatedCycles: Record<string, boolean>
) => {
  const summary: { [cycle: string]: number } = {};
  expenses.forEach((exp) => {
    const monthlyPayment = exp.totalAmount / exp.installments;
    const [year, month] = exp.firstPaymentMonth.split("-").map(Number);
    for (let i = 0; i < exp.installments; i++) {
      const dueDate = new Date(year, (month - 1) + i, billingDay);
      const cycle = getBillingCycle(dueDate, billingDay);
      summary[cycle] = (summary[cycle] || 0) + monthlyPayment;
    }
  });
  let outstandingTotal = 0;
  for (const cycle in summary) {
    if (!liquidatedCycles[cycle]) {
      outstandingTotal += summary[cycle];
    }
  }
  return { summary, outstandingTotal };
};

/**
 * Agrupa gastos por categoría y ciclo, recorriendo las cuotas.
 */
const groupExpensesByCategoryAndMonth = (expenses: Expense[], billingDay: number) => {
  const grouped: { [detailLabel: string]: { [cycle: string]: number } } = {};

  expenses.forEach(exp => {
    const detailLabel = getDetailLabel(exp.detail);
    const [year, month] = exp.firstPaymentMonth.split("-").map(Number);
    for (let i = 0; i < exp.installments; i++) {
      const dueDate = new Date(year, (month - 1) + i, billingDay);
      const cycle = getBillingCycle(dueDate, billingDay);
      if (!grouped[detailLabel]) {
        grouped[detailLabel] = {};
      }
      // Suma la cuota correspondiente (totalAmount / installments)
      grouped[detailLabel][cycle] = (grouped[detailLabel][cycle] || 0) + (exp.totalAmount / exp.installments);
    }
  });
  return grouped;
};

/**
 * Auxiliar para formatear ciclo (YYYY-MM) a "Mes YYYY".
 */
const formatYearMonth = (ym: string): string => {
  const [year, month] = ym.split("-").map(Number);
  return `${monthNames[month - 1]} ${year}`;
};

const IndexPage: React.FC = () => {
  // Estados de usuario y gastos
  const [user, setUser] = useState<firebase.User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCard, setSelectedCard] = useState("Itau");
  const [card, setCard] = useState("Itau");
  const [totalAmountRaw, setTotalAmountRaw] = useState<number>(0);
  const [totalAmountInput, setTotalAmountInput] = useState<string>("");
  const [installments, setInstallments] = useState<number>(1);
  const [firstPaymentMonth, setFirstPaymentMonth] = useState<string>(getDefaultFirstPaymentMonth(27));
  const [detailOption, setDetailOption] = useState<any>(null);
  const [customDetail, setCustomDetail] = useState<string>("");
  const [billingDay, setBillingDay] = useState<number>(27);

  // Estados para ciclos y liquidaciones
  const [liquidatedCycles, setLiquidatedCycles] = useState<Record<string, boolean>>({});
  // Para el filtro de la tabla
  const [selectedCycle, setSelectedCycle] = useState<string>("all");
  // Para liquidar o revertir un ciclo
  const [liquidationCycle, setLiquidationCycle] = useState<string>(getBillingCycle(new Date(), 27));

  // Datos para gráficos y paginación
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedGraphMonth, setSelectedGraphMonth] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  // Modals de configuración y cambio de contraseña
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [passMsg, setPassMsg] = useState<string>("");

  // Datos agrupados por categoría y ciclo
  const [groupedCategoryData, setGroupedCategoryData] = useState<{ [detailLabel: string]: { [cycle: string]: number } }>({});

  // Cargar configuraciones y liquidaciones desde localStorage
  useEffect(() => {
    const storedDefaults = localStorage.getItem("defaultSettings");
    if (storedDefaults) {
      const defaults = JSON.parse(storedDefaults);
      if (defaults.selectedCard) setSelectedCard(defaults.selectedCard);
      if (defaults.card) setCard(defaults.card);
      if (defaults.billingDay) {
        const bd = Number(defaults.billingDay);
        setBillingDay(bd);
        setFirstPaymentMonth(getDefaultFirstPaymentMonth(bd));
      }
    }
    const storedLiquidations = localStorage.getItem("liquidatedCycles");
    if (storedLiquidations) {
      setLiquidatedCycles(JSON.parse(storedLiquidations));
    }
  }, []);

  // Verificar autenticación del usuario
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  // Cargar gastos en tiempo real desde Firestore
  useEffect(() => {
    if (user) {
      const unsubscribe = firestore
        .collection("expenses")
        .where("userId", "==", user.uid)
        .onSnapshot((snapshot) => {
          const data: Expense[] = [];
          snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as Expense);
          });
          setExpenses(data);
        });
      return () => unsubscribe();
    }
  }, [user]);

  // Generar listado de ciclos disponibles recorriendo TODAS las cuotas de cada gasto
  const availableCyclesSet = new Set<string>();
  expenses.filter(exp => exp.card === selectedCard).forEach(exp => {
    const [year, month] = exp.firstPaymentMonth.split("-").map(Number);
    for (let i = 0; i < exp.installments; i++) {
      const dueDate = new Date(year, (month - 1) + i, billingDay);
      const cycle = getBillingCycle(dueDate, billingDay);
      availableCyclesSet.add(cycle);
    }
  });
  const availableCycles = Array.from(availableCyclesSet).sort();

  // ---- AQUI VIENE LA CORRECCIÓN PRINCIPAL PARA EL GRÁFICO ----
  // Filtrar gastos por cuotas para obtener data del gráfico
  useEffect(() => {
    const filteredExpenses = expenses.filter(exp => exp.card === selectedCard);

    const totals: { [category: string]: number } = {};

    filteredExpenses.forEach(exp => {
      const monthlyPayment = exp.totalAmount / exp.installments;
      const [year, month] = exp.firstPaymentMonth.split("-").map(Number);
      const category = getDetailLabel(exp.detail);

      for (let i = 0; i < exp.installments; i++) {
        const dueDate = new Date(year, (month - 1) + i, billingDay);
        const cycle = getBillingCycle(dueDate, billingDay);
        const cycleLabel = formatYearMonth(cycle);

        // Si el usuario selecciona "Todos", sumamos todas las cuotas
        if (selectedGraphMonth === "all") {
          // Sumamos el monthlyPayment por cada cuota => total del gasto
          totals[category] = (totals[category] || 0) + monthlyPayment;
        } else {
          // Si seleccionó un mes específico, solo sumamos la cuota de ese mes
          if (cycleLabel === selectedGraphMonth) {
            totals[category] = (totals[category] || 0) + monthlyPayment;
          }
        }
      }
    });

    // Convertimos totals en array y lo ordenamos de mayor a menor
    const data = Object.keys(totals)
      .map(key => ({ name: key, total: totals[key] }))
      .sort((a, b) => b.total - a.total);

    setChartData(data);
  }, [expenses, selectedCard, selectedGraphMonth, billingDay]);

  // Generar datos agrupados por categoría y ciclo (para la tabla de detalle)
  useEffect(() => {
    const grouped = groupExpensesByCategoryAndMonth(
      expenses.filter(exp => exp.card === selectedCard),
      billingDay
    );
    // Ordenar categorías por total descendente
    const sortedGrouped: { [detailLabel: string]: { [cycle: string]: number } } = {};
    Object.keys(grouped)
      .sort((a, b) => {
        const sumA = Object.values(grouped[a]).reduce((acc, val) => acc + val, 0);
        const sumB = Object.values(grouped[b]).reduce((acc, val) => acc + val, 0);
        return sumB - sumA;
      })
      .forEach(key => {
        sortedGrouped[key] = grouped[key];
      });
    setGroupedCategoryData(sortedGrouped);
  }, [expenses, selectedCard, billingDay]);

  // Filtrar gastos para la tabla de "Gastos Registrados"
  const filteredExpenses = expenses
    .filter(exp => exp.card === selectedCard)
    .filter(exp => {
      if (selectedCycle === "all") return true;
      const [year, month] = exp.firstPaymentMonth.split("-").map(Number);
      for (let i = 0; i < exp.installments; i++) {
        const dueDate = new Date(year, (month - 1) + i, billingDay);
        const cycle = getBillingCycle(dueDate, billingDay);
        if (cycle === selectedCycle) return true;
      }
      return false;
    })
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime());

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  // Calcular resumen acumulado y total pendiente (se descuenta solo ciclos liquidados)
  const { summary, outstandingTotal } = calculateSummary(expenses, billingDay, liquidatedCycles);
  const sortedCycles = Object.keys(summary).sort();

  // Función para liquidar un ciclo seleccionado
  const handleLiquidateCycle = (cycle: string) => {
    if (liquidatedCycles[cycle]) {
      toast.info(`El ciclo ${formatYearMonth(cycle)} ya está liquidado.`);
      return;
    }
    if (window.confirm(`¿Deseas liquidar el ciclo ${formatYearMonth(cycle)}? Esto descontará su monto del total pendiente.`)) {
      const newLiquidations = { ...liquidatedCycles, [cycle]: true };
      setLiquidatedCycles(newLiquidations);
      localStorage.setItem("liquidatedCycles", JSON.stringify(newLiquidations));
      toast.success(`Ciclo ${formatYearMonth(cycle)} liquidado exitosamente.`);
    }
  };

  // Función para revertir la liquidación de un ciclo
  const handleRevertLiquidation = (cycle: string) => {
    if (!liquidatedCycles[cycle]) {
      toast.info(`El ciclo ${formatYearMonth(cycle)} no está liquidado.`);
      return;
    }
    if (window.confirm(`¿Deseas revertir la liquidación del ciclo ${formatYearMonth(cycle)}?`)) {
      const newLiquidations = { ...liquidatedCycles };
      delete newLiquidations[cycle];
      setLiquidatedCycles(newLiquidations);
      localStorage.setItem("liquidatedCycles", JSON.stringify(newLiquidations));
      toast.success(`Liquidación del ciclo ${formatYearMonth(cycle)} revertida.`);
    }
  };

  // Función para limpiar todos los datos (gastos y configuraciones)
  const handleClearData = async () => {
    if (window.confirm("¿Estás seguro de que deseas limpiar TODOS los datos? Esta acción es irreversible.")) {
      try {
        if (user) {
          const snapshot = await firestore.collection("expenses").where("userId", "==", user.uid).get();
          const batch = firestore.batch();
          snapshot.forEach(doc => batch.delete(doc.ref));
          await batch.commit();
        }
        localStorage.removeItem("defaultSettings");
        localStorage.removeItem("liquidatedCycles");
        setExpenses([]);
        setLiquidatedCycles({});
        toast.success("Datos limpiados correctamente.");
      } catch (error) {
        toast.error("Error al limpiar los datos.");
        console.error(error);
      }
    }
  };

  // Cerrar sesión correctamente con async/await
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  // Manejo de inputs para el monto total
  const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = Number(rawValue);
    setTotalAmountRaw(numericValue);
    const formatted = numericValue ? formatNumber(numericValue) : "";
    setTotalAmountInput(formatted);
  };

  // Agregar un nuevo gasto
  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const finalDetail = detailOption?.value === "Other" ? customDetail : detailOption?.value;
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
      userId: user.uid,
      registrationDate: new Date().toISOString(),
    };

    try {
      await firestore.collection("expenses").add(data);
      toast.success("¡Gasto agregado con éxito!");
      // Resetear formulario
      setTotalAmountRaw(0);
      setTotalAmountInput("");
      setInstallments(1);
      setFirstPaymentMonth(getDefaultFirstPaymentMonth(billingDay));
      setDetailOption(null);
      setCustomDetail("");
    } catch (error) {
      toast.error("Ocurrió un error al agregar el gasto.");
      console.error(error);
    }
  };

  // Calcular la próxima fecha de facturación
  const getNextBillingDate = (): string => {
    const today = new Date();
    if (today.getDate() < billingDay) {
      return `${billingDay} de ${monthNames[today.getMonth()]}`;
    } else {
      let nextMonth = today.getMonth() + 1;
      if (nextMonth > 11) nextMonth = 0;
      return `${billingDay} de ${monthNames[nextMonth]}`;
    }
  };

  // Modals de configuración y cambio de contraseña
  const openConfigModal = () => setShowConfigModal(true);
  const closeConfigModal = () => setShowConfigModal(false);
  const handleSaveDefaults = (e: React.FormEvent) => {
    e.preventDefault();
    const defaults = { selectedCard: card, card: card, billingDay };
    localStorage.setItem("defaultSettings", JSON.stringify(defaults));
    setSelectedCard(defaults.selectedCard);
    setCard(defaults.card);
    closeConfigModal();
  };

  const openPasswordModal = () => setShowPasswordModal(true);
  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setNewPassword("");
    setPassMsg("");
  };
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    try {
      await currentUser.updatePassword(newPassword);
      setPassMsg("Contraseña actualizada con éxito.");
      setNewPassword("");
    } catch (err: any) {
      setPassMsg("Error al actualizar la contraseña: " + err.message);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <header className="header">
        <h1>Mis Pagos Mensuales</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={openConfigModal}>Configuración predeterminada</button>
          <button onClick={openPasswordModal}>Cambiar contraseña</button>
          <button onClick={handleLogout}>Cerrar Sesión</button>
          <button onClick={handleClearData} style={{ backgroundColor: "red", color: "white" }}>
            Limpiar los datos
          </button>
        </div>
      </header>

      {/* Modal Configuración */}
      {showConfigModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Configuración Predeterminada</h3>
            <form onSubmit={handleSaveDefaults}>
              <div className="form-group">
                <label>Selecciona Tarjeta para Resumen:</label>
                <select value={card} onChange={(e) => setCard(e.target.value)}>
                  {bankOptions.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Fecha de Facturación (día):</label>
                <select value={billingDay} onChange={(e) => setBillingDay(parseInt(e.target.value))}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={closeConfigModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Cambio de Contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cambiar Contraseña</h3>
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Nueva Contraseña:</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button type="submit">Actualizar</button>
                <button type="button" onClick={closePasswordModal}>Cancelar</button>
              </div>
            </form>
            {passMsg && (
              <p style={{ color: passMsg.includes("éxito") ? "green" : "red" }}>
                {passMsg}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Filtros: Tarjeta y Ciclo para la tabla */}
      <section className="filter-section">
        <label>Selecciona Tarjeta para Resumen:</label>
        <select
          value={selectedCard}
          onChange={(e) => {
            setSelectedCard(e.target.value);
            setCurrentPage(1);
          }}
        >
          {bankOptions.map(bank => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>
        <label style={{ marginLeft: "16px" }}>Selecciona Ciclo de Facturación:</label>
        <select
          value={selectedCycle}
          onChange={(e) => {
            setSelectedCycle(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Todos</option>
          {availableCycles.map(cycle => (
            <option key={cycle} value={cycle}>{formatYearMonth(cycle)}</option>
          ))}
        </select>
      </section>

      {/* Sección para Liquidar/Revertir un ciclo */}
      <section className="liquidation-section" style={{ margin: "16px 0", padding: "8px", border: "1px solid #ccc" }}>
        <label>Liquidar/Revertir ciclo:</label>
        <select
          value={liquidationCycle}
          onChange={(e) => setLiquidationCycle(e.target.value)}
          style={{ margin: "0 8px" }}
        >
          {availableCycles.map(cycle => (
            <option key={cycle} value={cycle}>{formatYearMonth(cycle)}</option>
          ))}
        </select>
        {liquidatedCycles[liquidationCycle] ? (
          <button onClick={() => handleRevertLiquidation(liquidationCycle)}>Revertir liquidación</button>
        ) : (
          <button onClick={() => handleLiquidateCycle(liquidationCycle)}>Liquidar ciclo</button>
        )}
      </section>

      {/* Formulario para Agregar Gasto */}
      <section className="form-section">
        <h2>Agregar Gasto</h2>
        <form onSubmit={handleAddExpense}>
          <div className="form-group">
            <label>Tarjeta:</label>
            <select value={card} onChange={(e) => setCard(e.target.value)}>
              {bankOptions.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Monto Total (CLP):</label>
            <input type="text" value={totalAmountInput} onChange={handleTotalAmountChange} required />
          </div>
          <div className="form-group">
            <label>Cuotas:</label>
            <input type="number" value={installments} onChange={(e) => setInstallments(parseInt(e.target.value))} min="1" required />
          </div>
          <div className="form-group">
            <label>Mes de la Primera Cuota:</label>
            <input type="month" value={firstPaymentMonth} onChange={(e) => setFirstPaymentMonth(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Detalle del Gasto:</label>
            <ReactSelect
              options={detailOptions}
              value={detailOption}
              onChange={(option) => setDetailOption(option)}
              isSearchable
              placeholder="Seleccione detalle..."
            />
            {detailOption && detailOption.value === "Other" && (
              <input
                type="text"
                value={customDetail}
                onChange={(e) => setCustomDetail(e.target.value)}
                placeholder="Ingrese detalle"
              />
            )}
          </div>
          <button className="add-pay" type="submit">Agregar Gasto</button>
        </form>
      </section>

      {/* Sección de Gastos Registrados */}
      <section className="purchases-section">
        <h2>Gastos Registrados {selectedCycle === "all" ? "(Histórico)" : `(Ciclo: ${formatYearMonth(selectedCycle)})`}</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Detalle</th>
                <th>Monto Total</th>
                <th>Cuotas</th>
                <th>Valor cuota</th>
                <th>Mes Primera Cuota</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map(exp => (
                <tr key={exp.id}>
                  <td>{getDetailLabel(exp.detail)}</td>
                  <td>{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(exp.totalAmount)}</td>
                  <td>{exp.installments}</td>
                  <td>
                    {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(exp.totalAmount / exp.installments)}
                  </td>
                  <td>{exp.firstPaymentMonth}</td>
                  <td>{formatDate(exp.registrationDate)}</td>
                  <td>
                    <button onClick={async () => {
                      await firestore.collection("expenses").doc(exp.id).delete();
                    }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredExpenses.length > itemsPerPage && (
            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                Anterior
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sección de Resumen Mensual */}
      <section className="summary-section">
        <h2>Resumen Mensual</h2>
        <div className="summary-container">
          <div className="total-card">
            <h4>
              Total acumulado pendiente para {selectedCard}:{" "}
              {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(outstandingTotal)}
            </h4>
          </div>
          <div className="billing-summary">
            <h4>Próxima fecha de facturación: {getNextBillingDate()}</h4>
          </div>
          <div className="table-summary">
            <table>
              <thead>
                <tr>
                  {sortedCycles.map(cycle => (
                    <th key={cycle}>
                      {formatYearMonth(cycle)} {liquidatedCycles[cycle] ? "(Liquidado)" : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {sortedCycles.map(cycle => (
                    <td key={cycle}>
                      {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(summary[cycle] || 0)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sección de Gráficos */}
      <ChartSection
        data={chartData}
        // Se listan los ciclos disponibles (formateados) para el selector del gráfico
        months={availableCycles.map(c => formatYearMonth(c))}
        selectedMonth={selectedGraphMonth}
        onMonthChange={(m) => {
          setSelectedGraphMonth(m);
          setCurrentPage(1);
        }}
      />

      {/* Tabla de Detalle por Categoría y Ciclo */}
      <section className="category-month-section">
        <h2>Detalle por Categoría y Ciclo</h2>
        <p>Visualiza cuánto has gastado en cada categoría en cada ciclo de facturación.</p>
        <div className="table-scroll">
          <table className="category-month-table">
            <thead>
              <tr>
                <th>Categoría</th>
                {availableCycles.map(cycle => (
                  <th key={cycle}>{formatYearMonth(cycle)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedCategoryData).map(([detailLabel, cyclesObj]) => (
                <tr key={detailLabel}>
                  <td>{detailLabel}</td>
                  {availableCycles.map(cycle => {
                    const amount = cyclesObj[cycle] || 0;
                    return (
                      <td key={cycle}>
                        {amount > 0
                          ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount)
                          : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
