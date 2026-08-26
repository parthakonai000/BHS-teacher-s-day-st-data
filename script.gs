/**
 * Bagore High School — Cultural & Fees Program Backend
 */

const CONFIG = {
  SPREADSHEET_ID: '1LDpDmNpyyZYscPcFyBVOMj1FCiMuer-PNjvl4RTYDpI', // আপনার গুগল শিটের আইডি এখানে বসান
  
  // শিটের নাম (আপনার গুগল শিটের নিচের ট্যাবের নামগুলোর সাথে মেলাবেন)
  SHEET_CULTURAL: 'Sheet1', 
  SHEET_FEES: 'Fees',       
  
  CACHE_SECONDS: 120, // ২ মিনিট ক্যাশ টাইম
  CACHE_PREFIX: 'bagore_data_'
};

function doGet(e) {
  try {
    // URL-এ ?type=fees থাকলে Fees শিট লোড হবে, না হলে Cultural শিট
    const reqType = (e.parameter.type || 'cultural').toLowerCase();
    const sheetName = reqType === 'fees' ? CONFIG.SHEET_FEES : CONFIG.SHEET_CULTURAL;
    const cacheKey = CONFIG.CACHE_PREFIX + reqType;

    const data = getSheetData_(sheetName, cacheKey);
    return jsonResponse_({ success: true, count: data.length, data: data, type: reqType });
  } catch (err) {
    return jsonResponse_({ success: false, error: err.message });
  }
}

function getSheetData_(sheetName, cacheKey) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const spreadsheet = CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) throw new Error('Sheet "' + sheetName + '" was not found.');

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map(h => String(h).trim());
  const records = values.slice(1)
    .filter(row => row.some(cell => String(cell).trim() !== ''))
    .map(row => {
      const record = {};
      headers.forEach((header, i) => {
        const cell = row[i];
        record[header] = typeof cell === 'string' ? cell.trim() : cell;
      });
      return record;
    })
    .filter(record => record.Name);

  cache.put(cacheKey, JSON.stringify(records), CONFIG.CACHE_SECONDS);
  return records;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ম্যানুয়ালি ক্যাশ ক্লিয়ার করার জন্য
function clearCache() {
  const cache = CacheService.getScriptCache();
  cache.remove(CONFIG.CACHE_PREFIX + 'cultural');
  cache.remove(CONFIG.CACHE_PREFIX + 'fees');
}
