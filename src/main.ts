type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precioSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

const redondearDosDecimales = (numero: number): number => {
  return parseFloat(numero.toFixed(2));
};

const obtenerPorcentajeIva = (producto: Producto): number => {
  switch (producto.tipoIva) {
    case "general":
      return 0.21;
    case "reducido":
      return 0.1;
    case "superreducidoA":
      return 0.05;
    case "superreducidoB":
      return 0.04;
    case "superreducidoC":
      return 0;
    case "sinIva":
      return 0;
    default:
      throw new Error("Tipo de IVA no válido");
  }
};

const calcularIvaProducto = (producto: Producto): number => {
  return redondearDosDecimales(
    producto.precio * obtenerPorcentajeIva(producto)
  );
};

const calcularPrecioProductoConIva = (producto: Producto): number => {
  return producto.precio + calcularIvaProducto(producto);
};

const calcularLineaTicket = (linea: LineaTicket): ResultadoLineaTicket => {
  const precioSinIva = linea.producto.precio * linea.cantidad;
  const precioConIva: number =
    calcularPrecioProductoConIva(linea.producto) * linea.cantidad;

  return {
    nombre: linea.producto.nombre,
    cantidad: linea.cantidad,
    precioSinIva,
    tipoIva: linea.producto.tipoIva,
    precioConIva,
  };
};

const calcularTotalLineasTicket = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  const lineasResultado: ResultadoLineaTicket[] =
    lineasTicket.map(calcularLineaTicket);
  return lineasResultado;
};

const calcularTotalSinIvaTicket = (
  lineasResultado: ResultadoLineaTicket[]
): number => {
  return redondearDosDecimales(
    lineasResultado.reduce((total, linea) => total + linea.precioSinIva, 0)
  );
};
const calcularTotalIvaTicket = (
  lineasResultado: ResultadoLineaTicket[]
): number => {
  return redondearDosDecimales(
    lineasResultado.reduce(
      (total, linea) => total + (linea.precioConIva - linea.precioSinIva),
      0
    )
  );
};

const calcularDesgloseIva = (
  lineasResultado: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  const totalPorTipoIva: { [key in TipoIva]: number } = {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  };

  lineasResultado.forEach((linea) => {
    const tipoIva = linea.tipoIva;

    const ivaPagado = redondearDosDecimales(
      linea.precioConIva - linea.precioSinIva
    );

    totalPorTipoIva[tipoIva] += ivaPagado;
  });

  const desglose: TotalPorTipoIva[] = [];

  for (const tipoIva in totalPorTipoIva) {
    desglose.push({
      tipoIva: tipoIva as TipoIva,
      cuantia: totalPorTipoIva[tipoIva as TipoIva],
    });
  }

  return desglose;
};

const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const lineasResultado = calcularTotalLineasTicket(lineasTicket);

  const totalSinIva: number = calcularTotalSinIvaTicket(lineasResultado);

  const totalIva: number = calcularTotalIvaTicket(lineasResultado);

  const totalConIva: number = totalSinIva + totalIva;

  const desgloseIva: TotalPorTipoIva[] = calcularDesgloseIva(lineasResultado);

  const ticket: TicketFinal = {
    lineas: lineasResultado,
    total: {
      totalSinIva,
      totalConIva,
      totalIva,
    },
    desgloseIva,
  };

  return ticket;
};

const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
  {
    producto: {
      nombre: "Almendras",
      precio: 1.5,
      tipoIva: "general",
    },
    cantidad: 2,
  },
];

const ticket = calculaTicket(productos);
console.log(ticket);
