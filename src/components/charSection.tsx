import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LabelProps,
} from "recharts";

// Formateo a CLP
const currencyFormatter = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value);

// Arreglo de colores para las barras
const colorArray = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#87cefa",
  "#27cefa",
  "#412efa",
  "#872efa",
  "#ffc0cb",
  "#d0ed57",
  "#a4de6c",
  "#d0ed57",
  "#8dd1e1",
];

// Estructura de cada dato para el gráfico
interface ChartData {
  name: string;
  total: number;
}

// Props que recibe el componente
interface ChartSectionProps {
  data: ChartData[];         // Datos ya filtrados por tarjeta y mes
  months: string[];          // Lista de meses únicos para el combo
  selectedMonth: string;     // Mes actualmente seleccionado (o "all")
  onMonthChange: (month: string) => void; // Para actualizar el mes en el padre
}

// Etiqueta personalizada para cada barra
// Si la barra es suficientemente larga, mostramos la etiqueta dentro de la barra (en blanco).
// Si es muy corta, la mostramos afuera (en gris).
const renderCustomBarLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const offset = 5;
  const labelValue = currencyFormatter(value);

  // A modo de ejemplo, calculamos si hay espacio para mostrar el texto dentro:
  // Multiplicamos la longitud del texto por ~7 px por caracter.
  const textWidth = labelValue.length * 7;

  if (width > textWidth + 10) {
    // Etiqueta dentro de la barra (alineada a la derecha, color blanco)
    return (
      <text
        x={x + width - offset}
        y={y + height / 2}
        fill="#fff"
        textAnchor="end"
        dominantBaseline="middle"
        style={{ fontSize: "0.8rem" }}
      >
        {labelValue}
      </text>
    );
  } else {
    // Etiqueta por fuera de la barra (a la derecha, color gris)
    return (
      <text
        x={x + width + offset}
        y={y + height / 2}
        fill="#666"
        textAnchor="start"
        dominantBaseline="middle"
        style={{ fontSize: "0.8rem" }}
      >
        {labelValue}
      </text>
    );
  }
};

export const ChartSection: React.FC<ChartSectionProps> = ({
  data,
  months,
  selectedMonth,
  onMonthChange,
}) => {
  // Toggle para cambiar entre gráfico de barras y gráfico de torta
  const [useBarChart, setUseBarChart] = React.useState(true);

  // Ordenamos los datos de mayor a menor gasto
  const sortedData = [...data].sort((a, b) => b.total - a.total);

  return (
    <section className="chart-section">
      <h2>Gastos por Categoría</h2>
      <div
        className="graph-filter"
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <label htmlFor="monthSelect">Mes:</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
        >
          <option value="all">Todos</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button onClick={() => setUseBarChart(!useBarChart)}>
          {useBarChart ? "Ver Gráfico de Torta" : "Ver Gráfico de Barras"}
        </button>
      </div>

      <div style={{ width: "100%", height: 350, marginTop: 16 }}>
        <ResponsiveContainer>
          {useBarChart ? (
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={(value) => currencyFormatter(value)}
              />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip
                formatter={(value: number) => currencyFormatter(value)}
              />
              <Legend />

              <Bar dataKey="total" label={renderCustomBarLabel}>
                {sortedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colorArray[index % colorArray.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={sortedData}
                dataKey="total"
                nameKey="name"
                outerRadius={100}
                label={(entry) =>
                  `${entry.name}: ${currencyFormatter(entry.total)}`
                }
              >
                {sortedData.map((_, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={colorArray[i % colorArray.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => currencyFormatter(value)}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
};
