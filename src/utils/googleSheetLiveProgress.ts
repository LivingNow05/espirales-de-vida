/**
 * Sincronización en tiempo real con el Google Sheet oficial de la campaña:
 * "JUNTOS POR UNA INFANCIA CON AMOR"
 * Sheet ID: 1aUPnUy-A8txnMHujVmDvqKfhABIoxKwiwVcNkhEPOjo
 *
 * IMPORTANTE:
 * - Este módulo NUNCA extrae, almacena ni expone cifras de dinero, precios ni presupuestos.
 * - Únicamente lee el estado de avance por color de celda (Verde = 100%, Naranja = 75%, Amarillo = 50%, Sin color = 0%)
 *   en cada pestaña del documento para calcular el porcentaje estimado de progreso por tarjeta (0% a 100%).
 */

export const CAMPAIGN_GOOGLE_SHEET_ID =
  "1aUPnUy-A8txnMHujVmDvqKfhABIoxKwiwVcNkhEPOjo";

export interface PillarProgressData {
  pillarId: string;
  sheetName: string;
  percentage: number;
  completedEquivalent: number;
  totalItems: number;
}

export interface LiveCampaignProgressState {
  pillars: Record<string, PillarProgressData>;
  overallPercentage: number;
  lastSyncedAt: string;
  isLive: boolean;
}

/**
 * Respaldo inicial instantáneo basado en la lectura real del Google Sheet,
 * usado mientras se completa la sincronización en segundo plano.
 */
export const INITIAL_PILLAR_PROGRESS: Record<string, PillarProgressData> = {
  "pilar-1-kits-escolares": {
    pillarId: "pilar-1-kits-escolares",
    sheetName: "UTILES ESCOLARES",
    percentage: 24,
    completedEquivalent: 5.5,
    totalItems: 23,
  },
  "pilar-2-kits-aseo": {
    pillarId: "pilar-2-kits-aseo",
    sheetName: "ELEMENTOS DE ASEO",
    percentage: 0,
    completedEquivalent: 0,
    totalItems: 24,
  },
  "pilar-3-personal-apoyo": {
    pillarId: "pilar-3-personal-apoyo",
    sheetName: "SALUD Y BIENESTAR",
    percentage: 40,
    completedEquivalent: 2,
    totalItems: 5,
  },
  "pilar-4-infraestructura": {
    pillarId: "pilar-4-infraestructura",
    sheetName: "REMODELACIÓN E INFRAESTRUCTURA",
    percentage: 0,
    completedEquivalent: 0,
    totalItems: 7,
  },
  "pilar-5-habitaciones": {
    pillarId: "pilar-5-habitaciones",
    sheetName: "HABITACIONES Y CONFORT",
    percentage: 38,
    completedEquivalent: 3,
    totalItems: 8,
  },
  "pilar-6-jugueteria": {
    pillarId: "pilar-6-jugueteria",
    sheetName: "JUGUETERIA Y ENTRETENIMIENTO",
    percentage: 0,
    completedEquivalent: 0,
    totalItems: 8,
  },
};

/**
 * Mapeo entre el nombre de la pestaña en Google Sheets y el ID de la tarjeta en la web.
 */
const SHEET_NAME_TO_PILLAR_ID: Record<string, string> = {
  "UTILES ESCOLARES": "pilar-1-kits-escolares",
  "ELEMENTOS DE ASEO": "pilar-2-kits-aseo",
  "SALUD Y BIENESTAR": "pilar-3-personal-apoyo",
  "REMODELACIÓN E INFRAESTRUCTURA": "pilar-4-infraestructura",
  "REMODELACION E INFRAESTRUCTURA": "pilar-4-infraestructura",
  "HABITACIONES Y CONFORT": "pilar-5-habitaciones",
  "JUGUETERIA Y ENTRETENIMIENTO": "pilar-6-jugueteria",
  "JUGUETERÍA Y ENTRETENIMIENTO": "pilar-6-jugueteria",
};

/**
 * Encabezados o títulos internos de tabla que no cuentan como ítems individuales.
 */
const IGNORED_ROW_TITLES = new Set([
  "IMPLEMENTOS",
  "PERSONAL",
  "KIT ESCOLAR POR NIÑO (20) 15 NIÑOS | 5 NIÑAS",
  "IMPLEMENTOS ADICIONALES",
  "REMODELACIÓN E INFRAESTRUCTURA",
  "REMODELACION E INFRAESTRUCTURA",
  "PINTURA Y LIMPIEZA",
  "SALUD Y BIENESTAR",
  "EXPERTOS EN SALUD",
  "BIENESTAR",
  "KIT DE ASEO POR NIÑO (20) 15 NIÑOS | 5 NIÑAS",
  "ELEMENTOS DE ASEO",
  "IMPLEMENTOS GENERALES",
  "HABITACIONES Y CONFORT",
  "JUGUETERIA Y ENTRETENIMIENTO",
  "JUGUETERÍA Y ENTRETENIMIENTO",
  "PASEO Y RECREACIÓN",
  "PASEO Y RECREACION",
  "CATEGORIAS",
  "X22",
]);

/**
 * Convierte un código ARGB/RGB de celda de Excel (ej: "FF00FF00", "FFFF9900", "FFFFFF00")
 * al peso de progreso según la convención oficial del Excel:
 * - Verde (#00FF00 o tonos verdes) -> 1.0 (Completo = 100%)
 * - Naranja (#FF9900 o tonos naranjas) -> 0.75 (Casi completo = 75%)
 * - Amarillo (#FFFF00 o tonos amarillos) -> 0.50 (La mitad = 50%)
 * - Sin color / Blanco -> 0.0 (0%)
 */
function getColorCompletionScore(rgbHex: string | null | undefined): number {
  if (!rgbHex) return 0;
  const clean = rgbHex.trim().toUpperCase();
  if (clean.length < 6) return 0;

  const hex6 = clean.length === 8 ? clean.slice(2) : clean.slice(0, 6);
  if (hex6 === "FFFFFF" || hex6 === "000000") return 0;

  // Coincidencias exactas con la leyenda del Excel
  if (hex6 === "00FF00") return 1.0;
  if (hex6 === "FF9900") return 0.75;
  if (hex6 === "FFFF00") return 0.5;

  // Clasificación heurística por componentes RGB por si usan otro tono de verde, naranja o amarillo en Google Sheets
  const r = parseInt(hex6.slice(0, 2), 16);
  const g = parseInt(hex6.slice(2, 4), 16);
  const b = parseInt(hex6.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return 0;

  // Ignorar grises/blancos
  if (Math.abs(r - g) < 18 && Math.abs(g - b) < 18) return 0;

  // Tonos verdes (g dominante sobre r y b)
  if (g > 140 && g > r * 1.25 && g > b * 1.25) {
    return 1.0;
  }

  // Tonos amarillos vs naranjas (r y g altos, b bajo)
  if (r > 180 && g > 100 && b < 140) {
    // Si el verde es muy cercano al rojo, es amarillo (50%); si el verde es intermedio, es naranja (75%)
    if (g >= r * 0.85) {
      return 0.5;
    }
    return 0.75;
  }

  return 0;
}

/**
 * Descomprime un archivo ZIP (.xlsx) en memoria utilizando DecompressionStream nativo.
 */
async function unzipXlsxEntries(
  buffer: ArrayBuffer
): Promise<Record<string, string>> {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const entries: Record<string, string> = {};
  const decoder = new TextDecoder("utf-8");

  // Buscar End of Central Directory (EOCD) desde el final del buffer
  let eocdOffset = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset === -1) {
    throw new Error("Formato XLSX inválido (EOCD no encontrado)");
  }

  const totalEntries = view.getUint16(eocdOffset + 10, true);
  let cdOffset = view.getUint32(eocdOffset + 16, true);

  for (let idx = 0; idx < totalEntries; idx++) {
    if (view.getUint32(cdOffset, true) !== 0x02014b50) break;

    const compressionMethod = view.getUint16(cdOffset + 10, true);
    const compressedSize = view.getUint32(cdOffset + 20, true);
    const fileNameLen = view.getUint16(cdOffset + 28, true);
    const extraLen = view.getUint16(cdOffset + 30, true);
    const commentLen = view.getUint16(cdOffset + 32, true);
    const localHeaderOffset = view.getUint32(cdOffset + 42, true);

    const fileName = decoder.decode(
      bytes.subarray(cdOffset + 46, cdOffset + 46 + fileNameLen)
    );

    cdOffset += 46 + fileNameLen + extraLen + commentLen;

    // Solo necesitamos los XML de estilos, textos compartidos, libro y hojas
    if (
      !fileName.endsWith(".xml") ||
      (!fileName.startsWith("xl/worksheets/") &&
        fileName !== "xl/styles.xml" &&
        fileName !== "xl/sharedStrings.xml" &&
        fileName !== "xl/workbook.xml")
    ) {
      continue;
    }

    if (view.getUint32(localHeaderOffset, true) !== 0x04034b50) continue;
    const localNameLen = view.getUint16(localHeaderOffset + 26, true);
    const localExtraLen = view.getUint16(localHeaderOffset + 28, true);
    const dataStart = localHeaderOffset + 30 + localNameLen + localExtraLen;
    const compressedSlice = bytes.subarray(
      dataStart,
      dataStart + compressedSize
    );

    if (compressionMethod === 0) {
      entries[fileName] = decoder.decode(compressedSlice);
    } else if (compressionMethod === 8) {
      const ds = new DecompressionStream("deflate-raw");
      const writer = ds.writable.getWriter();
      writer.write(compressedSlice);
      writer.close();
      const decompressedBuffer = await new Response(ds.readable).arrayBuffer();
      entries[fileName] = decoder.decode(decompressedBuffer);
    }
  }

  return entries;
}

/**
 * Extrae las etiquetas de texto simples desde un documento XML usando expresiones regulares
 * ligeras y seguras (compatible tanto con navegador como con Node.js).
 */
function parseXlsxProgressFromEntries(
  entries: Record<string, string>
): Record<string, PillarProgressData> {
  const stylesXml = entries["xl/styles.xml"] || "";
  const sharedStringsXml = entries["xl/sharedStrings.xml"] || "";
  const workbookXml = entries["xl/workbook.xml"] || "";

  // 1. Extraer colores de relleno (fills)
  const fillColors: (string | null)[] = [];
  const fillsBlockMatch = stylesXml.match(/<fills[^>]*>([\s\S]*?)<\/fills>/i);
  if (fillsBlockMatch) {
    const fillRegex = /<fill\b[^>]*>([\s\S]*?)<\/fill>/gi;
    let m: RegExpExecArray | null;
    while ((m = fillRegex.exec(fillsBlockMatch[1])) !== null) {
      const fgMatch = m[1].match(/<fgColor\b[^>]*\brgb="([^"]+)"/i);
      fillColors.push(fgMatch ? fgMatch[1] : null);
    }
  }

  // 2. Mapear cada cellXf -> fillColor
  const styleToFill: Record<number, string | null> = {};
  const cellXfsBlockMatch = stylesXml.match(
    /<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/i
  );
  if (cellXfsBlockMatch) {
    const xfRegex = /<xf\b([^/>]*)(?:\/>|>[\s\S]*?<\/xf>)/gi;
    let m: RegExpExecArray | null;
    let xfIndex = 0;
    while ((m = xfRegex.exec(cellXfsBlockMatch[1])) !== null) {
      const fillIdMatch = m[1].match(/\bfillId="(\d+)"/i);
      const fillId = fillIdMatch ? parseInt(fillIdMatch[1], 10) : 0;
      styleToFill[xfIndex] = fillColors[fillId] ?? null;
      xfIndex++;
    }
  }

  // 3. Extraer sharedStrings
  const sharedStrings: string[] = [];
  const siRegex = /<si\b[^>]*>([\s\S]*?)<\/si>/gi;
  let siMatch: RegExpExecArray | null;
  while ((siMatch = siRegex.exec(sharedStringsXml)) !== null) {
    const tRegex = /<t\b[^>]*>([\s\S]*?)<\/t>/gi;
    let tMatch: RegExpExecArray | null;
    let text = "";
    while ((tMatch = tRegex.exec(siMatch[1])) !== null) {
      text += tMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }
    sharedStrings.push(text);
  }

  // 4. Identificar el orden de las hojas en workbook.xml
  const sheetNames: string[] = [];
  const sheetRegex = /<sheet\b[^>]*\bname="([^"]+)"/gi;
  let shMatch: RegExpExecArray | null;
  while ((shMatch = sheetRegex.exec(workbookXml)) !== null) {
    sheetNames.push(shMatch[1].trim());
  }

  const result: Record<string, PillarProgressData> = {
    ...INITIAL_PILLAR_PROGRESS,
  };

  // 5. Recorrer cada hoja (sheet2..sheet7) y calcular únicamente el progreso por ítem
  sheetNames.forEach((rawSheetName, idx) => {
    const sheetIndex = idx + 1;
    const normalizedSheetName = rawSheetName.toUpperCase().trim();
    const pillarId = SHEET_NAME_TO_PILLAR_ID[normalizedSheetName];
    if (!pillarId) return;

    const sheetXml = entries[`xl/worksheets/sheet${sheetIndex}.xml`];
    if (!sheetXml) return;

    let totalItems = 0;
    let completedEquivalent = 0;

    const rowRegex = /<row\b[^>]*>([\s\S]*?)<\/row>/gi;
    let rowMatch: RegExpExecArray | null;

    while ((rowMatch = rowRegex.exec(sheetXml)) !== null) {
      const rowContent = rowMatch[1];
      const cellRegex =
        /<c\b([^/>]*)(?:\/>|>([\s\S]*?)<\/c>)/gi;
      let cellMatch: RegExpExecArray | null;

      const rowValues: Record<string, string> = {};
      const rowFillColors: Record<string, string | null> = {};

      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        const attrs = cellMatch[1];
        const inner = cellMatch[2] || "";

        const refMatch = attrs.match(/\br="([A-Z]+)\d+"/i);
        if (!refMatch) continue;
        const colLetter = refMatch[1].toUpperCase();

        const styleMatch = attrs.match(/\bs="(\d+)"/i);
        const styleIdx = styleMatch ? parseInt(styleMatch[1], 10) : 0;

        const typeMatch = attrs.match(/\bt="([^"]+)"/i);
        const cellType = typeMatch ? typeMatch[1] : "";

        const vMatch = inner.match(/<v\b[^>]*>([\s\S]*?)<\/v>/i);
        let cellValue = vMatch ? vMatch[1].trim() : "";

        if (cellType === "s" && /^\d+$/.test(cellValue)) {
          cellValue = sharedStrings[parseInt(cellValue, 10)] ?? "";
        }

        rowValues[colLetter] = cellValue.trim();
        rowFillColors[colLetter] = styleToFill[styleIdx] ?? null;
      }

      // Evaluar ítem en la tabla izquierda (Columnas A..D)
      const leftItemName = (rowValues["A"] || "").trim();
      if (
        leftItemName &&
        !IGNORED_ROW_TITLES.has(leftItemName.toUpperCase())
      ) {
        const rowColor =
          rowFillColors["A"] ||
          rowFillColors["B"] ||
          rowFillColors["C"] ||
          rowFillColors["D"];
        const score = getColorCompletionScore(rowColor);
        totalItems += 1;
        completedEquivalent += score;
      }

      // Evaluar ítem en la tabla derecha (Columnas E..H, usado en SALUD Y BIENESTAR para PELUQUERÍA)
      const rightItemName = (rowValues["E"] || "").trim();
      if (
        rightItemName &&
        !IGNORED_ROW_TITLES.has(rightItemName.toUpperCase())
      ) {
        const rowColor =
          rowFillColors["E"] ||
          rowFillColors["F"] ||
          rowFillColors["G"] ||
          rowFillColors["H"];
        const score = getColorCompletionScore(rowColor);
        totalItems += 1;
        completedEquivalent += score;
      }
    }

    const percentage =
      totalItems > 0
        ? Math.min(100, Math.max(0, Math.round((completedEquivalent / totalItems) * 100)))
        : 0;

    result[pillarId] = {
      pillarId,
      sheetName: rawSheetName,
      percentage,
      completedEquivalent,
      totalItems,
    };
  });

  return result;
}

/**
 * Consulta en tiempo real el Google Sheet oficial y devuelve el porcentaje estimado
 * para cada una de las 6 tarjetas de la campaña (sin datos monetarios).
 */
export async function fetchLiveCampaignProgress(): Promise<LiveCampaignProgressState> {
  const exportUrl = `https://docs.google.com/spreadsheets/d/${CAMPAIGN_GOOGLE_SHEET_ID}/export?format=xlsx`;

  const response = await fetch(exportUrl, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error al consultar Google Sheet: HTTP ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const entries = await unzipXlsxEntries(buffer);
  const pillars = parseXlsxProgressFromEntries(entries);

  const pillarList = Object.values(pillars);
  const totalItemsAll = pillarList.reduce((acc, p) => acc + p.totalItems, 0);
  const totalCompletedAll = pillarList.reduce(
    (acc, p) => acc + p.completedEquivalent,
    0
  );

  const overallPercentage =
    totalItemsAll > 0
      ? Math.min(100, Math.max(0, Math.round((totalCompletedAll / totalItemsAll) * 100)))
      : 0;

  return {
    pillars,
    overallPercentage,
    lastSyncedAt: new Date().toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isLive: true,
  };
}
