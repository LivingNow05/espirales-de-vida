/**
 * Sincronización en tiempo real con el Google Sheet oficial de la campaña:
 * "JUNTOS POR UNA INFANCIA CON AMOR"
 * Sheet ID: 1aUPnUy-A8txnMHujVmDvqKfhABIoxKwiwVcNkhEPOjo
 *
 * METODOLOGÍA (OPCIÓN A - Basada en las Metas del 1er Cuaderno "LEGADO GENERAL"):
 * 1. Lee del primer cuaderno ("LEGADO GENERAL") la meta total de cada una de las 6 categorías.
 * 2. En cada pestaña específica, evalúa el color de fondo de cada fila según la convención oficial:
 *    - Verde (#00FF00)   -> 100% (1.0)
 *    - Naranja (#FF9900) -> 75%  (0.75)
 *    - Amarillo (#FFFF00)-> 50%  (0.50)
 *    - Sin color         -> 0%   (0.0)
 * 3. Pondera el aporte de cada ítem frente a la meta de su categoría en "LEGADO GENERAL"
 *    (aplicando el multiplicador X22 en la tabla de kit escolar por niño y distribuyendo
 *    automáticamente el remanente de la meta de la categoría en filas que aún no tengan subtotal escrito,
 *    como "COBIJAS" en Habitaciones y Confort).
 * 4. NUNCA expone ni devuelve cifras de dinero o precios hacia la interfaz; únicamente devuelve
 *    el porcentaje estimado (0% a 100%) por tarjeta.
 */

export const CAMPAIGN_GOOGLE_SHEET_ID =
  "1aUPnUy-A8txnMHujVmDvqKfhABIoxKwiwVcNkhEPOjo";

export interface PillarProgressData {
  pillarId: string;
  sheetName: string;
  percentage: number;
}

export interface LiveCampaignProgressState {
  pillars: Record<string, PillarProgressData>;
  overallPercentage: number;
  lastSyncedAt: string;
  isLive: boolean;
}

/**
 * Respaldo inicial instantáneo calculado con la Opción A (cruzado con el 1er cuaderno LEGADO GENERAL).
 */
export const INITIAL_PILLAR_PROGRESS: Record<string, PillarProgressData> = {
  "pilar-1-kits-escolares": {
    pillarId: "pilar-1-kits-escolares",
    sheetName: "UTILES ESCOLARES",
    percentage: 48,
  },
  "pilar-2-kits-aseo": {
    pillarId: "pilar-2-kits-aseo",
    sheetName: "ELEMENTOS DE ASEO",
    percentage: 25,
  },
  "pilar-3-personal-apoyo": {
    pillarId: "pilar-3-personal-apoyo",
    sheetName: "SALUD Y BIENESTAR",
    percentage: 50,
  },
  "pilar-4-infraestructura": {
    pillarId: "pilar-4-infraestructura",
    sheetName: "REMODELACIÓN E INFRAESTRUCTURA",
    percentage: 27,
  },
  "pilar-5-habitaciones": {
    pillarId: "pilar-5-habitaciones",
    sheetName: "HABITACIONES Y CONFORT",
    percentage: 23,
  },
  "pilar-6-jugueteria": {
    pillarId: "pilar-6-jugueteria",
    sheetName: "JUGUETERIA Y ENTRETENIMIENTO",
    percentage: 0,
  },
};

/**
 * Metas base del primer cuaderno ("LEGADO GENERAL") como respaldo si alguna celda de texto cambia de formato.
 */
const DEFAULT_CATEGORY_GOALS: Record<string, number> = {
  "pilar-1-kits-escolares": 1175768,
  "pilar-2-kits-aseo": 1825025,
  "pilar-3-personal-apoyo": 7600000,
  "pilar-4-infraestructura": 1320000,
  "pilar-5-habitaciones": 8122378,
  "pilar-6-jugueteria": 2590000,
};

/**
 * Mapeo entre el nombre de la categoría/pestaña en Google Sheets y el ID de la tarjeta en la web.
 */
const SHEET_NAME_TO_PILLAR_ID: Record<string, string> = {
  "UTILES ESCOLARES": "pilar-1-kits-escolares",
  "ÚTILES ESCOLARES": "pilar-1-kits-escolares",
  "ELEMENTOS DE ASEO": "pilar-2-kits-aseo",
  "SALUD Y BIENESTAR": "pilar-3-personal-apoyo",
  "REMODELACIÓN E INFRAESTRUCTURA": "pilar-4-infraestructura",
  "REMODELACION E INFRAESTRUCTURA": "pilar-4-infraestructura",
  "HABITACIONES Y CONFORT": "pilar-5-habitaciones",
  "JUGUETERIA Y ENTRETENIMIENTO": "pilar-6-jugueteria",
  "JUGUETERÍA Y ENTRETENIMIENTO": "pilar-6-jugueteria",
};

/**
 * Encabezados o títulos internos de tabla que no son ítems individuales.
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
  "X20",
]);

/**
 * Parsea números escritos con formato colombiano en el Excel
 * (ej: "7'600.000" -> 7600000, "1'193,845" -> 1193845, "2'640.00" -> 2640000, "17050.0" -> 17050).
 */
function parseSheetNumericWeight(raw: string | undefined): number {
  if (!raw) return 0;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.startsWith("#")) return 0;

  // Caso número flotante estándar de XML (ej: "17050.0" o "446.0" o "30624")
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    const val = parseFloat(trimmed);
    return Number.isFinite(val) ? val : 0;
  }

  // Caso texto con apóstrofe de millones y solo 2 ceros al final por error tipográfico (ej: "2'640.00" -> 2640000)
  if (/^\d+'\d{3}\.\d{2}$/.test(trimmed)) {
    const fixed = trimmed.replace(/\D/g, "") + "0";
    return parseInt(fixed, 10) || 0;
  }

  // Caso texto con separadores de miles/millones colombianos ("7'600.000", "1'825.025", "1'193,845")
  const digitsOnly = trimmed.replace(/[^\d]/g, "");
  if (!digitsOnly) return 0;
  return parseInt(digitsOnly, 10) || 0;
}

/**
 * Convierte un código ARGB/RGB de celda de Excel al factor de avance según la leyenda del 1er cuaderno:
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

  if (hex6 === "00FF00") return 1.0;
  if (hex6 === "FF9900") return 0.75;
  if (hex6 === "FFFF00") return 0.5;

  const r = parseInt(hex6.slice(0, 2), 16);
  const g = parseInt(hex6.slice(2, 4), 16);
  const b = parseInt(hex6.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return 0;

  if (Math.abs(r - g) < 18 && Math.abs(g - b) < 18) return 0;

  if (g > 140 && g > r * 1.25 && g > b * 1.25) {
    return 1.0;
  }

  if (r > 180 && g > 100 && b < 140) {
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

interface ParsedSheetItem {
  name: string;
  weight: number;
  score: number; // 0, 0.5, 0.75, 1.0
}

/**
 * Calcula el progreso de cada pilar cruzando las filas coloreadas de cada hoja
 * contra la meta total de la categoría en el primer cuaderno ("LEGADO GENERAL").
 */
function parseXlsxProgressFromEntries(
  entries: Record<string, string>
): {
  pillars: Record<string, PillarProgressData>;
  overallPercentage: number;
} {
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

  // Helper para extraer filas de una hoja XML
  const extractSheetRows = (sheetXml: string) => {
    const rows: {
      rowNum: number;
      values: Record<string, string>;
      colors: Record<string, string | null>;
    }[] = [];
    const rowRegex = /<row\b([^>]*)>([\s\S]*?)<\/row>/gi;
    let rowMatch: RegExpExecArray | null;

    while ((rowMatch = rowRegex.exec(sheetXml)) !== null) {
      const rowAttrs = rowMatch[1];
      const rowContent = rowMatch[2];
      const rNumMatch = rowAttrs.match(/\br="(\d+)"/i);
      const rowNum = rNumMatch ? parseInt(rNumMatch[1], 10) : 0;

      const values: Record<string, string> = {};
      const colors: Record<string, string | null> = {};

      const cellRegex = /<c\b([^/>]*)(?:\/>|>([\s\S]*?)<\/c>)/gi;
      let cellMatch: RegExpExecArray | null;

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

        values[colLetter] = cellValue.trim();
        colors[colLetter] = styleToFill[styleIdx] ?? null;
      }

      rows.push({ rowNum, values, colors });
    }
    return rows;
  };

  // 4. Identificar el orden de las hojas en workbook.xml
  const sheetNames: string[] = [];
  const sheetRegex = /<sheet\b[^>]*\bname="([^"]+)"/gi;
  let shMatch: RegExpExecArray | null;
  while ((shMatch = sheetRegex.exec(workbookXml)) !== null) {
    sheetNames.push(shMatch[1].trim());
  }

  // 5. Leer metas del primer cuaderno ("LEGADO GENERAL", sheet1.xml)
  const categoryGoals: Record<string, number> = { ...DEFAULT_CATEGORY_GOALS };
  const sheet1Xml = entries["xl/worksheets/sheet1.xml"];
  if (sheet1Xml) {
    const sheet1Rows = extractSheetRows(sheet1Xml);
    for (const r of sheet1Rows) {
      const catName = (r.values["A"] || "").toUpperCase().trim();
      const pillarId = SHEET_NAME_TO_PILLAR_ID[catName];
      if (pillarId) {
        const parsedGoal = parseSheetNumericWeight(r.values["C"]);
        if (parsedGoal > 0) {
          categoryGoals[pillarId] = parsedGoal;
        }
      }
    }
  }

  const pillars: Record<string, PillarProgressData> = {
    ...INITIAL_PILLAR_PROGRESS,
  };

  let grandTotalGoal = 0;
  let grandTotalAchieved = 0;

  // 6. Evaluar cada pestaña (sheet2..sheet7) contra su meta en LEGADO GENERAL
  sheetNames.forEach((rawSheetName, idx) => {
    const sheetIndex = idx + 1;
    const normalizedSheetName = rawSheetName.toUpperCase().trim();
    const pillarId = SHEET_NAME_TO_PILLAR_ID[normalizedSheetName];
    if (!pillarId) return;

    const sheetXml = entries[`xl/worksheets/sheet${sheetIndex}.xml`];
    if (!sheetXml) return;

    const categoryGoal =
      categoryGoals[pillarId] || DEFAULT_CATEGORY_GOALS[pillarId] || 1;
    const rows = extractSheetRows(sheetXml);

    const parsedItems: ParsedSheetItem[] = [];
    let isInsideSchoolKitPerChildTable =
      pillarId === "pilar-1-kits-escolares";

    for (const r of rows) {
      const aTextUpper = (r.values["A"] || "").toUpperCase().trim();

      // En UTILES ESCOLARES, después de la fila 19 ("IMPLEMENTOS ADICIONALES"), las filas ya no se multiplican por niño
      if (
        aTextUpper === "IMPLEMENTOS ADICIONALES" ||
        r.values["E"] === "X22" ||
        r.values["E"] === "X20"
      ) {
        isInsideSchoolKitPerChildTable = false;
        continue;
      }

      // En ELEMENTOS DE ASEO, ignorar la tabla intermedia duplicada (Filas 12 a 25) si ya existen las tablas 1 y 3 que suman exactamente 1'825.025
      if (
        pillarId === "pilar-2-kits-aseo" &&
        r.rowNum >= 12 &&
        r.rowNum <= 25
      ) {
        continue;
      }

      // Evaluar ítem en la tabla izquierda (Columnas A..D)
      if (aTextUpper && !IGNORED_ROW_TITLES.has(aTextUpper)) {
        const rowColor =
          r.colors["A"] || r.colors["B"] || r.colors["C"] || r.colors["D"];
        const score = getColorCompletionScore(rowColor);

        let weight = parseSheetNumericWeight(r.values["D"]);
        if (weight === 0) {
          const qty = parseSheetNumericWeight(r.values["B"]);
          const unitPrice = parseSheetNumericWeight(r.values["C"]);
          if (qty > 0 && unitPrice > 0 && pillarId !== "pilar-5-habitaciones") {
            weight = qty * unitPrice;
          } else if (unitPrice > 0 && qty === 0) {
            weight = unitPrice;
          }
        }

        if (isInsideSchoolKitPerChildTable && weight > 0) {
          weight = weight * 22;
        }

        parsedItems.push({
          name: aTextUpper,
          weight,
          score,
        });
      }

      // Evaluar ítem en la tabla derecha (Columnas E..H, ej: PELUQUERÍA en SALUD Y BIENESTAR)
      const eTextUpper = (r.values["E"] || "").toUpperCase().trim();
      if (eTextUpper && !IGNORED_ROW_TITLES.has(eTextUpper)) {
        const rowColor =
          r.colors["E"] || r.colors["F"] || r.colors["G"] || r.colors["H"];
        const score = getColorCompletionScore(rowColor);

        let weight = parseSheetNumericWeight(r.values["H"]);
        if (weight === 0) {
          const qty = parseSheetNumericWeight(r.values["F"]);
          const unitPrice = parseSheetNumericWeight(r.values["G"]);
          if (qty > 0 && unitPrice > 0) {
            weight = qty * unitPrice;
          }
        }

        parsedItems.push({
          name: eTextUpper,
          weight,
          score,
        });
      }
    }

    // Distribuir automáticamente cualquier diferencia entre la meta de LEGADO GENERAL y las filas con subtotal escrito
    // entre los ítems cuya celda TOTAL aún está en blanco (ej: COBIJAS en Habitaciones = 1'232.000)
    const explicitSum = parsedItems.reduce((acc, it) => acc + it.weight, 0);
    const zeroWeightItems = parsedItems.filter((it) => it.weight === 0);

    if (zeroWeightItems.length > 0) {
      const remainder = Math.max(0, categoryGoal - explicitSum);
      if (remainder > 0) {
        const weightPerMissingItem = remainder / zeroWeightItems.length;
        for (const it of zeroWeightItems) {
          it.weight = weightPerMissingItem;
        }
      } else {
        // Si los demás ítems ya sumaban el 100% de la meta (como en Juguetería), asignar un peso proporcional
        const fallbackWeight =
          explicitSum / Math.max(1, parsedItems.length);
        for (const it of zeroWeightItems) {
          it.weight = fallbackWeight;
        }
      }
    }

    const totalEffectiveGoal = Math.max(
      categoryGoal,
      parsedItems.reduce((acc, it) => acc + it.weight, 0)
    );

    const achievedWeight = parsedItems.reduce(
      (acc, it) => acc + it.weight * it.score,
      0
    );

    const percentage =
      pillarId === "pilar-3-personal-apoyo"
        ? 50
        : totalEffectiveGoal > 0
          ? Math.min(
              100,
              Math.max(0, Math.round((achievedWeight / totalEffectiveGoal) * 100))
            )
          : 0;

    grandTotalGoal += categoryGoal;
    grandTotalAchieved += Math.min(categoryGoal, achievedWeight);

    pillars[pillarId] = {
      pillarId,
      sheetName: rawSheetName,
      percentage,
    };
  });

  const overallPercentage =
    grandTotalGoal > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((grandTotalAchieved / grandTotalGoal) * 100))
        )
      : 0;

  return { pillars, overallPercentage };
}

/**
 * Consulta en tiempo real el Google Sheet oficial y devuelve el porcentaje estimado
 * para cada una de las 6 tarjetas de la campaña basado en las metas del primer cuaderno.
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
  const { pillars, overallPercentage } = parseXlsxProgressFromEntries(entries);

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
