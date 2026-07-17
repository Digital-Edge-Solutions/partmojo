// PartMojo — fridge water filter dataset (proving slice)
// Real OEM part numbers + cross-reference (aka) codes + representative compatible models.
// In production this array is generated from affiliate/supplier product feeds (ShareASale/CJ/Awin),
// which carry SKU, compatibility mapping, price and image — the feed IS the page database.

export const CATEGORY = {
  slug: "refrigerator-water-filters",
  name: "Refrigerator Water Filters",
  nameUK: "Fridge Water Filters",
  blurb:
    "Find the exact replacement water filter for your fridge by part number or model. Verified cross-references, certified specs, and the cheapest compatible options.",
};

// Aftermarket brands used for "compatible alternative" CTAs (high-commission direct programs).
export const AFTERMARKET = [
  { brand: "Waterdrop", note: "Direct affiliate ~6.8% (Awin UK / FlexOffers US)" },
  { brand: "GlacialPure", note: "Amazon Associates 5%" },
  { brand: "AquaCrest", note: "Amazon Associates 5%" },
];

const RAW = [
  {
    code: "EDR1RXD1", brand: "Whirlpool", family: "EveryDrop",
    aka: ["Filter 1", "W10295370A", "W10295370", "P4RFWB", "46-9930"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Mercury", "Pharmaceuticals", "Pesticides"],
    fits: ["WRS325SDHZ", "WRS588FIHZ", "WRX735SDHZ", "WRS571CIHZ", "WRF535SWHZ", "WRS315SDHM", "WRB322DMBM"],
    related: ["EDR2RXD1", "EDR3RXD1"],
    demand: "high", priceUS: { oem: 49.99, aftermarket: 18.95 }, priceUK: { oem: 44.99, aftermarket: 16.95 },
  },
  {
    code: "EDR2RXD1", brand: "Whirlpool", family: "EveryDrop",
    aka: ["Filter 2", "W10413645A", "W10413645", "46-9082"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Asbestos"],
    fits: ["WRF767SDHZ", "WRF757SDHZ", "WRF954CIHZ", "WRF993FIFM", "MFI2570FEZ", "WRF992FIFM"],
    related: ["EDR1RXD1", "EDR3RXD1"],
    demand: "high", priceUS: { oem: 52.99, aftermarket: 19.95 }, priceUK: { oem: 46.99, aftermarket: 17.95 },
  },
  {
    code: "EDR3RXD1", brand: "Whirlpool", family: "EveryDrop",
    aka: ["Filter 3", "4396841", "4396710", "46-9083", "P2RFWG2"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["GI6FARXXF", "GX5FHDXVY", "WRX988SIBM", "GSS30C7EYB", "ED5FVGXWS02", "GI5SVAXVL"],
    related: ["EDR1RXD1", "EDR2RXD1"],
    demand: "medium", priceUS: { oem: 54.99, aftermarket: 20.95 }, priceUK: { oem: 47.99, aftermarket: 18.95 },
  },
  {
    code: "EDR4RXD1", brand: "Whirlpool", family: "EveryDrop",
    aka: ["Filter 4", "UKF8001", "4396395", "469006", "UKF8001AXX-750"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Pharmaceuticals"],
    fits: ["WRX735SDBM", "KFCS22EVMS", "GI6FARXXY", "MFI2269VEM", "KFXS25RYMS", "KBFS20EVMS", "MFI2570FEZ"],
    related: ["EDR3RXD1", "EDR1RXD1"],
    demand: "high", priceUS: { oem: 49.99, aftermarket: 17.95 }, priceUK: { oem: 43.99, aftermarket: 15.95 },
  },
  {
    code: "DA29-00020B", brand: "Samsung", family: "Aqua-Pure Plus",
    aka: ["HAF-CIN", "HAF-CIN/EXP", "DA29-00020A", "DA97-08006A-B", "46-9101"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Mercury"],
    fits: ["RF28HMEDBSR", "RF4267HARS", "RF263BEAESR", "RF323TEDBSR", "RF28HFEDBSR", "RS25J500DSR", "RH25H5611SR"],
    related: ["DA29-00003G"],
    demand: "high", priceUS: { oem: 54.99, aftermarket: 16.95 }, priceUK: { oem: 48.99, aftermarket: 15.95 },
  },
  {
    code: "DA29-00003G", brand: "Samsung", family: "Aqua-Pure Plus",
    aka: ["DA29-00003B", "DA29-00003A", "DA29-00003F", "HAFCU1"],
    micron: 1, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42"],
    reduces: ["Chlorine taste & odour", "Sediment", "Rust"],
    fits: ["RS2530BBP", "RS2533BWP", "RS2544SL", "RSG257AARS", "RS22HDHPNSR"],
    related: ["DA29-00020B"],
    demand: "medium", priceUS: { oem: 44.99, aftermarket: 15.95 }, priceUK: { oem: 39.99, aftermarket: 14.95 },
  },
  {
    code: "LT700P", brand: "LG", family: "LG",
    aka: ["ADQ36006101", "ADQ36006102", "LT700PC", "46-9690", "RWF1052"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Mercury"],
    fits: ["LFX28968ST", "LFX31925ST", "LMXS30776S", "LFXS30766S", "LFXC24726S", "LMXC23746S"],
    related: ["LT1000P", "LT800P"],
    demand: "high", priceUS: { oem: 44.99, aftermarket: 15.95 }, priceUK: { oem: 39.99, aftermarket: 14.95 },
  },
  {
    code: "LT1000P", brand: "LG", family: "LG",
    aka: ["ADQ74793501", "ADQ747935", "LT1000PC", "MDJ64844601", "46-9980"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Pharmaceuticals"],
    fits: ["LRFVS3006S", "LRMVS3006S", "LFXS26973S", "LMXS28626S", "LRFVC2406S", "LHFS28XBS"],
    related: ["LT700P"],
    demand: "high", priceUS: { oem: 49.99, aftermarket: 16.95 }, priceUK: { oem: 43.99, aftermarket: 15.95 },
  },
  {
    code: "LT800P", brand: "LG", family: "LG",
    aka: ["ADQ73613401", "ADQ73613402", "LT800PC", "46-9490"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["LSXS26326S", "LMXC23746D", "LSFXC2496D", "LMXS30786S", "LSXS26366S"],
    related: ["LT700P", "LT1000P"],
    demand: "medium", priceUS: { oem: 46.99, aftermarket: 15.95 }, priceUK: { oem: 40.99, aftermarket: 14.95 },
  },
  {
    code: "MWF", brand: "GE", family: "GE SmartWater",
    aka: ["MWFP", "MWFA", "GWF", "GWFA", "HWF", "46-9991", "MWFINT"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Mercury", "Select pharmaceuticals"],
    fits: ["GNE25JSKSS", "GFE28GSKSS", "GYE22GYNFS", "GSS25GSHSS", "PSS28KSHSS", "DFE28JSKSS"],
    related: ["XWF", "RPWFE"],
    demand: "high", priceUS: { oem: 49.99, aftermarket: 15.95 }, priceUK: { oem: 43.99, aftermarket: 14.95 },
  },
  {
    code: "XWF", brand: "GE", family: "GE",
    aka: ["XWFE", "46-9905"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 170,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["GNE27JYMFS", "GNE27JSMSS", "GDE25EYKFS", "GBE21DYKFS", "GNE25JMKES"],
    related: ["MWF", "RPWFE"],
    demand: "medium", priceUS: { oem: 42.99, aftermarket: 14.95 }, priceUK: { oem: 37.99, aftermarket: 13.95 },
  },
  {
    code: "RPWFE", brand: "GE", family: "GE",
    aka: ["RPWF", "46-9303"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 170,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Pharmaceuticals"],
    fits: ["GFE28GYNFS", "GYE22GYNFS", "PYE22PYNFS", "GFE26JYMFS", "PFE28KYNFS"],
    related: ["MWF", "XWF"],
    demand: "medium", priceUS: { oem: 59.99, aftermarket: 21.95 }, priceUK: { oem: 52.99, aftermarket: 19.95 },
  },
  {
    code: "WF3CB", brand: "Frigidaire", family: "PureSource 3",
    aka: ["PureSource 3", "242069601", "242017800", "46-9999"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["FGHB2866PF", "FFHB2750TS", "LGHB2867PF", "FGHB2868TF", "FFSS2615TS"],
    related: ["ULTRAWF", "EPTWFU01"],
    demand: "high", priceUS: { oem: 44.99, aftermarket: 15.95 }, priceUK: { oem: 39.99, aftermarket: 14.95 },
  },
  {
    code: "ULTRAWF", brand: "Frigidaire", family: "PureSource Ultra",
    aka: ["PureSource Ultra", "241791601", "A00047493", "46-9930F"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["LGHX2636TF", "FGHC2331PF", "FPBS2777RF", "DGHX2355TF", "FGHC2345LF"],
    related: ["WF3CB", "EPTWFU01"],
    demand: "high", priceUS: { oem: 46.99, aftermarket: 15.95 }, priceUK: { oem: 40.99, aftermarket: 14.95 },
  },
  {
    code: "EPTWFU01", brand: "Frigidaire", family: "PureSource Ultra II",
    aka: ["PureSource Ultra II", "EPTWFU01UPC", "242315231"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Pharmaceuticals"],
    fits: ["FGHB2868TF", "FRSS2623AS", "GRSS2652AF", "FGSS2635TF", "GRMC2273BF"],
    related: ["ULTRAWF", "WF3CB"],
    demand: "medium", priceUS: { oem: 52.99, aftermarket: 18.95 }, priceUK: { oem: 46.99, aftermarket: 16.95 },
  },
  {
    code: "4396508", brand: "Whirlpool", family: "Whirlpool",
    aka: ["4396510", "4392857", "NLC240V", "EDR5RXD1", "Filter 5"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["ED5FHAXVS", "GD5RVAXVY", "ED2KVEXVB", "GD5SHAXNL00", "ED5FVGXWS00"],
    related: ["EDR3RXD1"],
    demand: "medium", priceUS: { oem: 47.99, aftermarket: 15.95 }, priceUK: { oem: 41.99, aftermarket: 14.95 },
  },
  {
    code: "GSWF", brand: "GE", family: "GE SmartWater",
    aka: ["GSWF3PK", "GSWFDS", "WR17X33825", "46-9914"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["GSH25JSDDSS", "GSS23WGTABB", "PSS26MGTABB", "GSL25JFXLB", "ESS25LGPABB"],
    related: ["MWF", "XWF"],
    demand: "high", priceUS: { oem: 44.99, aftermarket: 14.95 }, priceUK: { oem: 39.99, aftermarket: 13.95 },
  },
  {
    code: "HAF-QIN", brand: "Samsung", family: "Aqua-Pure Plus",
    aka: ["DA97-17376B", "HAF-QIN/EXP", "DA97-17376B-1P"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Mercury"],
    fits: ["RF23M8070SR", "RF28R7351SR", "RF28R7201SR", "RF23R6201SR", "RF22R7351SR"],
    related: ["DA29-00020B"],
    demand: "high", priceUS: { oem: 54.99, aftermarket: 17.95 }, priceUK: { oem: 48.99, aftermarket: 16.95 },
  },
  {
    code: "REPLFLTR10", brand: "Bosch", family: "UltraClarity",
    aka: ["644845", "9000-194412", "UltraClarity", "9000077104"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["B26FT70SNS", "B22CT80SNS", "B21CL80SNS", "B36CD50SNS", "B26FT50SNS"],
    related: [],
    demand: "high", priceUS: { oem: 59.99, aftermarket: 21.95 }, priceUK: { oem: 52.99, aftermarket: 19.95 },
  },
  {
    code: "UKF7003", brand: "Maytag", family: "Maytag",
    aka: ["UKF7003AXX", "67002269", "Filter 7", "469992"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["MFI2568AES", "MSD2651KES", "MFC2061KES", "GC2227HEK", "MFI2067AES"],
    related: ["EDR4RXD1"],
    demand: "medium", priceUS: { oem: 46.99, aftermarket: 16.95 }, priceUK: { oem: 40.99, aftermarket: 15.95 },
  },
  {
    code: "LT500P", brand: "LG", family: "LG",
    aka: ["5231JA2002A", "ADQ72910901", "LT500PC", "5231JA2002B"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 500,
    certifications: ["NSF/ANSI 42"],
    reduces: ["Chlorine taste & odour", "Sediment", "Rust"],
    fits: ["LFC25765ST", "LRSC26925TT", "LSC27910ST", "LRBC22522TT", "LFX25971ST"],
    related: ["LT700P", "LT800P"],
    demand: "medium", priceUS: { oem: 39.99, aftermarket: 13.95 }, priceUK: { oem: 34.99, aftermarket: 12.95 },
  },
  {
    code: "WF2CB", brand: "Frigidaire", family: "PureSource 2",
    aka: ["NGFC 2000", "FC-100", "1004904", "469911"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["FGHS2631PF4A", "GLHS36EFB", "FRS6LF7JB", "PLHS239ZCB", "FGHS2334KE"],
    related: ["WF3CB", "WFCB"],
    demand: "medium", priceUS: { oem: 42.99, aftermarket: 14.95 }, priceUK: { oem: 37.99, aftermarket: 13.95 },
  },
  {
    code: "9081", brand: "Kenmore", family: "Kenmore",
    aka: ["46-9081", "469081", "9081P", "EDR1RXD1 (Kenmore)"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["Kenmore 51833", "Kenmore 51862", "Kenmore 51102", "Kenmore 50042", "Kenmore 51123"],
    related: ["EDR1RXD1", "9083"],
    demand: "high", priceUS: { oem: 49.99, aftermarket: 16.95 }, priceUK: { oem: 43.99, aftermarket: 15.95 },
  },
  {
    code: "9083", brand: "Kenmore", family: "Kenmore",
    aka: ["46-9083", "469083", "9020", "EDR3RXD1 (Kenmore)"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["Kenmore 57023", "Kenmore 44039", "Kenmore 51559", "Kenmore 53712"],
    related: ["EDR3RXD1", "9081"],
    demand: "medium", priceUS: { oem: 47.99, aftermarket: 15.95 }, priceUK: { oem: 41.99, aftermarket: 14.95 },
  },
  {
    code: "9690", brand: "Kenmore", family: "Kenmore",
    aka: ["46-9690", "469690", "ADQ36006101 (Kenmore)"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["Kenmore 79572483", "Kenmore 79574023", "Kenmore 79551833"],
    related: ["LT700P"],
    demand: "medium", priceUS: { oem: 44.99, aftermarket: 15.95 }, priceUK: { oem: 39.99, aftermarket: 14.95 },
  },
  {
    code: "DA29-00019A", brand: "Samsung", family: "Aqua-Pure Plus",
    aka: ["HAFEX", "HAFEX/EXP", "HAFCU2", "35918"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42"],
    reduces: ["Chlorine taste & odour", "Sediment"],
    fits: ["RSG257AARS", "RS261MDBP", "RF267AERS", "RS263TDRS", "RF4287HARS"],
    related: ["DA29-00003G", "DA29-00020B"],
    demand: "medium", priceUS: { oem: 44.99, aftermarket: 15.95 }, priceUK: { oem: 39.99, aftermarket: 14.95 },
  },
  {
    code: "WFCB", brand: "Frigidaire", family: "PureSource",
    aka: ["WF1CB", "NGFC 2000", "218904501", "469906"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42"],
    reduces: ["Chlorine taste & odour", "Sediment", "Rust"],
    fits: ["FRS3R5ESBH", "GLHS39EHW", "FRS6R5ESBN", "GLRS267ZDW"],
    related: ["WF2CB", "WF3CB"],
    demand: "low", priceUS: { oem: 41.99, aftermarket: 14.95 }, priceUK: { oem: 36.99, aftermarket: 13.95 },
  },
  {
    code: "MSWF", brand: "GE", family: "GE SmartWater",
    aka: ["MSWF3PK", "101820A", "101821B", "46-9902"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Mercury"],
    fits: ["PSS26NGPABB", "PSS26MGPACC", "DSS25KGRBWW", "ESS25KSTASS", "GSS25QGTABB"],
    related: ["MWF", "GSWF"],
    demand: "medium", priceUS: { oem: 49.99, aftermarket: 16.95 }, priceUK: { oem: 43.99, aftermarket: 15.95 },
  },
  {
    code: "REPLFLTR20", brand: "Bosch", family: "UltraClarity Pro",
    aka: ["11032518", "12028325", "UltraClarity Pro"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Pharmaceuticals"],
    fits: ["B36CL80ENS", "B36CD50SNS", "B36FL80SNS", "B36CT80SNS"],
    related: ["REPLFLTR10"],
    demand: "medium", priceUS: { oem: 64.99, aftermarket: 24.95 }, priceUK: { oem: 57.99, aftermarket: 22.95 },
  },
  {
    code: "DA29-10105J", brand: "Samsung", family: "Aqua-Pure Plus",
    aka: ["DA29-10105J-1P", "HAF-QINS"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["RF29A9671SR", "RF23A9671SR", "RF23A9071SR", "RF29BB8600QL"],
    related: ["HAF-QIN", "DA29-00020B"],
    demand: "medium", priceUS: { oem: 59.99, aftermarket: 19.95 }, priceUK: { oem: 52.99, aftermarket: 17.95 },
  },
  {
    code: "4396701", brand: "Whirlpool", family: "Whirlpool",
    aka: ["4396701P", "4396703", "NLC240V", "Filter PUR"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["ED2FHEXST", "ED5FHEXNB", "GC5SHEXNQ", "ED2GHEXNB05"],
    related: ["4396508", "EDR3RXD1"],
    demand: "medium", priceUS: { oem: 47.99, aftermarket: 16.95 }, priceUK: { oem: 41.99, aftermarket: 15.95 },
  },
  {
    code: "LT600P", brand: "LG", family: "LG",
    aka: ["5231JA2006A", "5231JA2006B", "5231JA2006F", "LT600PC"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 300,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts"],
    fits: ["LRSC26922TT", "LSC27931ST", "LFX21976ST", "LRSC26925TT"],
    related: ["LT700P", "LT500P"],
    demand: "medium", priceUS: { oem: 42.99, aftermarket: 14.95 }, priceUK: { oem: 37.99, aftermarket: 13.95 },
  },
  {
    code: "EDR6D1", brand: "Whirlpool", family: "EveryDrop",
    aka: ["Filter 6", "W10311524", "W10238154", "WHR4RXD1"],
    micron: 0.5, capacityMonths: 6, capacityGallons: 200,
    certifications: ["NSF/ANSI 42", "NSF/ANSI 53", "NSF/ANSI 401"],
    reduces: ["Chlorine taste & odour", "Lead", "Cysts", "Pharmaceuticals"],
    fits: ["WRV996FDEM", "WRX986SIHZ", "WRV986FDEM", "WRF996FDEM", "MFT2776FEZ", "KRMF706ESS"],
    related: ["EDR3RXD1"],
    demand: "medium", priceUS: { oem: 49.99, aftermarket: 17.95 }, priceUK: { oem: 43.99, aftermarket: 16.95 },
  },
];

// ---- derive helpers ----
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const FILTERS = RAW.map((f) => ({ ...f, slug: slugify(f.code) }));

export const bySlug = Object.fromEntries(FILTERS.map((f) => [f.slug, f]));
export const byCode = Object.fromEntries(FILTERS.map((f) => [f.code, f]));

// model -> list of filters that fit it
const modelMap = {};
for (const f of FILTERS) {
  for (const m of f.fits) {
    const s = slugify(m);
    if (!modelMap[s]) modelMap[s] = { model: m, slug: s, filters: [] };
    modelMap[s].filters.push(f.code);
  }
}
export const MODELS = Object.values(modelMap).sort((a, b) => a.model.localeCompare(b.model));
export const modelBySlug = Object.fromEntries(MODELS.map((m) => [m.slug, m]));

export const BRANDS = [...new Set(FILTERS.map((f) => f.brand))].sort();
export const brandSlug = slugify;
export const brandBySlug = Object.fromEntries(
  BRANDS.map((b) => [slugify(b), { brand: b, slug: slugify(b), filters: FILTERS.filter((f) => f.brand === b) }])
);

export const COUNTRIES = {
  us: { code: "us", locale: "en-US", currency: "USD", symbol: "$", spelling: "odor", label: "United States", hl: "en-us" },
  uk: { code: "uk", locale: "en-GB", currency: "GBP", symbol: "£", spelling: "odour", label: "United Kingdom", hl: "en-gb" },
};

export const priceFor = (f, country) => (country === "uk" ? f.priceUK : f.priceUS);

export const slug = slugify;

// ---- Contaminant / need facets (from `reduces` data) ----
const CONTAMINANT_LABELS = {
  lead: "lead",
  mercury: "mercury",
  cysts: "cysts",
  pharmaceuticals: "pharmaceuticals",
  pesticides: "pesticides",
  asbestos: "asbestos",
  sediment: "sediment",
  rust: "rust",
  "chlorine-taste-odour": "chlorine taste & odour",
};
const normContaminant = (r) => {
  const s = r.toLowerCase();
  if (s.includes("chlorine")) return "chlorine-taste-odour";
  if (s.includes("lead")) return "lead";
  if (s.includes("mercury")) return "mercury";
  if (s.includes("cyst")) return "cysts";
  if (s.includes("pharma")) return "pharmaceuticals";
  if (s.includes("pesticide")) return "pesticides";
  if (s.includes("asbestos")) return "asbestos";
  if (s.includes("sediment")) return "sediment";
  if (s.includes("rust")) return "rust";
  return slugify(r);
};
const contaminantMap = {};
for (const f of FILTERS) {
  for (const r of f.reduces) {
    const key = normContaminant(r);
    if (!CONTAMINANT_LABELS[key]) continue;
    if (!contaminantMap[key]) contaminantMap[key] = { slug: key, label: CONTAMINANT_LABELS[key], filters: [] };
    if (!contaminantMap[key].filters.includes(f.code)) contaminantMap[key].filters.push(f.code);
  }
}
export const CONTAMINANTS = Object.values(contaminantMap)
  .filter((c) => c.filters.length >= 2)
  .sort((a, b) => b.filters.length - a.filters.length);
export const contaminantBySlug = Object.fromEntries(CONTAMINANTS.map((c) => [c.slug, c]));

// ---- Compare pairs (A vs B) from cross-referenced / commonly-confused filters ----
const pairKey = (a, b) => [a, b].sort().join("__");
const pairSet = {};
for (const f of FILTERS) {
  for (const rc of f.related || []) {
    const r = byCode[rc];
    if (!r) continue;
    const k = pairKey(f.code, r.code);
    if (!pairSet[k]) {
      const [x, y] = k.split("__").map((c) => byCode[c]);
      pairSet[k] = { a: x, b: y, slug: `${x.slug}-vs-${y.slug}` };
    }
  }
}
export const COMPARE_PAIRS = Object.values(pairSet);
export const comparePairBySlug = Object.fromEntries(COMPARE_PAIRS.map((p) => [p.slug, p]));

// Best substitutes for a filter when out of stock: same-filter cross-ref codes (guaranteed fit)
// plus certified aftermarket brands. Related = different fridges (shown as "not a substitute").
export function substitutesFor(f) {
  return {
    identical: f.aka, // literally the same filter under other part numbers — 100% fit
    aftermarket: AFTERMARKET, // certified compatible alternatives
  };
}
